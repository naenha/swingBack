const Report = require('../models/reports');
const User = require('../models/users');
var path = require('path');

exports.create = async function (req, res) {
    var userData = req.body;

    //userid 어케하지?...
    const userid = await User.findById(userData.userID);

    var user = new Report({
        //userID: userData.userID,
        userName: userData.userName,
        img: req.file.path,
        lat: userData.lat,
        lng: userData.lng,
        species: userData.species,
        cause : userData.cause,
        otherInfo: userData.otherInfo,
        status: userData.status,
    });

    await user.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};
