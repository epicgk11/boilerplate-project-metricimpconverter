'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get("/api/convert",(req,res)=>{
    const initNum = convertHandler.getNum(req.query.input);
    const unitCheck = convertHandler.getUnit(req.query.input);
    if (!initNum || !unitCheck) return res.status(200).send("invalid string"); 
    const {initUnit,returnUnit,returnUnitExpanded} = unitCheck;
    const returnNum = convertHandler.convert(initNum,initUnit);
    res.send({
                initNum,
                initUnit,
                returnNum:parseFloat(returnNum.toFixed(4)),
                returnUnit,
                string:`${initNum} converts to ${returnNum.toFixed(5)} ${returnUnitExpanded}`
              })
  })

};
