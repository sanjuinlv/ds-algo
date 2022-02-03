/* 
pairwiseSwap(parseInt("1010", 2))
O/P: 5 (0101) : PASS

pairwiseSwap(parseInt("10000111", 2))
O/P: 75 (01001011) : PASS

pairwiseSwap(parseInt("01001110", 2))
O/P: 141 (10001101) : PASS
*/
function pairWiseSwap(n) {
  c = n;
  let bitI = 0;
  let bitJ = 0;
  let i = 0;
  while (c != 0) {
    console.log(`c: ${c}, i: ${i}`);
    bitI = (c & 1) == 1 ? 1 : 0;
    c = c >> 1;
    bitJ = (c & 1) == 1 ? 1 : 0;
    console.log(`bitI : ${bitI}, bitJ: ${bitJ}`);
    if (bitI != bitJ) {
      //clear bits at i & i+1
      n = n & ~(1 << i);
      n = n & ~(1 << (i + 1));
      //set bits at i & i+1
      n = n | (bitJ << i);
      n = n | (bitI << (i + 1));
    }
    c = c >> 1;
    i += 2;
  }
  return n;
}

/* 
Approach: Using even and odd bit shift
pairwiseSwap(parseInt("1010", 2))
O/P: 5 (0101) : PASS

pairwiseSwap(parseInt("10000111", 2))'
O/P: 75 (01001011) : PASS

pairwiseSwap(parseInt("01001110", 2))
O/P: 141 (10001101) : PASS
*/
function pairWiseSwap(n) {
  let c = n;
  let i = 0;
  let odd = n;
  let even = n;
  while (c != 0) {
    odd = odd & ~(1 << i);
    even = even & ~(1 << (i + 1));
    c = c >> 2;
    i += 2;
  }
  console.log(`odd: ${odd}, even: ${even}`);
  //move even right by one bit
  // Note: Logical right shift is used here instead of arithmetic shift
  // as we want sign bit to be filled with zeros.
  even = even >>> 1;
  //move odd left by one bit
  odd = odd << 1;
  n = odd | even;
  console.log(`n: n`);
  return n;
}

/* 
Solution reference.
We can mask all odd bits with 10101010 in binary (which is 0xAA), then shift 
them right by 1 to put them in the even spots. For the even bits, we can mask
with 01010101 (which is 0x55), then shift them left by 1 to put them in odd spots.

pairwiseSwap(parseInt("1010", 2))
O/P: 5 (0101) : PASS

pairwiseSwap(parseInt("10000111", 2))'
O/P: 75 (01001011) : PASS

pairwiseSwap(parseInt("01001110", 2))
O/P: 141 (10001101) : PASS
*/
function pairWiseSwap(n) {
  return ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
}
