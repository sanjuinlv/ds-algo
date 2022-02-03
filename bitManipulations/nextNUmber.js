/* 
Given a positive integer, print the next smallest and the next largest number 
that have same number of 1 bits.
*/
/* 
1) n & (~(1<<p-1))
2) n | (1 << (c1-1))

getNext(13948) => 13967
parseInt("11011010001111", 2) => 13967

*/

/* Returns the next largest number with same number of 1 bits*/
function getNext(n) {
  let c0 = 0;
  let c1 = 0;
  let c = n;
  //trailing zeros count
  while ((1 & c) == 0 && c != 0) {
    c0++;
    c = c >> 1;
  }
  console.log(`c0: ${c0}`);
  //ones count before next zero
  while ((1 & c) == 1 && c != 0) {
    c1++;
    c = c >> 1;
  }
  console.log(`c1: ${c1}`);
  //if n = 11..1100..00, then there is no bigger number with the same number
  // of 1's
  if (c0 + c1 == 31 || c0 + c1 == 0) {
    return -1;
  }
  const p = c0 + c1;
  //1. set bit at p
  n = n | (1 << p);
  //2. clear bits right to p
  n = n & ~((1 << p) - 1);
  //3. insert c1-1 ones to the right
  n = n | ((1 << (c1 - 1)) - 1);
  console.log(`n: $n`);
  return n;
}

/* 
n = 10115 (bin: 10011110000011)
getPrev(parseInt("10011110000011", 2))
Output: 10096 => 10011101110000 

n = 11 (1011)
getPrev(parseInt("1011", 2))
Output: 7 => 0110
*/
function getPrev(n) {
  let c0 = 0;
  let c1 = 0;
  let c = n;
  while ((1 & c) == 1) {
    c1++;
    c >>= 1;
  }
  if (c == 0) return -1;
  console.log(`c1: ${c1}`);
  while ((1 & c) == 0 && c != 0) {
    c0++;
    c >>= 1;
  }
  console.log(`c0: ${c0}`);
  const p = c0 + c1;
  //1. clear bits 0 through p
  n = n & (~0 << (p + 1));
  //2. create mask to set ones
  const mask = (1 << (c1 + 1)) - 1;
  //3. final smallest num
  n = n | (mask << (c0 - 1));
  console.log(`n: ${n}`);
  return n;
}
