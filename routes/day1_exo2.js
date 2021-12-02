const express = require('express');
const day1Exo2Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */

const filePath = path.resolve(__dirname, '..') + '/files/inputFile.txt'
const exoName = "day1_exo2"

day1Exo2Router
  .get("/", function (req, res) {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      var increaseNumber = 0
      var resultArray = []
      for (var i = 0; i <= dataArray.length ; i++){
        if (get3SumNumber(dataArray, i) < get3SumNumber(dataArray, i+1)) {
          increaseNumber++;
          resultArray.push("prevValue " + dataArray[i-1] + " - currentValue " + dataArray[i] + " number of increase " + increaseNumber + "\n") 
        }
      }
      console.log(increaseNumber)
      fs.writeFile((path.resolve(__dirname, '..') + ('/files/result_' + exoName + '.txt')), resultArray.toString(), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
      res.send("GET on " + exoName + " : result -> " + increaseNumber)
    })

  })

function get3SumNumber(array, i){
  return Number(array[i]) + Number(array[i+1]) + Number(array[i+2])
}


module.exports.day1Exo2Router = day1Exo2Router;