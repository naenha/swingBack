var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
            name : {type: String},
            email : {type: String, unique: true},
            pwd : {type: String},
            memberType : {type: Boolean}, //0: 일반, 1:관리자
            createdAt : {type: Date, default : Date.now},
    }
);


UserSchema.set('toObject', {getters: true, virtuals: true});

var User = mongoose.model('User', UserSchema);

module.exports = User;