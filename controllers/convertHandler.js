function ConvertHandler() {
  const regex = /(\d+\.\d+|\d+\/\d+|\d+)([a-zA-Z]+)/;
  const returnUnits = {
    kg:["lbs","pounds"],
    lbs:["kg","kilograms"],

    km:["mi","miles"],
    mi:["km","kilometres"],
    
    gal:["L","litres"],
    l:["gal","gallons"]

  }
  this.getNum = function(input) {
    const stringMatch = input.match(regex);
    if (stringMatch){
      const numberString = stringMatch[1]; 
      if(numberString.includes("/")){
        const [numerator,denominator] = numberString.split("/").map(Number);
        return numerator/denominator;
      }
      return parseFloat(numberString)
    }
    else return null;
  };
  
  this.getUnit = function(input) {
    const stringMatch = input.match(regex);
    if(stringMatch){
      const unit = stringMatch[2].toLowerCase();
      if (!(unit in returnUnits)) return null;
      return {initUnit:unit,
              returnUnit:returnUnits[unit][0],
              returnUnitExpanded:returnUnits[unit][1]};
    }
    else return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit){
      case "km":
        return initNum*(1/miToKm);
      case "mi":
        return initNum*miToKm;
      
      case "lbs":
        return initNum*lbsToKg;
      case "kg":
        return initNum*(1/lbsToKg);
      
      case "l":
        return initNum*(1/galToL);
      case "gal":
        return initNum*galToL;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
