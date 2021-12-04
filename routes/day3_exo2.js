const express = require('express');
const day3Exo2Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay3.txt'
const exoName = "day3_exo2"

day3Exo2Router
  .get("/", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")

      var o2GenerationRating = parseInt(o2Generation(dataArray), 2)
      var o2ScrubbingRating = parseInt(o2Scrubbing(dataArray), 2)
      var lifeSupportRating = o2GenerationRating * o2ScrubbingRating

      console.log("o2GenerationRating x o2ScrubbingRating = consumption -> "
        + o2GenerationRating + " x " + o2ScrubbingRating + " = " + lifeSupportRating)


      fs.writeFile((path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),
        ("o2GenerationRating x o2ScrubbingRating = consumption -> "
          + o2GenerationRating + " x " + o2ScrubbingRating + " = " + lifeSupportRating), err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
      res.send("GET on " + exoName + " : result -> " + lifeSupportRating)
    })

  })

function o2Generation(dataArray) {

  var zeroStartingArray = []
  var oneStartingArray = []

  for (var i = 0; i < dataArray[0].length; i++) {
    zeroStartingArray = []
    oneStartingArray = []

    for (var t = 0; t < dataArray.length; t++) {
      if (dataArray[t][i] == "0") {
        zeroStartingArray.push(dataArray[t])
      } else {
        oneStartingArray.push(dataArray[t])
      }
    }
    console.log("[o2Generation] - [" + i + "] oneStartingArray.length " + oneStartingArray.length + " - zeroStartingArray.length " + zeroStartingArray.length)
    if (oneStartingArray.length >= zeroStartingArray.length) {
      dataArray = oneStartingArray
      console.log("[o2Generation] - [" + i + "] oneStartingArray " + oneStartingArray + " len " + oneStartingArray.length)
    } else {
      dataArray = zeroStartingArray
      console.log("[o2Generation] - [" + i + "] zeroStartingArray " + zeroStartingArray + " len " + zeroStartingArray.length)
    }
    if (dataArray.length == 1) {
      return dataArray[0]
    }
  }
}

function o2Scrubbing(dataArray) {

  var zeroStartingArray = []
  var oneStartingArray = []

  for (var i = 0; i < dataArray[0].length; i++) {
    zeroStartingArray = []
    oneStartingArray = []

    for (var t = 0; t < dataArray.length; t++) {
      if (dataArray[t][i] == "0") {
        zeroStartingArray.push(dataArray[t])
      } else {
        oneStartingArray.push(dataArray[t])
      }
    }
    console.log("[o2Scrubbing] - [" + i + "] oneStartingArray.length " + oneStartingArray.length + " - zeroStartingArray.length " + zeroStartingArray.length)
    if (oneStartingArray.length >= zeroStartingArray.length) {
      dataArray = zeroStartingArray
      console.log("[o2Scrubbing] - [" + i + "] zeroStartingArray " + zeroStartingArray + " len " + zeroStartingArray.length)
    } else {
      dataArray = oneStartingArray
      console.log("[o2Scrubbing] - [" + i + "] oneStartingArray " + oneStartingArray + " len " + oneStartingArray.length)
    }
    if (dataArray.length == 1) {
      return dataArray[0]
    }
  }
}

// Am sure you can do both at the same time but am lazy

module.exports.day3Exo2Router = day3Exo2Router;