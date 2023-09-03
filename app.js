const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const reportsRouter = require('./routes/reports');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/', express.static('./public/'));
app.use(passport.initialize());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:'@#@$MYSIGN#@$#$',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/auth', authRouter);
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
