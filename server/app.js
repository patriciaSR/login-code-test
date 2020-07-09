const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/authRouter');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

module.exports = app;
