var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MissSchema = new Schema(
    {
            userID : {type: Schema.Types.ObjectId, ref: 'User'},
            size : {type: Number, required: true}, //0: 모름, 1:작다, 2:크다
            lat: {type: Number},
            lng: {type: Number},
            accidentTime: {type: Date, default : Date.now},
            createdAt : {type: Date, default : Date.now}
    }
);


MissSchema.set('toObject', {getters: true, virtuals: true});

var Miss = mongoose.model('Miss', MissSchema);

module.exports = Miss;