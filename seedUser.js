const mongoose = require("mongoose");
const User = require("./Models/UserSchema");

mongoose
  .connect("mongodb://localhost:27017/foody-travelers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });



id='6295f18f120c4576bd10c2e8';
async function setUser(){
    const user = await User.findById({_id: id});
    console.log(user);
    await user.save();
}
setUser();