const express = require('express');
const day7ExoRouter = express.Router();
const fs = require('fs')
const path = require('path');

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay7.txt'
const exoName = "day7_exo"

day7ExoRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

day7ExoRouter
  .all("/1", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var positions = data.split(',')
        .map(Number)

      var costPerPosition = []

      var maxPosition = BiggestArrayValue(positions)

      for (var i = 0; i < maxPosition; i++) {
        costPerPosition.push(FuelCost(positions, i))
      }

      var bestPosition = SmallestArrayValue(costPerPosition)

      fs.writeFile(
        (path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),
        costPerPosition.toString(),
        err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      res.send("GET on " + exoName + " : result -> " + bestPosition)
    })
    
  });

  day7ExoRouter.all("/2", (req, res) => {
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var positions = data.split(',')
        .map(Number)

      var costPerPosition = []

      var maxPosition = BiggestArrayValue(positions)

      for (var i = 0; i < maxPosition; i++) {
        costPerPosition.push(IncrementalFuelCost(positions, i))
      }

      var bestPosition = SmallestArrayValue(costPerPosition)

      WriteOutput(costPerPosition.toString())

      res.send("GET on " + exoName + " : result -> " + bestPosition)
    })
  });

function FuelCost(positions, desiredPosition) {

  var fuelCost = 0;

  positions.forEach(position => {
    if (position > desiredPosition) {
      fuelCost += (position - desiredPosition)
    } else {
      fuelCost += (desiredPosition - position)
    }
  })
  return fuelCost
}

function IncrementalFuelCost(positions, desiredPosition) {

  var fuelCost = 0;

  for (var i = 0; i < positions.length; i++){
    if (positions[i] > desiredPosition) {
      fuelCost += Increment(positions[i] - desiredPosition)
    } else {
      fuelCost += Increment(desiredPosition - positions[i])
    }
  }

  return fuelCost
}

function Increment(number) {

  var incremented = 0;
  for (var i = 0; i <= number; i++) {
    incremented += i
  }
  return incremented
}

function BiggestArrayValue(positions) {

  var biggest = 0;

  for (var i = 0; i < positions.length; i++) {
    if (biggest < positions[i]) {
      biggest = positions[i]
    }
  }

  return biggest;
}

function SmallestArrayValue(positions) {

  console.log("SmallestArrayValue -> " + positions)

  var smallest = BiggestArrayValue(positions);

  for (var i = 0; i < positions.length; i++) {
    if (smallest > positions[i]) {
      smallest = positions[i]
    }
  }

  console.log("SmallestArrayValue -> " + smallest)

  return smallest
}

function WriteOutput(output) {
  fs.writeFile(
    (path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'), output, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
}


module.exports.day7ExoRouter = day7ExoRouter;