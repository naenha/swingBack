const Report = require('../models/reports');
const User = require('../models/users');
var path = require('path');

exports.create = async function (req, id, res) {
    var userData = req.body;

    //const userid = await User.findById(id);

    var report = new Report({
        userID: id,
        //userName: userData.userName,
        img: req.file.path,
        lat: userData.lat,
        lng: userData.lng,
        species: userData.species,
        cause : userData.cause,
        otherInfo: userData.otherInfo,
        status: userData.status,
        accidentTime: userData.accidentTime
    });

    await report.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};
