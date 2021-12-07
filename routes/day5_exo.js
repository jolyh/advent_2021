const express = require('express');
const day5ExoRouter = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay5.txt'
const exoName = "day5_exo"

day5ExoRouter
  .get("/", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.split("\n").filter(Boolean)

      //tested against https://github.com/nesro/adventofcode/blob/master/2021-day-05.ts -> biggest issue was my array was string, not 

      var coordinates = []

      var regex = /(\d\d*)/g // find all the numbers

      // each line is 1 set of coordinates in the array
      for (var i = 0; i < dataArray.length; i++) {
        coordinates.push((dataArray[i].match(regex)).map(x => Number(x)))
      }
      //console.log(coordinates)
      var grid = []

      var arraySize = 1000
      for (var y = 0; y < arraySize; y++) {
        var line = []
        for (var x = 0; x < arraySize; x++) {
          line.push(0)
        }
        grid.push(line)
      }
      //console.log(grid) // big array of 1000x1000

      //console.log("coordinates")
      //console.log(coordinates)
      grid = addLines(coordinates, grid)

      fs.writeFile(
        (path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),
        (formatResult(grid)),
        err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      res.send("GET on " + exoName + " : result -> " + countOverlaps(grid))
    })

  })

function isDiagonal(coordinates) {
  return (coordinates[0] != coordinates[2] && coordinates[1] != coordinates[3])
}

function addLines(lines, grid, withDiagonal = true) { // withDiagonal = false for exo 1, true for exo 2 
  console.log(lines)

  for (var l = 0; l < lines.length; l++) {
    if (!isDiagonal(lines[l]) || withDiagonal) {

      var x1 = lines[l][0]
      var y1 = lines[l][1]
      var x2 = lines[l][2]
      var y2 = lines[l][3]

      while (x1 != x2 || y1 != y2) {

        grid[y1][x1]++
        //console.log("x1 " + x1 + " -- y1 " + y1)
        //console.log("x2 " + x2 + " -- y2 " + y2)

        if (x1 < x2) {
          x1++
        } else if (x1 > x2) {
          x1--
        }

        if (y1 < y2) {
          y1++
        } else if (y1 > y2) {
          y1--
        }
      }
      grid[y2][x2]++
    }
  }
  return grid;
}

function countOverlaps(grid) {
  //console.log(grid)
  var overlaps = 0
  var checked = 0;
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] > 1) {
        //console.log("overlap ["+y+"]["+x+"] -> " + grid[y][x])
        overlaps++
      }
      checked++
    }
  }
  console.log("checked -> " + checked + "; > 1 -> " + overlaps)
  return overlaps
}

// back to my code
function formatResult(grid) {
  var formattedResult = ""

  for (var i = 0; i < grid.length; i++) {
    var line = ""
    for (var t = 0; t < grid[i].length; t++) {
      if (grid[i][t] > 10) {
        line += grid[i][t]
      } else {
        line += " " + grid[i][t]
      }
      line += "|"
    }
    formattedResult += line + "\n"
  }
  return formattedResult
}

module.exports.day5ExoRouter = day5ExoRouter;