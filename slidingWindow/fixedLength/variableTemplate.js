//Template of Fixed variable size sliding window
const s = "test";
//lenght of input value
const N = s.length;
//window size
const k = 3;
//left and right pointer
let i = j = 0;
//loop until j crosses input length
while (j < N) {
  //1. perform the calculation for index 'j'
  //if condition is less than k then continue
  if (j - i + 1 < k) j++;
  else if (condition == k) {
    //calculation
    j++;
  } else if (condition > k) {
    while (condition > k) {
        //remove calculation for i
        i++;
    }
  }
}
//return the calculation

