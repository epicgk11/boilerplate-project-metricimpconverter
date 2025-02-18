const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Testing valid whole number input", () => {
    assert.strictEqual(
      convertHandler.getNum("2kg"),
      2,
      "Correctly read valid whole number input"
    );
  });
  test("Testing valid decimal input", () => {
    assert.strictEqual(
      convertHandler.getNum("2.5lbs"),
      2.5,
      "Correctly read valid decimal input"
    );
  });
  test("Testing valid fractional input", () => {
    assert.strictEqual(
      convertHandler.getNum("1/5kg"),
      0.2,
      "Correctly read valid fractional input"
    );
  });
  test("Testing valid fractional input with decimal", () => {
    assert.strictEqual(
      convertHandler.getNum("0.2/0.5kg"),
      0.4,
      "Correctly read valid fractional input with decimal"
    );
  });
  test("Testing invalid double fraction input", () => {
    assert.isNull(
      convertHandler.getNum("2/2/7kg"),
    );
  });
  test("Testing no numeric input", () => {
    assert.strictEqual(
      convertHandler.getNum("lbs"),
      1,
      "correctly default to 1 when no numeric input is provided"
    );
  });

  test("Testing valid input unit", () => {
    assert.equal(
      convertHandler.getUnit("2gal")['initUnit'],
      "gal",
      "correctly read gal"
    );
    console.log(convertHandler.getUnit("2L")['initUnit']);
    assert.strictEqual(convertHandler.getUnit("2L")['initUnit'], "L", "correctly read L");
    assert.strictEqual(
      convertHandler.getUnit("2mi")['initUnit'],
      "mi",
      "correctly read mi"
    );
    assert.strictEqual(
      convertHandler.getUnit("2km")['initUnit'],
      "km",
      "correctly read km"
    );
    assert.strictEqual(
      convertHandler.getUnit("2lbs")['initUnit'],
      "lbs",
      "correctly read lbs"
    );
    assert.strictEqual(
      convertHandler.getUnit("2kg")['initUnit'],
      "kg",
      "correctly read kg"
    );
  });

  test("Testing invalid input unit", () => {
    assert.strictEqual(
      convertHandler.getUnit("2invalidUnit"),
      null,
      "Correctly return error message for invalid input unit"
    );
  });

  test("Testing return unit for valid input unit", () => {
    assert.strictEqual(
      convertHandler.getUnit("gal")['returnUnit'],
      "L",
      "Correctly return L as output unit for gal input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("L")['returnUnit'],
      "gal",
      "Correctly return gal as output unit for L input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("mi")['returnUnit'],
      "km",
      "Correctly return km as output unit for mi input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("km")['returnUnit'],
      "mi",
      "Correctly return mi as output unit for km input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("lbs")['returnUnit'],
      "kg",
      "Correctly return kg as output unit for lbs input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("kg")['returnUnit'],
      "lbs",
      "Correctly return lbs as output unit for kg input unit"
    );
  });

  test("Testing spelled-out string unit for valid input unit", () => {
    assert.strictEqual(
      convertHandler.getUnit("GAL")['returnUnitExpanded'],
      "litres",
      "Correctly return gal as output unit for GAL input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("l")['returnUnitExpanded'],
      "gallons",
      "Correctly return L as output unit for l input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("MI")['returnUnitExpanded'],
      "kilometres",
      "Correctly return mi as output unit for KM input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("KM")['returnUnitExpanded'],
      "miles",
      "Correctly return km as output unit for KM input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("LBS")['returnUnitExpanded'],
      "kilograms",
      "Correctly return lbs as output unit for LBS input unit"
    );
    assert.strictEqual(
      convertHandler.getUnit("KG")['returnUnitExpanded'],
      "pounds",
      "Correctly return kg as output unit for KG input unit"
    );
  });

  test("Converting gal to L", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "gal").toFixed(5)),
      7.57082,
      "Correctly convert 2gal to 7.57082L"
    );
  });
  test("Converting L to gal", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "L").toFixed(5)),
      0.52834,
      "Correctly convert 2L to 0.52834gal"
    );
  });
  test("Converting mi to km", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "mi").toFixed(5)),
      3.21868,
      "Correctly convert 2mi to 3.21868km"
    );
  });
  test("Converting km to mi", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "km").toFixed(5)),
      1.24275,
      "Correctly convert 2km to 1.24275mi"
    );
  });
  test("Converting lbs to kg", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "lbs").toFixed(5)),
      0.90718,
      "Correctly convert 2lbs to 0.90718kg"
    );
  });
  test("Converting kg to lbs", () => {
    assert.strictEqual(
      parseFloat(convertHandler.convert(2, "kg").toFixed(5)),
      4.40925,
      "Correctly convert 2kg to 4.40925lbs"
    );
  });

  // test("Correctly make conversions", () => {

  // });
});