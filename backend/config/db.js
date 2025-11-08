
 const mongoose = require('mongoose');


// const connectDB = async ()=>{
//     try {
//         await mongoose.connect(
//             process.env.uri,
//          //  {useNewUrlParser: true}
//             )
//             console.log('mongoose connection open')
//     } catch (error) {
//         console.log(error.message)
//     }
// }

  


//  module.exports = connectDB ;
// import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

module.exports = connectDB ;