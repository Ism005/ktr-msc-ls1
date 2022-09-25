const express = require('express');
const User = require("../models/users");
const router = new express.Router();
const app = express();
const bcrypt = require('bcrypt');
const Card = require("../models/card");


router.post("/test", (req, res, next) => {
    res.json({message: "hellloooo!!"})
});

router.post("/register" , async (req  , res , next) => {
    console.log(req.body);
    let {password} = req.body;
    let pass = req.body.password
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (password !== null && password !== undefined ) {
            const userr = new User(req.body);
            await  userr.save();
            res.status(201).send( userr );
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        console.log(user);
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/cards", async (req, res) => {
    console.log(req.body);
    const {name, email, company, phone, userId} = req.body;
    try {
        const card = await new Card({name: name, email: email, company: company, phone: phone, userId: userId});
        console.log(card);
       await card.save();
        res.status(200).send(card);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/cards/:userid", async (req, res) => {
    const userId = req.params.userid;
    try {
        console.log(userId);
          Card.find({"userId": userId} , (err, found) => {
            if (err) {
                return res
                    .status(400)
                    .send(err);
            }
            console.log(found)
            return res
                .status(200)
                .send(found);
        })
    } catch (e){
        res.status(400).send(e);
    }
});


router.get( '/users/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userr = User.find(userId);
        res.send(userr)
    } catch (e){
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res, next) => {
    try{
        const userr = await User.find({});
        res.send(userr);
    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;
