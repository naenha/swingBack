const miss = require('./misses');
const report = require('./reports');

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


exports.sendAlarm = async function (req, res) {

    // 그냥 알람... 사고 반경 3km에 들어왔습니다. 주의하세요 같은 

    //한 번만 알림 보내면 좋겠는데 글고 위치는 계속 받아와야함


    //var userId = req.body.id;

    // 이미 저장되어 있는 사고 좌표들 어떻게 불러오지
    var reports = report.getAllLocation();
	var misses = miss.getAllMissLoc();

	console.log(reports);
	console.log("____________________________-----------------");
	console.log(misses);

    // 사용자의 위치 좌표
    //var lat2 = req.body.lat;
    //var lng2 = req.body.lng;

    // reports의 개수만큼 포문 돌려서 lat2, lng2랑 거리 비교




};


