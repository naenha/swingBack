const Miss = require('../models/misses');

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

    miss.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};


exports.getAllMisses = function(req,res) {
    return Miss.find()
        .sort({ createdAt: -1 }) 
        .lean().exec();
};

exports.getAllMissLoc = function(req, res) {
    return Miss.find()
        .sort({ createdAt: -1 })
        .select('lat lng')
        .lean()
        .exec()
        .then((reports) => {
            const locations = reports.map((report) => ({
                lat: report.lat,
                lng: report.lng
            }));
            return locations;
        })
        .then((locations) => {
            // 여기서 locations을 사용하거나 반환합니다.
            res.json(locations); // 예: JSON 형태로 응답을 보냅니다.
        })
        .catch((error) => {
            // 오류 처리
            console.error(error);
            //res.send({ error: error.message }); // 에러 메시지를 클라이언트에게 보냅니다.
        });
};

