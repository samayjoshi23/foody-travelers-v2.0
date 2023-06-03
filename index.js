const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const wrapAsync = require('./utils/wrapAsync');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const connectFlash = require('connect-flash');
const isUser = require('./middlewares/isLoggedIn');
const AppError = require('./utils/AppError');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongoose connection -----------

const DB_URL_CLOUD = 'mongodb+srv://foody-travelers-v2:e8y3x85UGxueTJD@cluster0.ncj37rr.mongodb.net/?retryWrites=true&w=majority';
const SESSION_SECRET = 'topsecretofsession';

const client = new MongoClient(DB_URL_CLOUD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// Use files ----------
const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(expressLayouts)
app.set('layout', './layouts/boilerplate');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cors());

// Init Session ----------
//-momery unleaked---------
app.set('trust proxy', 1);

app.use(session({
    store: MongoStore.create({
        mongoUrl: DB_URL_CLOUD,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'interval',
        autoRemoveInterval: 60*24*14
    }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no'))
}
next()
});


app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');
    next();
})


// =============== Application Routes =============== 
app.use('/user', require('./routes/userRoutes'))
app.use('/tour', require('./routes/bookingRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

app.get('/', isUser, wrapAsync(async (req,res)=>{
    let user = req.user;
    let isUser = req.userData;
    res.render('home', {isUser, user, title: 'Foody-Travelers - Home',css:'home.css'});
}));

app.get('/about', isUser, wrapAsync(async (req, res) => {
    let isUser = req.userData;
    res.status(200).render('site/about', {isUser, title:'About - Foody Travelers', css: 'site/siteCommon.css'});
}));

app.get('/services', isUser, wrapAsync(async (req, res) => {
    let isUser = req.userData;
    res.status(200).render('site/services', {isUser, title:'Services - Foody Travelers', css: 'site/siteCommon.css'});
}));

app.get('/contact', isUser, wrapAsync(async (req, res) => {
    let isUser = req.userData;
    res.status(200).render('site/contact', {isUser, title:'Contact Us - Foody Travelers', css: 'site/siteCommon.css'});
}));

// ======================= Error- Handlers ===================

const handleValidationErr = err => {
    // console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}
const handleCastErr = err => {
    // console.dir(err);
    if(err.path === '_id')
        return new AppError(`Server Error: Invalid page id`, 500)
    else{
        return new AppError(`${err.name} - Something went wrong`, 500)
    }
}
const handleSyantaxErr = err => {
    // console.dir(err);
    return new AppError(`Not Valid Syntax...${err.message}`)
}
const handleErr = err => {
    // console.dir(err);
    return new AppError(`${err.message}`, 404)
}
const handleReferenceErr = err => {
    // console.dir(err);
    return new AppError(`There is an Reference Error...${err.message}`)
}
const handleTypeErr = err => {
    // console.dir(err);
    return new AppError(`There is an Reference Error...${err.message}`)
}




app.use((err, req, res, next) => {
    //We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    else if (err.name === 'CastError') err = handleCastErr(err);
    else if (err.name === 'SyantaxError') err = handleSyantaxErr(err);
    else if (err.name === 'Error') err = handleErr(err);
    else if (err.name === 'ReferenceError') err = handleReferenceErr(err);
    else if (err.name === 'TypeError') err = handleTypeErr(err);
    next(err);
});

app.all('*', isUser, (req, res, next) => {
    next(new AppError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    let isUser = req.userData;
    const { status = 500, message = 'Something went wrong' } = err;
    let error = {
        status,
        message
    }
    res.render('errorPage', {isUser, error, title:'Error - Something went wrong', css:'errorPage.css'});
});


//  ============== server run =====================

app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`)
});