/* 
1) s1 - s2 = diff
2) s1 + s2 = sum (array sum)
if we add both then we get
2*s1 = diff + sum
s1 = (diff + sum )/ 2
which means we need to find the subset sum equal to (diff+sum)/2 in the given array

E.g.. 
nums: [1,1,2,3]
diff: 1
=> s1=[1,2], s2=[1,3]
countMinSubsetDifference([1,1,2,3], 1)
*/
var countMinSubsetDifference = function (nums, diff) {
  const n = nums.length;
  //1. find array sum
  let arraySum = 0;
  nums.forEach((num) => (arraySum += num));
  const sum = Math.floor((diff + arraySum) / 2);
  const dp = [...Array(n + 1)].map((x) => Array(sum + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }
  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1];
    for (let j = 1; j <= sum; j++) {
      if (curr <= j) {
        dp[i][j] = dp[i - 1][j - curr] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][sum];
};
