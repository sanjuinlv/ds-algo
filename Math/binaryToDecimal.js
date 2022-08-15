//binary number 111
function binaryToDecimal(num) {
  let decValue = 0;
  //base multiplier for power 0, i.e, 2^0
  let base = 1;
  while (num) {
    const digit = num % 10;
    num = Math.floor(num / 10);
    decValue += digit * base;
    base = base * 2;
  }
  return decValue;
}
