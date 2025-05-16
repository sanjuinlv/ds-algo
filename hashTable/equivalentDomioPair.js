/* 
1128. Number of Equivalent Domino Pairs
https://leetcode.com/problems/number-of-equivalent-domino-pairs
Type: Easy

Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.

Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

Example 1:
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1

Example 2:
Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
Output: 3
 
Constraints:
 - 1 <= dominoes.length <= 4 * 10^4
 - dominoes[i].length == 2
 - 1 <= dominoes[i][j] <= 9

*/
/* 
Approach II: Tuple Representation + Counting
Time: O(N)
Space: O(N)

Runtime: 8 ms Beats 78.35%
Memory: 65.94 MB Beats 51.84%
*/
var numEquivDominoPairs = function (dominoes) {
  const countMap = new Map();
  for (const dominoe of dominoes) {
    dominoe.sort((a, b) => a - b);
    const combinationSum = dominoe[0] + "-" + dominoe[1];
    countMap.set(combinationSum, (countMap.get(combinationSum) || 0) + 1);
  }
  let pairCount = 0;
  for (let value of countMap.values()) {
    if (value > 0) pairCount += Math.floor(value * (value - 1) * 0.5);
  }
  return pairCount;
};

/* 
Approach II: Tuple Representation + Counting
Time: O(N)
Space: O(1)

Runtime: 8 ms Beats 78.35%
Memory: 65.94 MB Beats 51.84%
*/
var numEquivDominoPairs = function (dominoes) {
  //since we have max num as 9 sum of digits 10*x + y can be max 100.
  const numCount = new Array(100).fill(0);
  let pairCount = 0;
  for (const [num1, num2] of dominoes) {
    //make num as 10*x + y where x is lower digit and y is higher digit, as it will be uniqie for a given combination
    const val = num1 > num2 ? num2 * 10 + num1 : num1 * 10 + num2;
    pairCount += numCount[val];
    //increment the count of pair found so far
    numCount[val]++;
  }
  return pairCount;
};

// console.log(
//   `num1: ${num1}, num2: ${num2}, val: ${val}, numCount: ${numCount[val]}`
// );
