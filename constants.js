const express = require('express');
const api = express();
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const port = 3009;
module.exports = { api, bodyParser, admin, port };