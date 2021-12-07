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

//DAY1
app.use('/day1_exo1', require('./routes/day1_exo1').day1Exo1Router);
app.use('/day1_exo2', require('./routes/day1_exo2').day1Exo2Router);
//DAY2
app.use('/day2_exo1', require('./routes/day2_exo1').day2Exo1Router);
app.use('/day2_exo2', require('./routes/day2_exo2').day2Exo2Router);
//DAY3
app.use('/day3_exo1', require('./routes/day3_exo1').day3Exo1Router);
app.use('/day3_exo2', require('./routes/day3_exo2').day3Exo2Router);
//DAY4
app.use('/day4_exo1', require('./routes/day4_exo1').day4Exo1Router);
app.use('/day4_exo2', require('./routes/day4_exo2').day4Exo2Router);
//DAY5
app.use('/day5_exo', require('./routes/day5_exo').day5ExoRouter);
//DAY6
app.use('/day6_exo', require('./routes/day6_exo').day6ExoRouter);
//DAY6
app.use('/day7_exo', require('./routes/day7_exo').day7ExoRouter);

app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// listen for requests :)
//const listener = app.listen(process.env.PORT, function() {
const listener = app.listen(8080, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
