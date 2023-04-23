const User = require("../model/schema");
const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    try {
        let token = req.body.token;
        // console.log(token)
        const verifyUser = jwt.verify(token, "qwertyuioplkjhgfdsazxcvbnmlpoijnygv");
        // console.log(verifyUser);
        if (verifyUser) {
            const user = await User.findOne({ _id: verifyUser._id });
            // console.log(user)
            req.token = token;
            req.user = user;
            next()
        }

    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = auth;