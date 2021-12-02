const express = require('express');
const day1Exo1Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay1.txt'
const exoName = "day1_exo1"

day1Exo1Router
  .get("/", function (req, res) {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      var prevValue = dataArray[0]
      var increaseNumber = 0
      var resultArray = []
      for (var i = 1; i <= dataArray.length ; i++){
        if (Number(dataArray[i-1]) < Number(dataArray[i])) {
          increaseNumber++;
          console.log("prevValue " + dataArray[i-1] + " - currentValue " + dataArray[i] + " number of increase " + increaseNumber)
          resultArray.push("prevValue " + dataArray[i-1] + " - currentValue " + dataArray[i] + " number of increase " + increaseNumber + "\n") 
        }
        //prevValue = dataArray[i]
      }
      console.log(increaseNumber)
      fs.writeFile((path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'), resultArray.toString(), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
      res.send("GET on " + exoName + " : result -> " + increaseNumber)
    })

  })

module.exports.day1Exo1Router = day1Exo1Router;