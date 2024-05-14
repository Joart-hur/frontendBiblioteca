require('dotenv').config({path:'variaveis.eng'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routers = require('./routers')

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.listen(process.env.PORT, ()=>{
    console.log('Server Runnin on: http://localhost:${process.env.PORT}')
})