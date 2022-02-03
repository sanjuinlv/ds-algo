/* 
Write a function to determine the number of bits you would need to flip to 
convert integer A to B .
Example: 
Input 29 (11101), 15 (01111)
Output: 2
*/
/* 
Approach: Using XOR
XOR of a and b which produce num with ones where the bits are different.
We can then count the number of ones which are required to flip A bits to get B.
*/
function bitSwapToCovertInteger(a, b) {
  let count = 0;
  for (let c = a ^ b; c != 0; c = c >> 1) {
    count += c & 1;
  }
  return count;
}

/*
Rather than shifting c repeatedly while checking the least significant bit,
we can continuously flip the least significant bit and count how long it takes
c to become 0. The operation c = c & (c - 1) will clear the least significant bit in c.
 */
function bitSwapToCovertInteger(a, b) {
  let count = 0;
  for (let c = a ^ b; c != 0; c = c & (c - 1)) {
    count++;
  }
  return count;
}
