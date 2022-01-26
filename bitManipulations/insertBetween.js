/* 
Given two 32-bit numbers, N and M, and two bit positions, i & j.
Write a method to insert M into N such that M starts at bit j and 
ends at bit i. We can assume that bits j through i have enough space
to fit all of M. That is, if M=10011, we can assume that there are at
least 5 bits between j and i. We would not, e.g., have j=3 and i=2, 
because M could not fully fit 3 and bit 2.

Example:
Input N = 10000000000, M = 10011, i = 2, j = 6
Output: N = 10001001100

  //1. clear j through i bits in n
  //2. shift m by i
  //3. merge n and m (n | m)

  1. We need to create a bit mask in following format to clear bit j through i in N
    11110000011
    step 1: 1 << j - i + 1  ( 1 << 5)=> 00000100000
    step 2: subtract with -1:  
      00000100000  
                    => 00000011111
    - 00000000001
    step 3: shift it by i bits, i.e.,
    00000011111 << i => 00001111100
    step 4: ~ 00001111100 => 11110000011
    
*/
function updateBits(n, m, i, j) {
  //1. bit mask
  let bit = 1;
  //shift bits
  bit = bit << (j - i + 1); //step1
  bit = bit - 1; // step2
  bit = bit << i; //step3
  bit = ~bit; // step4
  console.log(`final bit mask: ${bit}`);
  n = n & bit;
  console.log(`n after clear j through i bits: ${n}`);
  //2.
  m = m << i;
  console.log(`m after i bits left shit: ${m}`);
  //3
  const result = n | m;
  console.log(`result: ${result}`);
  return result;
}

/* 
Test cases 1: Pass
updateBits(parseInt("10000000000", 2), parseInt("10011",2), 2, 6);
output = 1100 (integer) which is "10001001100" in binary

Test cases 2: Pass
updateBits(parseInt("1010", 2), parseInt("10",2), 1, 2);
output = 12 (integer) which is "1100" in binary

Test cases 3: Pass
updateBits(parseInt("11101", 2), parseInt("001",2), 1, 3);
output = 19 (integer) which is "10011" in binary
*/
