/* 
Fractional number to  binary String
Given a real number between 0 and 1 (e.g., 0.72) that is passed in as a double, 
print the binary representation. If number can't be represented accurately in 
binary with at most 32 characters, print "ERROR".
*/
/*
Solution: 
Analogy to decimal number, the binary number 0.101 (base 2) would look like:
0.101 = 1 * 1/2^1 + 0 * 1/2^2 + 1 * 1/2^3 = 1 * 2^-1 + 0 * 1/2^-2 + 1 * 1/2^-3

To print the decimal part, we can multiply by 2 and check if 2n is greater than or 
equal to 1. This is essentially shifting the fractional part sum, That is:
r = 2 * n
  = 2 * 0.101
  = 1 * 2^0 + 0 * 2^-1 + 1 * 2^-2
  = 1.01 (base 2)

if r >=1, then we know n has 1 right after decimal point. By doing this continuously,
we can check all digits.
 */
function printBinary(num) {
  if (num >= 1 || num <= 0) {
    return "Error";
  }
  let binary = ".";
  while (num > 0) {
    if (binary.length >= 32) {
      return "ERROR";
    }
    let r = num * 2;
    if (r >= 1) {
      binary += "1";
      num = r - 1;
    } else {
      binary += "0";
      num = r;
    }
  }
  console.log(`binary: ${binary}`);
  return binary;
}

001100110011001100110011001100110011001100110011001101;
00110011001100110011;
