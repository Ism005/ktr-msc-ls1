require('dotenv').config();
const mongoose = require('mongoose');

const uri = 'mongodb+srv://Ism005:HzxSGQ7LjgFdIrxy@cluster0.ub1aqmv.mongodb.net/?retryWrites=true&w=majority'

 checkMongooseConnection = (connection) => {
    const db = connection.connection;
    db.on("error", (err) => {
        throw new Error(err);
    });
    db.once("open", () => {
        console.log(`connected to database at db`);
    });
};

mongoose.connect(uri);

async function connectDb() {
    await mongoose.connect(uri);
    console.log('Db connecté !');
    checkMongooseConnection(mongoose);
}

module.exports = {
    connectDb
}
