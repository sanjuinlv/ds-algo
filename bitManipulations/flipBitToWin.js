/* 
Given an integer and you can flip exactly one bit from a 0 to 1. Find the 
longest sequence of 1s you could create.
Example:
1775 (11011101111)
Output: 8
*/
function flipBitToWin(num) {
  let maxBits = Number.MIN_VALUE;
  let onesCount = 0;
  const noOfBitsInNumber = parseInt(Math.log(num) / Math.log(2)) + 1;
  let i = noOfBitsInNumber - 1;
  let lastZeroPosition = -1;
  while (i >= 0) {
    let k = (num >> i) & 1;
    if (k == 1) {
      onesCount++;
      i--;
    } else {
      if (lastZeroPosition > -1) {
        i = lastZeroPosition - 1;
        lastZeroPosition = -1;
        onesCount = 0;
      } else {
        onesCount++;
        lastZeroPosition = i;
        i--;
      }
    }
    maxBits = Math.max(onesCount, maxBits);
  }
  return maxBits;
}

/*
PASS: flipBitToWin(parseInt("10100000110", 2)) => 3
PASS: flipBitToWin(parseInt("11011101111", 2)) => 8
PASS: flipBitToWin(parseInt("10100001111", 2)) => 5
PASS: flipBitToWin(parseInt("10100101111", 2)) => 6
*/

/* 
Handling continuous sequence of zeros efficiently 
*/
function flipBitToWin(num) {
  let maxBits = Number.MIN_VALUE;
  let onesCount = 0;
  const noOfBitsInNumber = parseInt(Math.log(num) / Math.log(2)) + 1;
  let i = noOfBitsInNumber - 1;
  let lastZeroPosition = -1;
  while (i >= 0) {
    let k = (num >> i) & 1;
    console.log(`shifted bits: ${i}, k: ${k}`);
    if (k == 1) {
      onesCount++;
      i--;
    } else {
      let j = i - 1;
      while (((num >> j) & 1) == 0 && j >= 0) {
        j--;
      }
      console.log(`i: ${i}, j: ${j + 1}`);
      //sequence of zeros were found
      if (j + 1 != i) {
        i = j + 1;
        onesCount = 0;
        lastZeroPosition = -1;
      } else {
        if (lastZeroPosition > -1) {
          i = lastZeroPosition - 1;
          lastZeroPosition = -1;
          onesCount = 0;
        } else {
          onesCount++;
          lastZeroPosition = i;
          i--;
        }
      }
    }
    maxBits = Math.max(onesCount, maxBits);
    console.log(`onesCount: ${onesCount}, maxBits: ${maxBits}`);
  }
  return maxBits;
}

/* From Nishant
PASS: flipBitToWin(parseInt("10100000110", 2)) => 3
PASS: flipBitToWin(parseInt("11011101111", 2)) => 8
PASS: flipBitToWin(parseInt("10100001111", 2)) => 5
PASS: flipBitToWin(parseInt("10100101111", 2)) => 6

*/
function flipBitToWin(num) {
  let previousLength = 0;
  let currentLength = 0;
  let max = Number.MIN_VALUE;

  while (num > 0) {
    if ((num & 1) > 0) {
      // Last bit is 1
      currentLength++;
    } else {
      previousLength = num & (2 === 0) ? 0 : currentLength;
      curremtLength = 0;
    }
    max = Math.max(max, previousLength + currentLength + 1);
    num = num >> 1;
  }
  return max;
}

/*
flipBitToWin(parseInt("10100000110", 2)) => 3 (PASS)
flipBitToWin(parseInt("11011101111", 2)) => 8 (PASS)
flipBitToWin(parseInt("10100001111", 2)) => 5 (PASS)
flipBitToWin(parseInt("10100101111", 2)) => 6 (PASS)
 */
function flipBitToWin(num) {
  let onesCount = 0;
  let prevOnesCount = onesCount;
  let maxOnes = Number.MIN_VALUE;
  let c = num;
  while (c != 0) {
    if ((c & 1) > 0) {
      onesCount++;
      maxOnes = Math.max(maxOnes, prevOnesCount + onesCount);
    } else {
      prevOnesCount = onesCount + 1;
      onesCount = 0;
      maxOnes = Math.max(maxOnes, prevOnesCount);
    }
    c = c >> 1;
  }
  return maxOnes;
}
