var express = require('express');
var spotifyTools = require("./spotifyTools")
var cors = require("cors")

var app = express();

app.use(cors())
app.use(spotifyTools)

console.log('Listening on 3000');
app.listen(3000);