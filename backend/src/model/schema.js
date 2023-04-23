const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    books: [{
        book: {
            title: String,
            ISBN: String,
            author: String,
            description: String,
            publishDate: String,
            publisher: String
        }
    }],
    tokens: [{
        token: {
            type: String
        }
    }]
})

//hashing password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})
//generate token
userSchema.methods.generateAuthToken = async function (next) {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "qwertyuioplkjhgfdsazxcvbnmlpoijnygv");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch {
        console.log("err in generating token");
        resizeBy.status(500).send(err);
    }
}

//model
const User = mongoose.model("User", userSchema);
module.exports = User;