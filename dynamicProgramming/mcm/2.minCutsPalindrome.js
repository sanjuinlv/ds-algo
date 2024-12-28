/*
132. Palindrome Partitioning II
https://leetcode.com/problems/palindrome-partitioning-ii/
Type: Hard
 */
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach I: Recurisve
*/
var minCut = function (s) {
  const N = s.length;
  const isPalindrome = (i, j, s) => {
    while (i < j) {
      if (s[i++] != s[j--]) return false;
    }
    return true;
  };
  const partition = (i, j, s) => {
    //base case
    if (i >= j) return 0;
    //if string is already palindrome then we don't need to do partition
    if (isPalindrome(i, j, s)) return 0;
    let minCuts = Infinity;
    //first part will be `i to k` and another part will be `k+1 to j`
    // hence k is taken until j-1
    for (let k = i; k <= j - 1; k++) {
      const currCuts = 1 + partition(i, k, s) + partition(k + 1, j, s);
      minCuts = Math.min(minCuts, currCuts);
    }
    return minCuts;
  };
  return partition(0, N - 1, s);
};

/* 
Approach II: Recurision with Memoization
Time: O(N^2*N)
In the recursive method findMinimumCut, we are calculating the results for any substring only once. We know that a string size N has N2 possible substrings. Thus, the worst-case time complexity of the recursive method findMinimumCut is O(N^2).

Additionally, within each recursive call, we are also checking if a substring is palindrome or not. The worst-case time complexity for method isPalindrome is O(N/2).

This gives us total time complexity as, O(N^2) * O(N/2)=O(N^2 * N)

Space: O(N2), as we are using two 2-dimensional arrays memoCuts and memoPalindrome of size N*N.
This gives us total space complexity as (N^2+N^2)=N2.
*/
var minCut = function (s) {
  const N = s.length;
  const memo = Array.from({ length: N }, () => Array(N));
  const memoPlanindrome = Array.from({ length: N }, () => Array(N));
  const isPalindrome = (i, j, s) => {
    if (memoPlanindrome[i][j] != null) return memoPlanindrome[i][j];
    while (i < j) {
      if (s[i++] != s[j--]) return false;
    }
    return true;
  };
  const partition = (i, j, s) => {
    //base case
    if (i >= j) return 0;
    if (memo[i][j] != null) return memo[i][j];
    //if string is already palindrome then we don't need to do partition
    if (isPalindrome(i, j, s)) return 0;
    let minCuts = Infinity;
    //first part will be `i to k` and another part will be `k+1 to j`
    // hence k is taken until j-1
    for (let k = i; k <= j - 1; k++) {
      //if substring from i to k is palindrome then only we can partition
      if (isPalindrome(i, k, s)) {
        const currCuts = 1 + partition(k + 1, j, s);
        minCuts = Math.min(minCuts, currCuts);
      }
    }
    return (memo[i][j] = minCuts);
  };
  return partition(0, N - 1, s);
};

/* 
Dynamic Programming - Top Down (Optimized Space)
In the previous solution when we update or access the memo, the to value 'j' always remain same.
we only track/update start value, i.e., 'i', to find the min cuts. 
So we can use 1D array to store this information.

Runtime: 214 ms Beats 50.79%
Memory: 91.73 MB Beats 50.72%
*/
var minCut = function (s) {
  const N = s.length;
  const memo = new Array(N);
  const memoPlanindrome = Array.from({ length: N }, () => Array(N));
  const isPalindrome = (i, j, s) => {
    if (i >= j) return true;
    if (memoPlanindrome[i][j] != null) return memoPlanindrome[i][j];
    memoPlanindrome[i][j] = s[i] == s[j] && isPalindrome(i + 1, j - 1, s);
    return memoPlanindrome[i][j];
  };
  const partition = (i, j, s) => {
    //base case
    if (i >= j) return 0;
    if (memo[i] != null) return memo[i];
    //if string is already palindrome then we don't need to do partition
    if (isPalindrome(i, j, s)) return 0;
    let minCuts = Infinity;
    //first part will be `i to k` and another part will be `k+1 to j`
    // hence k is taken until j-1
    for (let k = i; k <= j - 1; k++) {
      //if substring from i to k is palindrome then only we can partition
      if (isPalindrome(i, k, s)) {
        const currCuts = 1 + partition(k + 1, j, s);
        minCuts = Math.min(minCuts, currCuts);
      }
    }
    return (memo[i] = minCuts);
  };
  return partition(0, N - 1, s);
};
