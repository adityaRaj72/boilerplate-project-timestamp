// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

app.get("/api/:date", function (req, res){
  let date = req.params.date;
  if(date.includes('-'))
    date = new Date(date);
  else
    date = new Date(date*1);
  let obj = {
    "unix": date.getTime(),
    "utc": week[date.getDay()] +", "+ date.getDate() + " "+ months[date.getMonth()] + ' ' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' GMT'
  }
  res.json(obj);
})

app.get("/api", function (req, res){
  let date = new Date();
  let obj = {
    "unix": date.getTime(),
    "utc": week[date.getDay()] +", "+ date.getDate() + " "+ months[date.getMonth()] + ' ' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' GMT'
  }
 res.json(obj);
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
