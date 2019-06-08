const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const initServer = () => {
    const server = express(),
          router = express.Router();

    server.use(bodyParser.json());
    server.use(cors());

    return { server, router };
}

const initDB = () => {
    const adapter = new FileSync('db.json');
    const db = low(adapter);
    
    return db;
}



module.exports = {
    initServer,
    initDB
};