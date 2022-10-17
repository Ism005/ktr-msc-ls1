const express = require('express');
const {connectDb} = require('../server/db/conn.js');
const User = require("../models/users");
const router = new express.Router();
const userRoutes = require('../routes/route');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(express.json({extend:false }));
app.use(userRoutes);


connectDb().catch(err => console.log(err));
app.listen(5001, () => {
    console.log("Started application on port %d", 5001);
});
