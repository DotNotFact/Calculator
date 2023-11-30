const greekParts = {
  "": 0,
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XIX: 19,
  XX: 20,
  XXV: 25,
  XL: 40,
  L: 50,
  C: 100,
};

const greekNum = Object.keys(greekParts).join("|");
const greekRegex = new RegExp(
  `([${greekNum}]+)([\\+\\-\\*\\/])([${greekNum}]+)`
);
const arabicRegex = new RegExp(`([0-9]+)([\\+\\-\\*\\/])([0-9]+)`);

function calculator(string) {
  if (isNullOrWhiteSpace(string)) throw new Error();

  string = string.replace(/\s+/g, "");

  if (
    (!greekRegex.test(string) && !arabicRegex.test(string)) ||
    string.match(/[\+\-\*\/]/g).length > 1
  )
    throw new Error();

  const isGreek = greekRegex.test(string);
  const parts = string.match(isGreek ? greekRegex : arabicRegex);

  const num1 = greekConvert(parts[1]);
  const num2 = greekConvert(parts[3]);
  const sign = parts[2];

  if (num1 > 10 || num2 > 10 || num1 < 1 || num2 < 1) throw new Error();

  let result = arithmeticOperations(num1, num2, sign);
  result = isGreek
    ? greekConvertRevert(result <= 0 ? 0 : Math.trunc(result))
    : Math.trunc(result);

  return result.toString();
}

function arithmeticOperations(num1, num2, sign) {
  switch (sign) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function greekConvert(num) {
  return greekParts[num] || parseInt(num);
}

function isNullOrWhiteSpace(str) {
  return !str || /^\s*$/.test(str);
}

function greekConvertRevert(num) {
  return Object.keys(greekParts).find((key) => greekParts[key] === num);
}

module.exports = calculator;
