const mongoose = require('mongoose')
const User = require('./models/userModel')
const users = require('./data/users')
const connectDb = require('./config/connectDb')

require('dotenv').config()

connectDb();


const importData = async () => {
    try {
      await User.deleteMany();
  
      await User.insertMany(users);
  
      console.log('Data Imported!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };
  
  const destroyData = async () => {
    try {
      await User.deleteMany();
  
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };
  


if(process.argv[2] === "-d"){
    destroyData();
}else{
    importData();
}