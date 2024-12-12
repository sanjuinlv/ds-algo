//Template of MCM
let arr = [];
let i = 0;
let j = arr.length - 1;
function solve(i, j) {
  //base case
  if (i >= j) return 0;
  let min = Number.MAX_VALUE;
  for (let k = i; k <= j - 1; k++) {
    const temp = solve(i, k) + solve(k + 1, j) + arr[i] * arr[k] * arr[j];
    min = Math.min(min, temp);
  }
  return min;
}
return solve(i, j);
