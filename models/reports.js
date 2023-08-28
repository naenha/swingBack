var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReportSchema = new Schema(
    {
            userID : {type: Schema.Types.ObjectId, ref: 'User'},
            // userName : {type: String, required: true},
            img: {type: String, required: true},
            lat: {type: Number, required: true},
            lng: {type: Number, required: true},
            species: {type: String, required: true, default : "unknown"},
            cause : {type: String},
            otherInfo: {type: String, maxlength: 1000},
            status: {type : Boolean, default: 0},    //0: 처리중, 1:처리완료
            accidentTime : {type: Date, default : Date.now},
            createdAt: {type: Date, default : Date.now}
    }
);


ReportSchema.set('toObject', {getters: true, virtuals: true});

var Report = mongoose.model('Report', ReportSchema);

module.exports = Report;