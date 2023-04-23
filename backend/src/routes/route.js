const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const auth = require('../middlewire/auth')

//model
const User = require("../model/schema")

//router
const router = express.Router();

//middlewire
router.use(cors());
router.use(express.json());
router.use(bodyparser.urlencoded({ urlencoded: true }));
router.use(bodyparser.json());

//routes

//register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })
        console.log(newUser);
        //hasing password
        //save
        const registeredUser = await newUser.save();
        res.status(200).send({
            messgae: "sucessfully registered",
            data: registeredUser
        })
    } catch (err) {
        // console.log(err)
        res.status(200).send({
            messgae: err
        })
    }
})
//login
router.post("/login", async (req, res) => {
    try {
        const enterendUsername = req.body.username;
        const enterendPassword = req.body.password;

        const userData = await User.findOne({ username: enterendUsername });
        if (userData) {
            const isMatch = await bcrypt.compare(enterendPassword, userData.password);
            if (isMatch) {
                //generate token
                const token = await userData.generateAuthToken();
                // console.log(token);
                res.status(200).send({
                    message: "Login sucessfully",
                    data: userData,
                    token: token
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            message: "invalid credential"
        })
    }
})
//logout
router.post("/logout",auth, async (req, res) => {
    try {
        console.log(req.user.username);
        //logout from all devices
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({
            message: "sucessfully logout"
        })
    }catch(err){
        console.log(err.message)
        res.status(501).send({
            message: err.message
        })
    }
})
//add book
router.post("/add-book",auth,async(req,res)=>{
    const book = {
        title: req.body.title,
        ISBN: req.body.ISBN,
        author: req.body.author,
        description: req.body.description,
        publishDate: req.body.publishDate,
        publisher: req.body.publisher,
    }
    req.user.books = await req.user.books.concat({book: book})
    const user = await req.user.save();
    res.status(200).send({
        message:"Book sucessfully added",
        data: user.books
    })

})
//update book
router.put("/edit",auth,async(req,res)=>{
    
})

//getting book list
router.post("/booklist",auth,async (req, res) => {
    const user = req.user
    const sbook = await user.books.filter({ISBN: req.body.ISBN})
    res.status(200).send({
        data: sbook
    })
})

//delete book
router.post("/delete-book",auth,async(req,res)=>{
    //delete single book
    req.user.books = req.user.books.filter((val,index,arr)=>{
        return val.book.ISBN != req.body.ISBN
    })
    const user = await req.user.save();
    res.status(200).send({
        message:"Book sucessfully deleted",
        data: user.books
    })
})

//getting book list
router.post("/booklist",auth,async (req, res) => {
    const bookList = req.user.books;
    res.status(200).send({
        data: bookList
    })
})

module.exports = router;