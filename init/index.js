const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initdata=require("./data.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust"


main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);}

const init = async () => {
  await Listing.deleteMany({});

  const listingsWithOwner = initdata.map(obj => ({
    ...obj,
    owner: "696e414b9d71f47a30ee3614"
  }));

  await Listing.insertMany(listingsWithOwner);

  console.log("Database Initialized");
};


init();