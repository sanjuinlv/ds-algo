//Template of Fixed variable size sliding window
const s = "test";
//lenght of input value
const N = s.length;
//window size
const k = 3;
//left window index
let i = 0;
//right window index
let j = 0;
//loop until j crosses input length
while (j < N) {
  //perform the calculation for index 'j'
  //until window size is reached move
  if (j - i + 1 < k) j++;
  else {
    //1.cpature requires state
    //2.remove the left item 'i' from current calculation
    //3.move left pointer
    i++;
    j++;
  }
}
//return the calculation
return result;
