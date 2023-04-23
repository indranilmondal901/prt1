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
router.post("/logout", auth, async (req, res) => {
    try {
        console.log(req.user.username);
        //logout from all devices
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({
            message: "sucessfully logout"
        })
    } catch (err) {
        console.log(err.message)
        res.status(501).send({
            message: err.message
        })
    }
})
//add book
router.post("/add-book", auth, async (req, res) => {
    const book = {
        title: req.body.title,
        ISBN: req.body.ISBN,
        author: req.body.author,
        description: req.body.description,
        publishDate: req.body.publishDate,
        publisher: req.body.publisher,
    }
    req.user.books = await req.user.books.concat({ book: book })
    const user = await req.user.save();
    res.status(200).send({
        message: "Book sucessfully added",
        data: user.books
    })

})
//update book
router.put("/edit", auth, async (req, res) => {
    const user = req.user;
    const isbn = req.body.ISBN;
    const bookToUpdate = user.books.find((book) => book.book.ISBN === isbn);

    if (bookToUpdate) {
        try {
            // Update the book properties with the new values from the request body
            bookToUpdate.book.title = req.body.title;
            bookToUpdate.book.author = req.body.author;
            bookToUpdate.book.description = req.body.description;
            bookToUpdate.book.publishDate = req.body.publishDate;
            bookToUpdate.book.publisher = req.body.publisher;

            await user.save();

            res.status(200).send({
                message: "Book updated successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    } else {
        res.status(404).send({
            message: "Book not found",
        });
    }
});


//route for single book
router.post("/sbook", auth, async (req, res) => {
    const user = req.user;
    const isbn = req.body.ISBN; // assuming the ISBN is passed as a string in the request body
    // console.log(user)

    try {
        // Find the book in the user's books array that matches the ISBN
        const sbook = await user.books.find((book) => book.book.ISBN === isbn);

        if (sbook) {
            res.status(200).send({
                data: sbook,
            });
        } else {
            res.status(404).send({
                message: "Book not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error",
        });
    }
});


//delete book
router.post("/delete-book", auth, async (req, res) => {
    //delete single book
    req.user.books = req.user.books.filter((val, index, arr) => {
        return val.book.ISBN != req.body.ISBN
    })
    const user = await req.user.save();
    res.status(200).send({
        message: "Book sucessfully deleted",
        data: user.books
    })
})

//getting book list
router.post("/booklist", auth, async (req, res) => {
    const bookList = req.user.books;
    res.status(200).send({
        data: bookList
    })
})

module.exports = router;