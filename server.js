// server.js
// where your node app starts
// init project
const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// http://expressjs.com/en/starter/basic-routing.html

app.use('/day1_exo1', require('./routes/day1_exo1').day1Exo1Router);
app.use('/day1_exo2', require('./routes/day1_exo2').day1Exo2Router);
app.use('/day2_exo1', require('./routes/day2_exo1').day2Exo1Router);
app.use('/day2_exo2', require('./routes/day2_exo2').day2Exo2Router);

app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// listen for requests :)
//const listener = app.listen(process.env.PORT, function() {
const listener = app.listen(8080, function() {
  console.log("Your app is listening on port " + listener.address().port);
});