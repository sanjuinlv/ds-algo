/* 
Suppose you have n integers labeled 1 through n. A permutation of those n integers
perm (1-indexed) is considered a beautiful arrangement if for every i 
(1 <= i <= n), either of the following is true:

 - perm[i] is divisible by i.
 - i is divisible by perm[i].
Given an integer n, return the number of the beautiful arrangements that you can construct.

Example 1:

Input: n = 2
Output: 2
Explanation: 
The first beautiful arrangement is [1,2]:
    - perm[1] = 1 is divisible by i = 1
    - perm[2] = 2 is divisible by i = 2
The second beautiful arrangement is [2,1]:
    - perm[1] = 2 is divisible by i = 1
    - i = 2 is divisible by perm[2] = 1

Example 2:

Input: n = 1
Output: 1

*/
/**
 * @param {number} n
 * @return {number}
 */
/* 
Using backtracking
Issue with this approach is it doesn't terminate early for an invalid 
combination and also it considers the combination with complete entries
*/
var countArrangement = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  let result = 0;
  const isPermDivByIndex = (per) => {
    const permDivByIndex = per.every((element, i) => element % (i + 1) == 0);
    console.log(`per: ${per}, isPermDivByIndex: ${permDivByIndex}`);
    return permDivByIndex;
  };
  const isIndexDivByPerm = (per) => {
    const indexDivByPerm = per.every((element, i) => element % (i + 1) == 0);
    console.log(`per: ${per}, isIndexDivByPerm: ${indexDivByPerm}`);
    return indexDivByPerm;
  };

  const checkArrangement = (curr, currIndex) => {
    console.log(`currIndex: ${currIndex}, curr: ${curr}`);
    if (curr.length > 1 && (isPermDivByIndex(curr) || isIndexDivByPerm(curr))) {
      result++;
    }
    for (let j = 1; j <= n; j++) {
      if (visited.has(j)) continue;
      visited.add(j);
      checkArrangement([...curr, j], j);
      visited.delete(j);
    }
  };

  const visited = new Set();
  for (let i = 1; i <= n; i++) {
    visited.add(i);
    checkArrangement([i], i);
    visited.delete(i);
  }
  return result;
};

/*
Approach: Backtracking
Time complexity : O(k). k refers to the number of valid permutations.
Space complexity : O(n). visited array of size n is used. The depth of 
recursion tree will also go upto n. Here, n refers to the given integer n.

Runtime: 254 ms, faster than 61.54% of JavaScript online submissions for Beautiful Arrangement.
Memory Usage: 42.7 MB, less than 43.96% of JavaScript online submissions for Beautiful Arrangement.
 */
var countArrangement = function (N) {
  if (N == 0) return 0;
  let count = 0;
  const visited = new Array(N + 1).fill(false);
  const checkArrangement = (pos) => {
    if (pos > N) {
      count++;
      return;
    }
    for (let i = 1; i <= N; i++) {
      if (visited[i]) continue;
      if (i % pos === 0 || pos % i == 0) {
        visited[i] = true;
        checkArrangement(pos + 1);
        visited[i] = false;
      }
    }
  };
  checkArrangement(1);
  return count;
};
