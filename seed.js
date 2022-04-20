const mongoose = require("mongoose");
const State = require("./models/StateSchema");

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

const seedState = [
  // Gujrat
  {
    state_name: "Gujrat",
    state_home_cover: "/static/images/home-state-cards/gujrat.jpg",
    cities: [
      {
        city_name: "Ahmedabad",
        places: [
          {
            place_name: "Calico Textile Museum",
            img_url: "/static/images/Places/guj1_CalicoTextileMuseum.jpg",
          },
          {
            place_name: "Kankaria Lake",
            img_url: "/static/images/Places/guj1_KankariaLake.jpg",
          },
          {
            place_name: "Parimal Garden",
            img_url: "/static/images/Places/guj1_ParimalGarden.jpg",
          },
          {
            place_name: "Sabarmati Ashram",
            img_url: "/static/images/Places/guj1_SabarmatiAshram.jpg",
          },
          {
            place_name: "Sardar Vallabh Bhai Patel Memorial",
            img_url:
              "/static/images/Places/guj1_SardarVallabhbhaiPatelMemorial.jpg",
          },
          {
            place_name: "Shanku's Water Park",
            img_url: "/static/images/Places/guj1_Shankus_Water_Park.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Rajdeep Inn",
          hotel_img: "/static/images/Hotels/H_guj1_Rajdeep-Inn.jpg",
        },
        city_restaurant: {
          restaurant_name: "Rajdeep Restaurant",
          restaurant_img: "/static/images/Hotels/R_guj1_Rajdeep-Inn.jpg",
        },
      },
      {
        city_name: "Surat",
        places: [
          {
            place_name: "Amusement Park",
            img_url: "/static/images/Places/guj2_AmusementPark.jpg",
          },
          {
            place_name: "Dumas Beach",
            img_url: "/static/images/Places/guj2_DumasBeach.jpg",
          },
          {
            place_name: "Jagdishchandra Bose Aquarium",
            img_url:
              "/static/images/Places/guj2_JagdishchandraBoseAquarium.jpg",
          },
          {
            place_name: "Sneh Rashmi Botanical Garden",
            img_url: "/static/images/Places/guj2_SnehRashmiBotanicalGarden.jpg",
          },
          {
            place_name: "Snow Park",
            img_url: "/static/images/Places/guj2_SnowPark.jpg",
          },
          {
            place_name: "Swami Narayan Temple",
            img_url: "/static/images/Places/guj2_SwaminarayanTemple.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Ginger Surat City Center",
          hotel_img:
            "/static/images/Hotels/H_guj2_Ginger-Surat-City-Center.jpg",
        },
        city_restaurant: {
          restaurant_name: "Ginger Surat City Center",
          restaurant_img:
            "/static/images/Hotels/R_guj2_Ginger-Surat-City-Center.jpg",
        },
      },
      {
        city_name: "Vadodara",
        places: [
          {
            place_name: "Laxmi Vilas Palace",
            img_url: "/static/images/Places/guj3_LaxmiVilasPalace.jpg",
          },
          {
            place_name: "Sursagar Lake",
            img_url: "/static/images/Places/guj3_SursagarLake.jpg",
          },
          {
            place_name: "Tapovan Temple",
            img_url: "/static/images/Places/guj3_TapovanTemple.jpg",
          },
          {
            place_name: "Zarwani Waterfall",
            img_url: "/static/images/Places/guj3_ZarwaniWaterfall.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Royal Orchid Central",
          hotel_img: "/static/images/Hotels/H_guj3_Royal-Orchid-Central.jpg",
        },
        city_restaurant: {
          restaurant_name: "Royal Orchid Central",
          restaurant_img:
            "/static/images/Hotels/R_guj3_Royal-Orchid-Central.jpg",
        },
      },
      {
        city_name: "Junagadh",
        places: [
          {
            place_name: "Girnar Hills",
            img_url: "/static/images/Places/guj4_GirnarHills.jpg",
          },
          {
            place_name: "Haridham Temple",
            img_url: "/static/images/Places/guj4_HaridhamTemple.jpg",
          },
          {
            place_name: "Jama Masjid",
            img_url: "/static/images/Places/guj4_JamaMasjid.jpg",
          },
          {
            place_name: "Madhavpur Beach",
            img_url: "/static/images/Places/guj4_MadhavpurBeach.jpg",
          },
          {
            place_name: "Statue of Unity",
            img_url: "/static/images/Places/guj4_StatueOfUnity.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Click Hotel",
          hotel_img: "/static/images/Hotels/H_guj4_Click-Hotel.jpg",
        },
        city_restaurant: {
          restaurant_name: "Click Hotel",
          restaurant_img: "/static/images/Hotels/R_guj4_Click-Hotel.jpg",
        },
      },
      {
        city_name: "Bonus Places",
        places: [
          {
            place_name: "Akshardham Temple",
            img_url: "/static/images/Places/guj5_AkshardhamTemple.jpg",
          },
          {
            place_name: "Modhera Sun Temple",
            img_url: "/static/images/Places/guj5_ModheraSunTemple.jpg",
          },
          {
            place_name: "Somnath Temple",
            img_url: "/static/images/Places/guj5_SomnathTemple.jpg",
          },
          {
            place_name: "White Desert - Rann of Kutchh",
            img_url: "/static/images/Places/guj5_WhiteDesert.jpg",
          },
          {
            place_name: "Wild Life Sanctuary",
            img_url: "/static/images/Places/guj5_WildLifeSanctuary.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Rann Home Stay",
          hotel_img: "/static/images/Hotels/H_guj5_Rann-Home-Stay.jpg",
        },
        city_restaurant: {
          restaurant_name: "Rann Home Stay",
          restaurant_img: "/static/images/Hotels/R_guj5_Rann-Home-Stay.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Aam Shrikhand",
        food_img: "/static/images/Food/guj_AamShrikand.jpg",
        price: 49,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Basundi (1 Glass)",
        food_img: "/static/images/Food/guj_Basundi.jpg",
        price: 35,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Daabeli (2 pcs)",
        food_img: "/static/images/Food/guj_Daabeli.jpg",
        price: 50,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Doodhpak (1 Bowl)",
        food_img: "/static/images/Food/guj_Doodhpak.jpg",
        price: 40,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Handvo",
        food_img: "/static/images/Food/guj_Handvo.jpg",
        price: 30,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Jalebi-Fafda",
        food_img: "/static/images/Food/guj_Jalebi-Fafda.jpg",
        price: 70,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Khaman Dhokla",
        food_img: "/static/images/Food/guj_KhamanDhokla.jpg",
        price: 59,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Khandvi",
        food_img: "/static/images/Food/guj_Khandvi.jpg",
        price: 45,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Methi Thepla",
        food_img: "/static/images/Food/guj_MethiThepla.jpg",
        price: 20,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Mohanthal",
        food_img: "/static/images/Food/guj_Mohanthal.jpg",
        price: 70,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Muthia",
        food_img: "/static/images/Food/guj_Muthia.jpg",
        price: 69,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Patra Vadi",
        food_img: "/static/images/Food/guj_PatraVadi.jpg",
        price: 55,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Shrikhand",
        food_img: "/static/images/Food/guj_Shrikand.jpg",
        price: 150,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Ahmedabad',
    base_fare: 17829,
    duration: "17 Days 18 Nights",
  },
  //Madhya Pradesh
  {
    state_name: "Madhya Pradesh",
    state_home_cover: "/static/images/home-state-cards/MadhyaPradesh.jpg",
    cities: [
      {
        city_name: "Bhopal",
        places: [
          {
            place_name: "Bhimbetka Rocks",
            img_url: "/static/images/Places/mp1_BhimbedkaRocks.jpg",
          },
          {
            place_name: "Kanha Fun City",
            img_url: "/static/images/Places/mp1_KanhaFuncity.jpg",
          },
          {
            place_name: "Raisen Fort",
            img_url: "/static/images/Places/mp1_RaisenFort.jpg",
          },
          {
            place_name: "Sanchi Stupa",
            img_url: "/static/images/Places/mp1_SanchiStupa.jpg",
          },
          {
            place_name: "Tribal Museum",
            img_url: "/static/images/Places/mp1_TribalMuseum.jpg",
          },
          {
            place_name: "Upper Lake",
            img_url: "/static/images/Places/mp1_UpperLake.jpg",
          },
          {
            place_name: "Van Vihar",
            img_url: "/static/images/Places/mp1_VanVihar.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Radisson Hotel",
          hotel_img: "/static/images/Hotels/H_mp1-radisson-hotel-bhopal.jpg",
        },
        city_restaurant: {
          restaurant_name: "Fusion Cafe",
          restaurant_img: "/static/images/Hotels/R_mp1-fusion-cafe.jpg",
        },
      },
      {
        city_name: "Gwalior",
        places: [
          {
            place_name: "Madhav National Park",
            img_url: "/static/images/Places/mp2_MadhavNationalPark.jpg",
          },
          {
            place_name: "Mitavli And Padavli",
            img_url: "/static/images/Places/mp2_MitavliAndPadavli.jpg",
          },
          {
            place_name: "Orchha Fort",
            img_url: "/static/images/Places/mp2_OrchhaFort.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Atithi Inn",
          hotel_img: "/static/images/Hotels/H_mp2-Atithi-Inn.jpg",
        },
        city_restaurant: {
          restaurant_name: "Atithi Inn",
          restaurant_img: "/static/images/Hotels/R_mp2-Atithi-Inn.jpg",
        },
      },
      {
        city_name: "Jabalpur",
        places: [
          {
            place_name: "Balancing Rock",
            img_url: "/static/images/Places/mp3_BalancingRock.jpg",
          },
          {
            place_name: "Bargi Dam Boating",
            img_url: "/static/images/Places/mp3_BargiDamBoating.jpg",
          },
          {
            place_name: "Chousath Yogini Temple",
            img_url: "/static/images/Places/mp3_ChousathYoginiTemple.jpg",
          },
          {
            place_name: "DhuanDhar Falls",
            img_url: "/static/images/Places/mp3_DhuandharFalls.jpg",
          },
          {
            place_name: "Kachnar City",
            img_url: "/static/images/Places/mp3_KachnarCity.jpg",
          },
          {
            place_name: "Madan Mahal Fort",
            img_url: "/static/images/Places/mp3_MadanMahalFort.jpg",
          },
          {
            place_name: "Marble Rocks",
            img_url: "/static/images/Places/mp3_MarbleRocks.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Jackson Hotel",
          hotel_img: "/static/images/Hotels/H_mp3-JacksonHotel.jpg",
        },
        city_restaurant: {
          restaurant_name: "Jackson Hotel",
          restaurant_img: "/static/images/Hotels/R_mp3-JacksonHotel.jpg",
        },
      },
      {
        city_name: "Pachmarhi",
        places: [
          {
            place_name: "Bee Falls",
            img_url: "/static/images/Places/mp4_BeeFalls.jpg",
          },
          {
            place_name: "Dhoopgarh",
            img_url: "/static/images/Places/mp4_Dhoopgarh.jpg",
          },
          {
            place_name: "Duchess Falls",
            img_url: "/static/images/Places/mp4_DuchessFalls.jpg",
          },
          {
            place_name: "Jatashankar Caves",
            img_url: "/static/images/Places/mp4_JataShankarCaves.jpg",
          },
          {
            place_name: "Reechgarh",
            img_url: "/static/images/Places/mp4_Reechgarh.jpg",
          },
          {
            place_name: "Satpura National Park",
            img_url: "/static/images/Places/mp4_SatpuraNationalPark.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Pachmarhi Foothill Cottages",
          hotel_img: "/static/images/Hotels/H_mp4_pachmarhi-foothill-cottages.jpg",
        },
        city_restaurant: {
          restaurant_name: "Pachmarhi Foothill Cottages",
          restaurant_img:
            "/static/images/Hotels/R_mp4_pachmarhi-foothill-cottages.jpg",
        },
      },
      {
        city_name: "Ujjain",
        places: [
          {
            place_name: "Janapav Kuti",
            img_url: "/static/images/Places/mp5_JanapavKuti.jpg",
          },
          {
            place_name: "Mahakaleshwar Jyotirlinga",
            img_url: "/static/images/Places/mp5_MahakaleshwarJyotirlinga.jpg",
          },
          {
            place_name: "Pagara Dam",
            img_url: "/static/images/Places/mp5_PagaraDam.jpg",
          },
          {
            place_name: "Ralamandal Wildlife Scantuary",
            img_url: "/static/images/Places/mp5_RalamandalWildlife.jpg",
          },
          {
            place_name: "Vedshala Observatory",
            img_url: "/static/images/Places/mp5_VedshalaObservatory.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Rudraksha Club",
          hotel_img: "/static/images/Hotels/H_mp5_Rudraksha-Club.jpg",
        },
        city_restaurant: {
          restaurant_name: "Rudraksha Club Resort",
          restaurant_img:
            "/static/images/Hotels/R_mp5_Rudraksh-club-resort.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Bhutte Ka Kees",
        food_img: "/static/images/Food/mp_Bhutte-ka-Kees.jpg",
        price: 35,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Dal Bafla",
        food_img: "/static/images/Food/mp_Dal-Bafla.jpg",
        price: 40,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Gosht Korma",
        food_img: "/static/images/Food/mp_Gosht-Korma.jpg",
        price: 150,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Jalebi",
        food_img: "/static/images/Food/mp_Jalebi.jpg",
        price: 30,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Khopra Pak",
        food_img: "/static/images/Food/mp_Khopra-Pak.jpg",
        price: 80,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Khopra Patties",
        food_img: "/static/images/Food/mp_Khopra-Patties.jpg",
        price: 60,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Malpua",
        food_img: "/static/images/Food/mp_Malpua.jpg",
        price: 35,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Mawa Bati",
        food_img: "/static/images/Food/mp_Mawa-Bati.jpg",
        price: 60,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Palak Puri",
        food_img: "/static/images/Food/mp_Palak-Puri.jpg",
        price: 40,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Seekh Kebab",
        food_img: "/static/images/Food/mp_Seekh-Kebab.jpg",
        price: 110,
        food_type: "Non-Veg",
        dot_color: "red",
      },
    ],
    tour_source: 'Bhopal',
    base_fare: 18680,
    duration: "14 Days 13 Nights",
  },
  // Maharashtra
  {
    state_name: "Maharashtra",
    state_home_cover: "/static/images/home-state-cards/Maharashtra.jpg",
    cities: [
      {
        city_name: "Amboli",
        places: [
          {
            place_name: "Amboli Falls",
            img_url: "/static/images/Places/mh1_AmboliFalls.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Vamoose Green Valley",
          hotel_img: "/static/images/Hotels/H_mh1_Vamoose-Green-Valley.jpg",
        },
        city_restaurant: {
          restaurant_name: "Nandanvan Restaurant",
          restaurant_img:
            "/static/images/Hotels/R_mh1_Nandanvan-Restaurant.jpg",
        },
      },
      {
        city_name: "Mumbai",
        places: [
          {
            place_name: "Aksa Beach",
            img_url: "/static/images/Places/mh2_AksaBeach.jpg",
          },
          {
            place_name: "Essel Worlds",
            img_url: "/static/images/Places/mh2_EsselWorlds.jpg",
          },
          {
            place_name: "Gateway Of India",
            img_url: "/static/images/Places/mh2_GatewayOfIndia.jpg",
          },
          {
            place_name: "HajiAli",
            img_url: "/static/images/Places/mh2_HajiAli.jpg",
          },
          {
            place_name: "Juhu Beach",
            img_url: "/static/images/Places/mh2_JuhuBeach.jpg",
          },
          {
            place_name: "Snow Land",
            img_url: "/static/images/Places/mh2_SnowLand.jpg",
          },
          {
            place_name: "Water Park",
            img_url: "/static/images/Places/mh2_WaterPark.jpg",
          },
          {
            place_name: "Wax Museum",
            img_url: "/static/images/Places/mh2_WaxMuseum.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "The Lalit Mumbai",
          hotel_img: "/static/images/Hotels/H_mh2_The-Lalit-Mumbai.jpg",
        },
        city_restaurant: {
          restaurant_name: "The Lalit Mumbai",
          restaurant_img: "/static/images/Hotels/R_mh2_The-Lalit-Mumbai.jpg",
        },
      },
      {
        city_name: "Pune",
        places: [
          {
            place_name: "Alibaug",
            img_url: "/static/images/Places/mh3_Alibaug.jpg",
          },
          {
            place_name: "Kamshet",
            img_url: "/static/images/Places/mh3_Kamshet.jpg",
          },
          {
            place_name: "Khandala",
            img_url: "/static/images/Places/mh3_Khandala.jpg",
          },
          {
            place_name: "Kolad",
            img_url: "/static/images/Places/mh3_Kolad.jpg",
          },
          {
            place_name: "Lavasa",
            img_url: "/static/images/Places/mh3_Lavasa.jpg",
          },
          {
            place_name: "Lonavala",
            img_url: "/static/images/Places/mh3_Lonavala.jpg",
          },
          {
            place_name: "Pawana Lake",
            img_url: "/static/images/Places/mh3_PawanaLake.jpg",
          },
          {
            place_name: "Rajmachi",
            img_url: "/static/images/Places/mh3_Rajmachi.jpg",
          },
          {
            place_name: "ShaniwarWada",
            img_url: "/static/images/Places/mh3_ShaniwarWada.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Royal Orchid Central",
          hotel_img: "/static/images/Hotels/H_mh3_Royal-Orchid-Central.jpg",
        },
        city_restaurant: {
          restaurant_name: "Royal Orchid Central",
          restaurant_img:
            "/static/images/Hotels/R_mh3_Royal-Orchid-Central.jpg",
        },
      },
      {
        city_name: "Bonus Place",
        places: [
          {
            place_name: "Tadoba National Park",
            img_url: "/static/images/Places/mh4_TadobaNationalPark.jpg",
          },
          {
            place_name: "Ajanta And Ellora Caves",
            img_url: "/static/images/Places/mh5_AjantaAndEllora Caves.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "SS Kingdom Holiday Resort",
          hotel_img:
            "/static/images/Hotels/H_mh4_SS-Kingdom-Holiday-Resort.jpg",
        },
        city_restaurant: {
          restaurant_name: "SS Kingdom Holiday Resort",
          restaurant_img:
            "/static/images/Hotels/R_mh4_SS-Kingdom-Holiday-Resort.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Aamti",
        food_img: "/static/images/Food/mh_Aamti.jpg",
        price: 30,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Bharli Vangi",
        food_img: "/static/images/Food/mh_Bharli-Vangi.jpg",
        price: 70,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Bhelpuri",
        food_img: "/static/images/Food/mh_Bhelpuri.jpg",
        price: 25,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Misal Pav",
        food_img: "/static/images/Food/mh_Misal-Pav.jpg",
        price: 32,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Modak",
        food_img: "/static/images/Food/mh_Modak.jpg",
        price: 40,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Pithla-Bhakri",
        food_img: "/static/images/Food/mh_Pithla-Bhakri.jpg",
        price: 65,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Puran Poli",
        food_img: "/static/images/Food/mh_Puran-Poli.jpg",
        price: 90,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Ragda Pattice",
        food_img: "/static/images/Food/mh_RagdaPattice.jpg",
        price: 75,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Rassa",
        food_img: "/static/images/Food/mh_Rassa.jpg",
        price: 24,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Sabudana Khichdi",
        food_img: "/static/images/Food/mh_Sabudana-Khichdi.jpg",
        price: 45,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Shrikhand",
        food_img: "/static/images/Food/mh_Shrikhand.jpg",
        price: 150,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Sitafal Basundi",
        food_img: "/static/images/Food/mh_Sitafal_Basundi.jpg",
        price: 100,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Mumbai',
    base_fare: 14564,
    duration: "12 Days 12 Nights",
  },
  // North East
  {
    state_name: "North East",
    state_home_cover: "/static/images/home-state-cards/NorthEast.jpg",
    cities: [
      {
        city_name: "The Seven sisters",
        places: [
          {
            place_name: "DawkiRiver",
            img_url: "/static/images/Places/ne_DawkiRiver.jpg",
          },
          {
            place_name: "Gangtok",
            img_url: "/static/images/Places/ne_Gangtok.jpg",
          },
          {
            place_name: "Gorichen Peak",
            img_url: "/static/images/Places/ne_GorichenPeak.jpg",
          },
          {
            place_name: "KamakhayaTemple",
            img_url: "/static/images/Places/ne_KamakhayaTemple.jpg",
          },
          {
            place_name: "Kaziranga National Park",
            img_url: "/static/images/Places/ne_KazirangaNationalPark.jpg",
          },
          {
            place_name: "Nagula Lake",
            img_url: "/static/images/Places/ne_NagulaLake.jpg",
          },
          {
            place_name: "Imphal Valley",
            img_url: "/static/images/Places/ne_NeImphalValley.jpg",
          },
          {
            place_name: "Nuranang Falls",
            img_url: "/static/images/Places/ne_NuranangFalls.jpg",
          },
          {
            place_name: "Siang River Rafting",
            img_url: "/static/images/Places/ne_SiangRiverRafting.jpg",
          },
          {
            place_name: "Tsomgo Lake",
            img_url: "/static/images/Places/ne_TsomgoLake.jpg",
          },
          {
            place_name: "Umium Lake",
            img_url: "/static/images/Places/ne_UmiumLake.jpg",
          },
          {
            place_name: "Ziro Valley",
            img_url: "/static/images/Places/ne_ZiroValley.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "7 sisters Falls View Inn",
          hotel_img:
            "/static/images/Hotels/H_ne1_7-sisters-Falls-View-Inn(dawki-gangtok).jpg",
        },
        city_restaurant: {
          restaurant_name: "7 sisters Falls View Inn",
          restaurant_img:
            "/static/images/Hotels/R_ne1_7-sisters-Falls-View-Inn(dawki-gangtok).jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Chikhvi",
        food_img: "/static/images/Food/ne_Chikhvi.jpg",
        price: 70,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Eromba",
        food_img: "/static/images/Food/ne_Eromba.jpg",
        price: 120,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Jadoh",
        food_img: "/static/images/Food/ne_Jadoh.jpg",
        price: 74,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Smoked-Pork",
        food_img: "/static/images/Food/ne_Smoked-Pork.jpg",
        price: 90,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Zan",
        food_img: "/static/images/Food/ne_Zan.jpg",
        price: 105,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Shillong',
    base_fare: 21450,
    duration: "18 Days 19 Nights",
  },
  // Kerela
  {
    state_name: "Kerala",
    state_home_cover: "/static/images/home-state-cards/kerela.jpg",
    cities: [
      {
        city_name: "Kochi",
        places: [
          {
            place_name: "Ayurvedic Massage",
            img_url: "/static/images/Places/ker1_AyurvedicMassage.jpg",
          },
          {
            place_name: "Chinese Fishing Nets",
            img_url: "/static/images/Places/ker1_ChineseFishingNets.jpg",
          },
          {
            place_name: "Kashi Art Cafe",
            img_url: "/static/images/Places/ker1_KashiArtCafe.jpg",
          },
          {
            place_name: "Kathakali Centre",
            img_url: "/static/images/Places/ker1_KathakaliCentre.jpg",
          },
          {
            place_name: "Marine Drive",
            img_url: "/static/images/Places/ker1_MarineDrive.jpg",
          },
          {
            place_name: "Veeranpuzha Lake",
            img_url: "/static/images/Places/ker1_VeeranpuzhaLake.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Le Meridien Kochi",
          hotel_img: "/static/images/Hotels/H_ker1_Le-Meridien-Kochi.jpg",
        },
        city_restaurant: {
          restaurant_name: "Le Meridien Kochi",
          restaurant_img: "/static/images/Hotels/R_ker1_Le-Meridien-Kochi.jpg",
        },
      },
      {
        city_name: "Thiruvananthapuram",
        places: [
          {
            place_name: "Happy Land Theme Park",
            img_url: "/static/images/Places/ker2_HappyLandThemePark.jpg",
          },
          {
            place_name: "Napier Museum",
            img_url: "/static/images/Places/ker2_NapierMuseum.jpg",
          },
          {
            place_name: "Neyyar Dam",
            img_url: "/static/images/Places/ker2_NeyyarDam.jpg",
          },
          {
            place_name: "Observatory",
            img_url: "/static/images/Places/ker2_Observatory.jpg",
          },
          {
            place_name: "Padmanabhaswamy Temple",
            img_url: "/static/images/Places/ker2_PadmanabhaswamyTemple.jpg",
          },
          {
            place_name: "Poovar Island",
            img_url: "/static/images/Places/ker2_PoovarIsland.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "KTDC Golden Peak",
          hotel_img: "/static/images/Hotels/H_ker2_KTDC-Golden-Peak.jpg",
        },
        city_restaurant: {
          restaurant_name: "KTDC Golden Peak",
          restaurant_img: "/static/images/Hotels/R_ker2_KTDC-Golden-Peak.jpg",
        },
      },
      {
        city_name: "Kozhikode",
        places: [
          {
            place_name: "Beypore Port",
            img_url: "/static/images/Places/ker3_BeyporePort.jpg",
          },
          {
            place_name: "Kappad Beach",
            img_url: "/static/images/Places/ker3_KappadBeach.jpg",
          },
          {
            place_name: "Kozhikode Backwaters",
            img_url: "/static/images/Places/ker3_KozhikodeBackwaters.jpg",
          },
          {
            place_name: "Kozhikode Beach",
            img_url: "/static/images/Places/ker3_KozhikodeBeach.jpg",
          },
          {
            place_name: "Thusharagiri Waterfall",
            img_url: "/static/images/Places/ker3_ThusharagiriWaterfall.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "The Raviz Kadavu",
          hotel_img: "/static/images/Hotels/H_ker3_The-Raviz-Kadavu.jpg",
        },
        city_restaurant: {
          restaurant_name: "The Raviz Kadavu",
          restaurant_img: "/static/images/Hotels/R_ker3_The-Raviz-Kadavu.jpg",
        },
      },
      {
        city_name: "Munnar",
        places: [
          {
            place_name: "Echo Point",
            img_url: "/static/images/Places/ker4_EchoPoint.jpg",
          },
          {
            place_name: "Eravikulam National Park",
            img_url: "/static/images/Places/ker4_EravikulamNationalPark.jpg",
          },
          {
            place_name: "Lakkam Waterfalls",
            img_url: "/static/images/Places/ker4_LakkamWaterfalls.jpg",
          },
          {
            place_name: "Lakshmi Hills",
            img_url: "/static/images/Places/ker4_LakshmiHills.jpg",
          },
          {
            place_name: "Pothamedu Viewpoint",
            img_url: "/static/images/Places/ker4_PothameduViewpoint.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Misty Mountain Hills",
          hotel_img: "/static/images/Hotels/H_ker4_Misty-Mountain-Resort.jpg",
        },
        city_restaurant: {
          restaurant_name: "Misty Mountain Resort",
          restaurant_img:
            "/static/images/Hotels/R_ker4_Misty-Mountain-Resort.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Appam with Stew",
        food_img: "/static/images/Food/ker_AppamwithStew.jpg",
        price: 85,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Kappa and Fish Curry",
        food_img: "/static/images/Food/ker_Kappa-and-Fish-Curry.jpg",
        price: 180,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Palada Payasam",
        food_img: "/static/images/Food/ker_Palada-Payasam.jpg",
        price: 60,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Pathiri",
        food_img: "/static/images/Food/ker_Pathiri.jpg",
        price: 74,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Pazham Pori",
        food_img: "/static/images/Food/ker_PazhamPori.jpg",
        price: 105,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Puttu Kadala Curry",
        food_img: "/static/images/Food/ker_Puttu-KadalaCurry.jpg",
        price: 145,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Sadhya",
        food_img: "/static/images/Food/ker_Sadhya.jpg",
        price: 310,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Unniyappam",
        food_img: "/static/images/Food/ker_Unniyappam.jpg",
        price: 110,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Thiruvananthapuram',
    base_fare: 15989,
    duration: "12 Days 13 Nights",
  },
  // Ladakh
  {
    state_name: "Ladakh",
    state_home_cover: "/static/images/home-state-cards/Ladakh.jpg",
    cities: [
      {
        city_name: "Leh and Ladakh",
        places: [
          {
            place_name: "Chadar Trek",
            img_url: "/static/images/Places/lad1_ChadarTrek.jpg",
          },
          {
            place_name: "Hemis National Park",
            img_url: "/static/images/Places/lad1_HemisNationalPark.jpg",
          },
          {
            place_name: "Khardung La",
            img_url: "/static/images/Places/lad1_KhardungLa.jpg",
          },
          {
            place_name: "Magnetic Hill",
            img_url: "/static/images/Places/lad1_MagneticHill.jpg",
          },
          {
            place_name: "Markha Valley",
            img_url: "/static/images/Places/lad1_MarkhaValley.jpg",
          },
          {
            place_name: "Palace",
            img_url: "/static/images/Places/lad1_Palace.jpg",
          },
          {
            place_name: "Pangong Tso Lake",
            img_url: "/static/images/Places/lad1_PangongTsoLake.jpg",
          },
          {
            place_name: "Thiksey Monastery",
            img_url: "/static/images/Places/lad1_ThikseyMonastery.jpg",
          },
          {
            place_name: "Zanskar Valley",
            img_url: "/static/images/Places/lad1_ZanskarValley.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Yarab Tso",
          hotel_img: "/static/images/Hotels/H_Lad1_Yarab-Tso.jpg",
        },
        city_restaurant: {
          restaurant_name: "Yarab Tso",
          restaurant_img: "/static/images/Hotels/R_Lad1_Yarab-Tso.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Cashew Crusted Chicken",
        food_img: "/static/images/Food/lad_Cashew-Crusted-Chicken.jpg",
        price: 220,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Cholak",
        food_img: "/static/images/Food/lad_Cholak.jpg",
        price: 77,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Kashmiri Dum Aaloo",
        food_img: "/static/images/Food/lad_KashmiriDumAaloo.jpg",
        price: 120,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Khambir",
        food_img: "/static/images/Food/lad_Khambir.jpg",
        price: 74,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Ladakhi Kulcha Bun",
        food_img: "/static/images/Food/lad_LadakhiKulchaBun.jpg",
        price: 95,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Momos",
        food_img: "/static/images/Food/lad_Momos.jpg",
        price: 50,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Phirni",
        food_img: "/static/images/Food/lad_Phirni.jpg",
        price: 59,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Teemo",
        food_img: "/static/images/Food/lad_Teemo.jpg",
        price: 65,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Thupka",
        food_img: "/static/images/Food/lad_Thupka.jpg",
        price: 60,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Yak Cheese Pizza",
        food_img: "/static/images/Food/lad_Yak-Cheese-Pizza.jpg",
        price: 170,
        food_type: "Non-Veg",
        dot_color: "red",
      },
    ],
    tour_source: 'Leh',
    base_fare: 21829,
    duration: "15 Days 16 Nights",
  },
  // Rajasthan
  {
    state_name: "Rajasthan",
    state_home_cover: "/static/images/home-state-cards/rajasthan.jpg",
    cities: [
      {
        city_name: "Ajmer",
        places: [
          {
            place_name: "Adhai Din ka Jhonpra",
            img_url: "/static/images/Places/raj1_AdhaiDinKaJhonpra.jpg",
          },
          {
            place_name: "Ana Sagar Lake",
            img_url: "/static/images/Places/raj1_anaSagarLake.jpg",
          },
          {
            place_name: "Birla Watar Park",
            img_url: "/static/images/Places/raj1_BirlaWaterPark.jpg",
          },
          {
            place_name: "Dargah Shariff",
            img_url: "/static/images/Places/raj1_DargahShariff.jpg",
          },
          {
            place_name: "Maharana Pratap Smarak",
            img_url: "/static/images/Places/raj1_MaharanaPratapSmarak.jpg",
          },
          {
            place_name: "Prithviraj Smarak",
            img_url: "/static/images/Places/raj1_PrithvirajSmarak.jpg",
          },
          {
            place_name: "Taragarh Fort",
            img_url: "/static/images/Places/raj1_TaragarhFort.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Royal Melange",
          hotel_img: "/static/images/Hotels/H_Raj1_Royal-Melange.jpg",
        },
        city_restaurant: {
          restaurant_name: "Royal Melange",
          restaurant_img: "/static/images/Hotels/R_Raj1_Royal-Melange.jpg",
        },
      },
      {
        city_name: "Chittorgarh",
        places: [
          {
            place_name: "Bassi Wildlife Sanctuary",
            img_url: "/static/images/Places/raj2_BassiWildlifeSanctuary.jpg",
          },
          {
            place_name: "Bhangarh Fort",
            img_url: "/static/images/Places/raj2_BhangarhFort.jpg",
          },
          {
            place_name: "Chittorgarh Fort",
            img_url: "/static/images/Places/raj2_ChittorgarhFort.jpg",
          },
          {
            place_name: "Gaumukh Resiorwire",
            img_url: "/static/images/Places/raj2_GaumukhResiorwire.jpg",
          },
          {
            place_name: "Pushkar Camel Fair",
            img_url: "/static/images/Places/raj2_PushkarCamelFair.jpg",
          },
          {
            place_name: "Pushkar Lake",
            img_url: "/static/images/Places/raj2_PushkarLake.jpg",
          },
          {
            place_name: "Rana Kumbha Fort",
            img_url: "/static/images/Places/raj2_RanaKumbhaFort.jpg",
          },
          {
            place_name: "Sitamata Wildlife Sanctuary",
            img_url: "/static/images/Places/raj2_SitamataWildlifeSanctuary.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Hotel Chittaurgarh Fort Haveli",
          hotel_img: "/static/images/Hotels/H_raj2_Hotel-Chittaurgarh-Fort-Haveli.jpg",
        },
        city_restaurant: {
          restaurant_name: "Zero Degree Restro",
          restaurant_img: "/static/images/Hotels/R_Raj2_Zero-Degree-Restro.jpg",
        },
      },
      {
        city_name: "Jaipur",
        places: [
          {
            place_name: "Amber Fort",
            img_url: "/static/images/Places/raj3_AmberFort.jpg",
          },
          {
            place_name: "Birla Mandir",
            img_url: "/static/images/Places/raj3_BirlaMandir.jpg",
          },
          {
            place_name: "Hawa Mahal",
            img_url: "/static/images/Places/raj3_HawaMahal.jpg",
          },
          {
            place_name: "Jaigarh Fort",
            img_url: "/static/images/Places/raj3_JaigarhFort.jpg",
          },
          {
            place_name: "Leapord Safari",
            img_url: "/static/images/Places/raj3_LeapordSafari.jpg",
          },
          {
            place_name: "Jantar Mantar",
            img_url: "/static/images/Places/raj3_JantarMantar.jpg",
          },
          {
            place_name: "Light And Sound Show",
            img_url: "/static/images/Places/raj3_LightAndSoundShow.jpg",
          },
          {
            place_name: "Night Tour",
            img_url: "/static/images/Places/raj3_NightTour.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Regenta Central Jaipur",
          hotel_img: "/static/images/Hotels/H_Raj3_Regenta-Central-Jaipur.jpg",
        },
        city_restaurant: {
          restaurant_name: "Regenta Central Jaipur",
          restaurant_img: "/static/images/Hotels/R_Raj3_Regenta-Central-Jaipur.jpg",
        },
      },
      {
        city_name: "Jaiselmer",
        places: [
          {
            place_name: "Desert Culture Museum",
            img_url: "/static/images/Places/raj4_DesertCultureMuseum.jpg",
          },
          {
            place_name: "Desert National Park",
            img_url: "/static/images/Places/raj4_DesertNationalPark.jpg",
          },
          {
            place_name: "Desert Safari",
            img_url: "/static/images/Places/raj4_DesertSafari.jpg",
          },
          {
            place_name: "Gadisagar Lake",
            img_url: "/static/images/Places/raj4_GadisagarLake.jpg",
          },
          {
            place_name: "Parasailing In Jaiselmer",
            img_url: "/static/images/Places/raj4_ParasailingInJaiselmer.jpg",
          },
          {
            place_name: "Jaiselmer Fort",
            img_url: "/static/images/Places/raj4_JaiselmerFort.jpg",
          },
          {
            place_name: "Patwon Ki Haweli",
            img_url: "/static/images/Places/raj4_PatwonKiHaweli.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Hotel Fateh Garh",
          hotel_img: "/static/images/Hotels/H_raj4_FatehGarh.jpg",
        },
        city_restaurant: {
          restaurant_name: "Hotel Fateh Garh",
          restaurant_img: "/static/images/Hotels/R_raj4_FatehGarh.jpg",
        },
      },
      {
        city_name: "Mount Abu",
        places: [
          {
            place_name: "Achalgarh Fort",
            img_url: "/static/images/Places/raj5_AchalgarhFort.jpg",
          },
          {
            place_name: "Dilwara Temple",
            img_url: "/static/images/Places/raj5_DilwaraTemple.jpg",
          },
          {
            place_name: "Guru Shikhar",
            img_url: "/static/images/Places/raj5_GuruShikhar.jpg",
          },
          {
            place_name: "Haldighati",
            img_url: "/static/images/Places/raj5_Haldighati.jpg",
          },
          {
            place_name: "Kumbhalgarh",
            img_url: "/static/images/Places/raj5_Kumbhalgarh.jpg",
          },
          {
            place_name: "Mount Abu Wildlife Sanctuary",
            img_url: "/static/images/Places/raj5_MountAbuWildlifeSanctuary.jpg",
          },
          {
            place_name: "Peace Park",
            img_url: "/static/images/Places/raj5_PeacePark.jpg",
          },
          {
            place_name: "Shri Raghunath Temple",
            img_url: "/static/images/Places/raj5_ShriRaghunathTemple.jpg",
          },
          {
            place_name: "Sunset Point",
            img_url: "/static/images/Places/raj5_SunsetPoint.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Hotel Gorbandh",
          hotel_img: "/static/images/Hotels/H_raj5_Hotel-Gorbandh.jpg",
        },
        city_restaurant: {
          restaurant_name: "Hotel Gorbandh",
          restaurant_img: "/static/images/Hotels/R_raj5_Hotel-Gorbandh.jpg",
        },
      },
      {
        city_name: "Udaipur",
        places: [
          {
            place_name: "City Palace",
            img_url: "/static/images/Places/raj6_CityPalace.jpg",
          },
          {
            place_name: "Eklingji Temple",
            img_url: "/static/images/Places/raj6_EklingjiTemple.jpg",
          },
          {
            place_name: "Fatehsagar Lake",
            img_url: "/static/images/Places/raj6_FatehsagarLake.jpg",
          },
          {
            place_name: "Jagdish Temple",
            img_url: "/static/images/Places/raj6_JagdishTemple.jpg",
          },
          {
            place_name: "Karni Mata Ropeway",
            img_url: "/static/images/Places/raj6_KarniMataRopeway.jpg",
          },
          {
            place_name: "Lake Palace",
            img_url: "/static/images/Places/raj6_LakePalace.jpg",
          },
          {
            place_name: "Lake Pichola",
            img_url: "/static/images/Places/raj6_LakePichola.jpg",
          },
          {
            place_name: "Maharana Pratap Memorial",
            img_url: "/static/images/Places/raj6_MaharanaPratapMemorial.jpg",
          },
          {
            place_name: "Sheesh Mahal Dinner",
            img_url: "/static/images/Places/raj6_SheeshMahalDinner.jpg",
          },
          {
            place_name: "Shilpgram Fair",
            img_url: "/static/images/Places/raj6_ShilpgramFair.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Bamboo Saa",
          hotel_img: "/static/images/Hotels/H_raj6_Bamboo-Saa.jpg",
        },
        city_restaurant: {
          restaurant_name: "Bamboo Saa",
          restaurant_img: "/static/images/Hotels/R_raj6_Bamboo-Saa.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Badam Ka Halwa",
        food_img: "/static/images/Food/raj_BadamKaHalwa.jpg",
        price: 149,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Bajra Ki Roti",
        food_img: "/static/images/Food/raj_Bajra-ki-Roti.jpg",
        price: 80,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Dal Baati",
        food_img: "/static/images/Food/raj_DalBaati.jpg",
        price: 180,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Ghevar",
        food_img: "/static/images/Food/raj_Ghevar.jpg",
        price: 120,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Kalmi Vada",
        food_img: "/static/images/Food/raj_Kalmi-Vada.jpg",
        price: 99,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Ker Sangri",
        food_img: "/static/images/Food/raj_Ker-Sangri.jpg",
        price: 165,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Laal Maas",
        food_img: "/static/images/Food/raj_Laal-Maas.jpg",
        price: 350,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Mawa Kachori",
        food_img: "/static/images/Food/raj_MawaKachori.jpg",
        price: 100,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Methi Bajra Puri",
        food_img: "/static/images/Food/raj_Methi-Bajra-Puri.jpg",
        price: 200,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Pyaaz ki kachori",
        food_img: "/static/images/Food/raj_Pyaaz-ki-kachori.jpg",
        price: 120,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Mohan Thal",
        food_img: "/static/images/Food/raj_Mohan-Thal.jpg",
        price: 260,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Ajmer',
    base_fare: 36829,
    duration: "22 Days 21 Nights",
  },
  // Uttarakhand
  {
    state_name: "Uttarakhand",
    state_home_cover: "/static/images/home-state-cards/uttarakhand.jpg",
    cities: [
      {
        city_name: "Dehradun and Musoorie",
        places: [
          {
            place_name: "Fun Valley",
            img_url: "/static/images/Places/uk1_FunValley.jpg",
          },
          {
            place_name: "George Everests House",
            img_url: "/static/images/Places/uk1_GeorgeEverestsHouse.jpg",
          },
          {
            place_name: "Gun Hill",
            img_url: "/static/images/Places/uk1_GunHill.jpg",
          },
          {
            place_name: "Mussoorie Lake",
            img_url: "/static/images/Places/uk1_MussoorieLake.jpg",
          },
          {
            place_name: "National Sports Academy",
            img_url: "/static/images/Places/uk1_NationalSportsAcademy.jpg",
          },
          {
            place_name: "Robbers Cave",
            img_url: "/static/images/Places/uk1_RobbersCave.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Sterling Mussoorie",
          hotel_img: "/static/images/Hotels/H_uk1_Sterling-Mussoorie.jpg",
        },
        city_restaurant: {
          restaurant_name: "Sterling Mussoori",
          restaurant_img: "/static/images/Hotels/R_uk1_Sterling-Mussoorie.jpg",
        },
      },
      {
        city_name: "Rishikesh and Haridwar",
        places: [
          {
            place_name: "Bunge Jumping",
            img_url: "/static/images/Places/uk2_BungeJumping.jpg",
          },
          {
            place_name: "Har Ki Pauri",
            img_url: "/static/images/Places/uk2_HarKiPauri.jpg",
          },
          {
            place_name: "Kaudiyala",
            img_url: "/static/images/Places/uk2_Kaudiyala.jpg",
          },
          {
            place_name: "Laxman Jhoola",
            img_url: "/static/images/Places/uk2_LaxmanJhoola.jpg",
          },
          {
            place_name: "Ram Jhula",
            img_url: "/static/images/Places/uk2_RamJhula.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "One Earth Hardwar",
          hotel_img: "/static/images/Hotels/H_uk2_One-Earth-Hardwar.jpg",
        },
        city_restaurant: {
          restaurant_name: "One Earth Hardwar",
          restaurant_img: "/static/images/Hotels/R_uk2_One-Earth-Hardwar.jpg",
        },
      },
      {
        city_name: "Nainital",
        places: [
          {
            place_name: "Hanuman Garhi",
            img_url: "/static/images/Places/uk3_HanumanGarhi.jpg",
          },
          {
            place_name: "Snow View Point",
            img_url: "/static/images/Places/uk3_SnowViewPoint.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Sterling Nainital",
          hotel_img: "/static/images/Hotels/H_uk3_Sterling-Nainital.jpg",
        },
        city_restaurant: {
          restaurant_name: "Sterling Nainital",
          restaurant_img: "/static/images/Hotels/R_uk3_Sterling-Nainital.jpg",
        },
      },
      {
        city_name: "Almora",
        places: [
          {
            place_name: "Kasar Devi",
            img_url: "/static/images/Places/uk4_KasarDevi.jpg",
          },
          {
            place_name: "Katarmal Sun Temple",
            img_url: "/static/images/Places/uk4_KatarmalSunTemple.jpg",
          },
        ],
        city_hotel: {
          hotel_name: "Hotel Shivalik River",
          hotel_img: "/static/images/Hotels/H_uk4_Hotel-Shivalik-River.jpg",
        },
        city_restaurant: {
          restaurant_name: "Hotel Shivalik River",
          restaurant_img: "/static/images/Hotels/R_uk4_Hotel-Shivalik-River.jpg",
        },
      },
    ],
    state_food: [
      {
        f_name: "Aloo ke Gutke",
        food_img: "/static/images/Food/uk_Aaloo-ke-Gutke.jpg",
        price: 160,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Arsa",
        food_img: "/static/images/Food/uk_Arsa.jpg",
        price: 95,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Balusahi",
        food_img: "/static/images/Food/uk_Balusahi.jpg",
        price: 120,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Bhang ki Chutney",
        food_img: "/static/images/Food/uk_Bhang-ki-Chutney.jpg",
        price: 140,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Bhutwa",
        food_img: "/static/images/Food/uk_Bhautwa.jpg",
        price: 190,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Jholi Curd Curry",
        food_img: "/static/images/Food/uk_Jholi-curd-curry.jpg",
        price: 220,
        food_type: "Non-Veg",
        dot_color: "red",
      },
      {
        f_name: "Kafuli",
        food_img: "/static/images/Food/uk_kafuli.jpg",
        price: 190,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Phaanu",
        food_img: "/static/images/Food/uk_phaanu.jpg",
        price: 95,
        food_type: "Veg",
        dot_color: "green",
      },
      {
        f_name: "Singori",
        food_img: "/static/images/Food/uk_singori.jpg",
        price: 235,
        food_type: "Veg",
        dot_color: "green",
      },
    ],
    tour_source: 'Dehradun',
    base_fare: 36790,
    duration: "24 Days 23 Nights",
  },
];

State.insertMany(seedState)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
