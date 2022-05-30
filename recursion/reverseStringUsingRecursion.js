// print reverse of string using recursion
var reverseString = function (str) {
  function helper(index, str) {
    if (index >= str.length) return;
    helper(index + 1, str);
    console.log(str.charAt(index));
  }
  helper(0, str);
};

/**
 * Write a function that reverses a string. The input string is given as an array of characters char[].
 * Do not allocate extra space for another array, you must do this by modifying
 * the input array in-place with O(1) extra memory.
 * You may assume all the characters consist of printable ascii characters.
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
//Approach I
var reverseString = function (s) {
  function helper(index, str) {
    if (index >= str.length - 1 - index) return;
    let temp = str[index];
    str[index] = str[str.length - 1 - index];
    str[str.length - 1 - index] = temp;
    helper(index + 1, str);
  }
  helper(0, s);
};
/*
Approach: Recursive (Using left and right pointer)
Time complexity : O(N) time to perform N/2N/2 swaps.
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
Approach II: Iterative (Using only left and right pointer)
Time complexity : O(N) to swap N/2N/2 element.
Space complexity : O(1), it's a constant space solution.
Runtime: 108 ms, faster than 87.87% of JavaScript online submissions for Reverse String.
Memory Usage: 46.7 MB, less than 75.56% of JavaScript online submissions for Reverse String.
*/
var reverseString = function (s) {
  let left = 0,
    right = s.length - 1,
    temp;
  while (left < right) {
    temp = s[left];
    s[left++] = s[right];
    s[right--] = temp;
  }
};
