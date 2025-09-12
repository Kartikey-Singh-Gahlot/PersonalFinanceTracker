const mongoose = require('mongoose');
require('dotenv').config();

const setDbConnection = async () =>{
  await mongoose.connect(process.env.MONGOURL)
}


module.exports = setDbConnection;