const User = require('../models/users');
const Miss = require('../models/misses');
var path = require('path');

exports.create = async function (req,id, res) {
    var userData = req.body;

    //const userid = await User.findById(id);

    var miss = new Miss({
        userID: id,
        lat: userData.lat,
        lng: userData.lng,
        size: userData.size,
        accidentTime: userData.accidentTime
    });

    await miss.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};
