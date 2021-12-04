const express = require('express');
const day3Exo1Router = express.Router();
const fs = require('fs')
const path = require('path')

/*
 ** PUSH
 */


const filePath = path.resolve(__dirname, '..') + '/files/inputDay3.txt'
const exoName = "day3_exo1"

day3Exo1Router
  .get("/", (req, res) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.send("GET on " + exoName + " - ERROR")
        return
      }
      var dataArray = data.toString().split("\n")
      var commonBitString = ""
      var leastBitString = ""
      var valueZero = 0;
      var valueOne = 0;
      for (var i = 0; i < dataArray[0].length; i++){
        valueOne = 0;
        valueZero = 0;
        for (var t = 0; t < dataArray.length; t++){
          if (dataArray[t][i] == "0")
            valueZero++;
          else
            valueOne++; 
        }
        if (valueZero > valueOne){
          commonBitString += "0"
          leastBitString += "1"
        } else {
          commonBitString += "1"
          leastBitString += "0"
        }
      }

      console.log("Gamma -> " + commonBitString + " - Epyslon -> " + leastBitString)
      var gammaRate = parseInt(commonBitString, 2);
      var epsylonRate = parseInt(leastBitString, 2);
      var consumptionRate = gammaRate * epsylonRate
      console.log("Gamma x Espylon = consumption -> " + gammaRate + " x " + epsylonRate + " = " + consumptionRate)


      fs.writeFile((path.resolve(__dirname, '..') + '/files/result_' + exoName + '.txt'),  ("Gamma x Espylon = consumption -> " + gammaRate + " x " + epsylonRate + " = " + consumptionRate), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
      res.send("GET on " + exoName + " : result -> " + consumptionRate)
    })

  })

module.exports.day3Exo1Router = day3Exo1Router;