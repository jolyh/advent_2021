const express = require('express');
const day2Exo1Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay2.txt'
const exoName = "day2_exo1"

day2Exo1Router
  .get("/", function (req, res) {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      var resultArray = []
      var horizontal = 0;
      var depth = 0;
      var total = 0;
      for (var i = 0; i < dataArray.length; i++){
        if (dataArray[i].startsWith("forward")){
          horizontal += Number(dataArray[i].substring(8))
        } else if (dataArray[i].startsWith("down")){
          depth += Number(dataArray[i].substring(5))
        } else if (dataArray[i].startsWith("up")){
          depth -= Number(dataArray[i].substring(3)) 
        }
        total = depth*horizontal
        console.log("horizontal: " + horizontal + " - depth " + depth + " -> " + total)
        resultArray.push("horizontal: " + horizontal + " - depth " + depth + " -> " + total + "\n")
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

module.exports.day2Exo1Router = day2Exo1Router;