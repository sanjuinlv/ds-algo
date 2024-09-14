/* 
- LSD radix sorting algorithm is stable
- If we have millions of 32 bits integere we can sort using Radix sort which takes linear time

Usage:
let arr = ["4PGC938", "2IYE230", "3CIO720", "1ICK750", "1OHV845"];
LSDSort(arr);

let arr = ["102","473","251","814"];
LSDSort(arr);
*/
var LSDSort = function (a, W) {
  W = W || a[0].length;
  const N = a.length;
  const R = 256;
  const aux = [N];
  for (let d = W - 1; d >= 0; d--) {
    const counts = new Array(R + 1).fill(0);
    //1. Compute frequency count
    for (let i = 0; i < N; i++) {
      //using '+' before the char to treat it as numeric for addition
      counts[+a[i].charCodeAt(d) + 1]++;
    }
    console.log(counts);
    //2. Transform count to indices
    for (let r = 0; r < R; r++) {
      counts[r + 1] += counts[r];
    }
    console.log(counts);
    //3. distribute the records
    for (let i = 0; i < N; i++) {
      aux[counts[a[i].charCodeAt(d)]++] = a[i];
    }
    //4. Copy back to original array
    for (let i = 0; i < N; i++) {
      a[i] = aux[i];
    }
    console.log(`array after digit ${d} sorting`);
    console.log(a);
  }
  console.log(`sorted array`);
  console.log(a);
};
