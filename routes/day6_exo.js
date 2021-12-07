const express = require('express');
const day6ExoRouter = express.Router();
const fs = require('fs')
const path = require('path');
const { finished } = require('stream');

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay6.txt'
const exoName = "day6_exo1"

day6ExoRouter
  .get("/", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.split(',')
        .map(Number)

      var days = 256 // 80
      /*
      for (var i = 0; i < days; i++) {
        //dataArray = SplitCycle(dataArray)
        dataArray = SpawnCycle(dataArray)
        console.log("Cycle " + i + " completed, amount of fishes -> " + dataArray.length)
      } 
      */
      console.log(data)
      //console.log(SpawnCycle2(data, days))
      var total = MySpawnCycle(data, days)
      //dataArray = SpawnCycle(dataArray, days)

      fs.writeFile(
        (path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),
        total,
        err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      res.send("GET on " + exoName + " : result -> " + total)
    })

  })


// initial naive way
function SpawnCycle(dataArray, days) {

  for (var d = 0; d < days; d++) { 

    const len = dataArray.length
    for (var i = 0; i < len; i++) {
      if (dataArray[i] === 0) {
        dataArray.push(8)
        dataArray[i] = 6
      } else {
        dataArray[i]--;
      }
    }
    console.log("Cycle " + d + " completed, amount of fishes -> " + dataArray.length)
  }

  return dataArray
}

// followed https://github.com/nesro/adventofcode/blob/master/2021-day-06.ts -> this is genius, I should have thought about it
function MySpawnCycle(data, days) {

  var fishes = [0,0,0,0,0,0,0,0]

  for (var i = 0; i < data.length; i++) {
    fishes[data[i]]++
    console.log("i -> " + i + " value " + data[i] + " fishes " + fishes[data[i]])
  }

  console.log("initial completed, amount of fishes -> " + fishes)
  for (var i = 0; i < days; i++) {
    var spanwed = []
    spanwed[0] = fishes[1] || 0
    spanwed[1] = fishes[2] || 0
    spanwed[2] = fishes[3] || 0
    spanwed[3] = fishes[4] || 0
    spanwed[4] = fishes[5] || 0
    spanwed[5] = fishes[6] || 0
    spanwed[6] = (fishes[0] || 0) + (fishes[7] || 0)
    spanwed[7] = fishes[8] || 0
    spanwed[8] = fishes[0] || 0

    fishes = spanwed

    console.log("Cycle " + i + " completed, amount of fishes -> " + fishes)
  }

  var total = 0;
  for (var i = 0; i < fishes.length; i++) {
    total += fishes[i]
  }

  console.log("Cycle completed, total of fishes -> " + total)

  return data
}



module.exports.day6ExoRouter = day6ExoRouter;