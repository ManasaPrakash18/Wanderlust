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
    await Listing.insertMany(initdata.data);
    console.log("Database Initialized");

}

init();