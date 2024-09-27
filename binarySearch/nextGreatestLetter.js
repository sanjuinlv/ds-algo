/*
744. Find Smallest Letter Greater Than Target
https://leetcode.com/problems/find-smallest-letter-greater-than-target
Type: Easy

You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.
 

Example 1:
    Input: letters = ["c","f","j"], target = "a"
    Output: "c"
    Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

Example 2:
    Input: letters = ["c","f","j"], target = "c"
    Output: "f"
    Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

Example 3:
    Input: letters = ["x","x","y","y"], target = "z"
    Output: "x"
    Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].

Constraints:
 - 2 <= letters.length <= 104
 - letters[i] is a lowercase English letter.
 - letters is sorted in non-decreasing order.
 - letters contains at least two different characters.
 - target is a lowercase English letter.
 */

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
/* 
Approach: Binary Search
Time: O(LogN)
Space: O(1)

Runtime:66 ms Beats 14.79%
Memory: 50.56 MB Beats 91.77%
*/
var nextGreatestLetter = function (letters, target) {
    const N = letters.length;
    if (target >= letters[N - 1]) return letters[0];
    let left = 0;
    let right = N - 1;
    while (left < right) {
      const mid = left + parseInt((right - left) / 2);
      if (letters[mid] <= target) left = mid + 1;
      else right = mid;
    }
    return letters[right];
  };
  