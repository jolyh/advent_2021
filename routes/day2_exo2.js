const express = require('express');
const day2Exo2Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay2.txt'
const exoName = "day2_exo2"

day2Exo2Router
  .get("/", function (req, res) {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      var resultArray = []
      var horizontal = 0 
      var aim = 0
      var depth = 0
      var total = 0

      for (var i = 0; i < dataArray.length; i++){
        if (dataArray[i].startsWith("forward")){
          horizontal += Number(dataArray[i].substring(8))
          depth += (aim * Number(dataArray[i].substring(8)))
        } else if (dataArray[i].startsWith("down")){
          aim += Number(dataArray[i].substring(5))
        } else if (dataArray[i].startsWith("up")){
          aim -= Number(dataArray[i].substring(3))
        }
        total = depth * horizontal
        console.log("horizontal: " + horizontal + " - depth " + depth + " - aim " + aim + " -> " + total)
        resultArray.push("horizontal: " + horizontal + " - depth " + depth + " - aim " + aim + " -> " + total + "\n")
      }

      fs.writeFile((path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'), resultArray.toString(), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
      res.send("GET on " + exoName + " : result -> " + total)
    })

  })

module.exports.day2Exo2Router = day2Exo2Router;