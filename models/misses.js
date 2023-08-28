var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MissSchema = new Schema(
    {

        size : {type: Number}, //0: 모름, 1:작다, 2:크다
        createdAt : {type: Date, default : Date.now},
    }
);


MissSchema.set('toObject', {getters: true, virtuals: true});

var Miss = mongoose.model('Miss', MissSchema);

module.exports = User;