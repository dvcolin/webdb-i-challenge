const express = require('express');

const accountsRouter = require('./routes/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/accounts', accountsRouter);




module.exports = server;