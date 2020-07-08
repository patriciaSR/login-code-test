var express = require('express');
var logger = require('morgan');

var authRouter = require('./routes/authRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

module.exports = app;
