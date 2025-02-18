function ConvertHandler() {
  const regex = /^(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)?([a-zA-Z]+)$/;

  const returnUnits = {
    kg: ["lbs", "pounds"],
    lbs: ["kg", "kilograms"],

    km: ["mi", "miles"],
    mi: ["km", "kilometres"],

    gal: ["L", "litres"],
    l: ["gal", "gallons"],
  };

  this.getNum = function (input) {
    const stringMatch = input.match(regex);
    if (stringMatch) {
      const numberString = stringMatch[1];
      if (!numberString) {
        return 1;
      }
      if (numberString.includes("/")) {
        const [numerator, denominator] = numberString.split("/").map(Number);
        return numerator / denominator;
      }
      return parseFloat(numberString);
    } else return null;
  };

  this.getUnit = function (input) {
    const stringMatch = input.match(regex);
    if (stringMatch) {
      const unit = stringMatch[2].toLowerCase();
      if (!(unit in returnUnits)) return null;

      // Handling the special case for 'L' (liter) which should be uppercase
      const initUnit = unit === "l" ? "L" : unit;

      return {
        initUnit: initUnit,
        returnUnit: returnUnits[unit][0],
        returnUnitExpanded: returnUnits[unit][1],
      };
    } else return null;
  };

  this.getReturnUnit = function (initUnit) {
    return returnUnits[initUnit.toLowerCase()] ? returnUnits[initUnit.toLowerCase()][0] : null;
  };

  this.spellOutUnit = function (unit) {
    return returnUnits[unit.toLowerCase()] ? returnUnits[unit.toLowerCase()][1] : null;
  };

  this.convert = function (initNum, initUnit) {
    initUnit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "km":
        return initNum * (1 / miToKm);
      case "mi":
        return initNum * miToKm;

      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum * (1 / lbsToKg);

      case "l":
        return initNum * (1 / galToL);
      case "gal":
        return initNum * galToL;

      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
