/*
Write a function that reverses a string. The input string is given as an array of characters s.
You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:

1 <= s.length <= 105
s[i] is a printable ascii character.
 */

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
/*
Approach I : Recursive
Time complexity : O(N) time to perform N/2 swaps.
Space complexity : O(N) to keep the recursion stack.
*/

var reverseString = function (s) {
  const N = s.length;
  function helper(index, str) {
    if (index >= N - 1 - index) return;
    let temp = str[index];
    str[index] = str[N - 1 - index];
    str[N - 1 - index] = temp;
    helper(index + 1, str);
  }
  helper(0, s);
};

/*
  Approach II: Recursive (Using left and right pointer)
  Time complexity : O(N) time to perform N/2 swaps.
  Space complexity : O(N) to keep the recursion stack.
  */
reverseString = function (s) {
  function helper(str, left, right) {
    if (left >= right) return;
    let temp = str[left];
    str[left++] = str[right];
    str[right--] = temp;
    helper(s, left, right);
  }
  helper(s, 0, s.length - 1);
};

/*
Approach III: Iterative
Time complexity : O(N) time to perform N/2 swaps.
Space complexity : O(1) to keep the recursion stack.
*/
var reverseString = function (s) {
  const N = s.length;
  for (let i = 0; i < parseInt(N / 2); i++) {
    let temp = s[i];
    s[i] = s[N - 1 - i];
    s[N - 1 - i] = temp;
  }
};

/*
  Approach IV: Iterative (Using left and right pointer)
  Time complexity : O(N) to swap N/2N/2 element.
  Space complexity : O(1), it's a constant space solution.
  Runtime: 108 ms, faster than 87.87% of JavaScript online submissions for Reverse String.
  Memory Usage: 46.7 MB, less than 75.56% of JavaScript online submissions for Reverse String.
  */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left++] = s[right];
    s[right--] = temp;
  }
};
