const express = require('express');

const sneakerRouter = require('./sneakerRoutes');
const authRouter = require('./authRoutes'); 

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/sneakers', sneakerRouter);

module.exports = v1Router;