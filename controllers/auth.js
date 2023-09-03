const passport = require('passport');
const User = require('../models/users');

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(info.message);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            else {
                
                var email = req.body.email;
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        console.error('찾기 오류:', err);
                        // 오류 처리
                    }
                
                    if (user) {
                        const id = user._id; 
                        return res.status(200).send(id);
                        // id를 사용하여 원하는 작업 수행
                    } else {
                        console.log('일치하는 유저 없음');
                        // 일치하는 유저가 없을 때의 처리
                    }
                });

            }
            
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.status(200).send("logout");
    });
};