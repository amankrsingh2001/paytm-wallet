const mongoose = require('mongoose')


exports.DbConnect = async() =>{
   await mongoose.connect('mongodb+srv://amandev:amankrsingh@cluster0.yff37w4.mongodb.net/paytm')
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}