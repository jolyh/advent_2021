const express = require('express');
const day4Exo1Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay4.txt'
const exoName = "day4_exo1"

day4Exo1Router
  .get("/", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      // split result -> [0] -> numbers pulled, then [1] = '', then 5 ([2][3][4][5][6]) for grid 1, then [7] = '' then 5 frid 2, etc..
      //console.log(dataArray[0])

      var regex = /(\d\d?)/g // find all the numbers

      var numbers = dataArray[0];
      numbers = numbers.match(regex)
      //console.log(numbers)

      dataArray.splice(0, 1); // remove the numbers

      dataArray = dataArray.filter(item => {
        return item !== ""
      })
      // up to here, data is good, 500 rows of characters -> 100 grids
      console.log(dataArray)
      console.log(dataArray.length)

      var gridsString = dataArray.toString()

      //console.log(gridsString.length)
      //console.log(gridsString.replace(/\D/g, "")) 
      //console.log(gridsString.replace(/\D/g, "").length) // 4722 char (only digit) -> sounds ok

      var gridNumbers = gridsString.match(regex); // get a bit array with all the numbers 
      //console.log(gridNumbers) 
      //console.log(gridNumbers.length) // 2500 char -> sounds ok

      var grids = []
      var grid = []
      // make grid of 25 numbers
      for (var i = 0; i < gridNumbers.length; i++){
        grid = []
        for (var r = 0; r < 25; r++) {
          grid.push(gridNumbers[i+r])
        }
        grids.push(grid)
        i+= r -1
      }

      //console.log(grids) // now arrays of 25 numbers [0-24]
      //console.log(grids.length) // now arrays of 25 numbers [0-24] // 100 grids -> good

      for (var n = 0; n < numbers.length; n++){
        grids = markNumber(grids, numbers[n])
        if (grids == null) {
          break
        }
      }


      fs.writeFile(
        (path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),
        (""), 
        err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
      res.send("GET on " + exoName + " : result -> ")
    })

})

function markNumber(grids, number) {
  
  var index = -1;
  var winningRow = false;
  var winningCol = false;

  var won = -1;

  console.log(grids)

  for (var g = 0; g < grids.length; g++) { // iterate through all the grids (each grid is 25 numbers)
    index = numberInGrid(grids[g], number)
    if (index != -1){
      grids[g][index] = ""
      //console.log(grids[g])
      winningRow = checkWinningRows(grids[g])
      winningCol = checkWinningCollumns(grids[g])
      if (winningRow || winningCol) {
        console.log("Winning grid -> " + g + " - Score: " + calculateScore(grids[g], number))
        grids.splice(g, 1)
        return null
      }
    }
  }

  return grids;
}

function numberInGrid(grid, number) {
  for (var i = 0; i < grid.length; i++) {
    if (grid[i] == number) {
      return i;
    }
  }
  return -1;
} 

function checkWinningRows(grid) {

  var empty;

  for (var r = 0; r < grid.length; r++) {
    empty = 0;
    for (var c = 0; c < 5; c++) {
      if (grid[r+c] != "") {
        empty = 1
        break
      }
    }
    if (empty == 0)
      return true
  }
  return false
}

function checkWinningCollumns(grid) {

  var empty;

  for (var r = 0; r < grid.length; r++) {
    empty = 0;
    for (var c = 0; c < 5; c++) {
      if (grid[r+c] != "") {
        empty = 1
        break
      }
    }
    if (empty == 0)
      return true
  }
  return false
}

function calculateScore(grid, number){

  var sum = 0;

  for (var i = 0; i < grid.length; i++){
    if (grid[i] != ""){
      //console.log("sum " + sum + " + " + grid[i])
      sum += Number(grid[i])
    }
  }
  //console.log("sum " + sum + " x " + number)
  return sum * Number(number)
}



module.exports.day4Exo1Router = day4Exo1Router;