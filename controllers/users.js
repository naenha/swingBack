const User = require('../models/users');
const bcrypt = require("bcrypt");

exports.create = async function (req, res) {
    var userData = req.body;
    var password = userData.pwd;
    const hash = await bcrypt.hash(password, 12);

    var user = new User({
        name: userData.name,
        email: userData.email,
        pwd: hash,
        memberType: userData.memberType,
    });

    await user.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};
