/*
https://leetcode.com/problems/compare-version-numbers/
Given two version numbers, version1 and version2, compare them.
Version numbers consist of one or more revisions joined by a dot '.'. Each revision consists 
of digits and may contain leading zeros. Every revision contains at least one character. 
Revisions are 0-indexed from left to right, with the leftmost revision being revision 0, the next
 revision being revision 1, and so on. For example 2.5.33 and 0.1 are valid version numbers.

To compare version numbers, compare their revisions in left-to-right order. Revisions are compared
using their integer value ignoring any leading zeros. This means that revisions 1 and 001 are 
considered equal. If a version number does not specify a revision at an index, then treat the 
revision as 0. For example, version 1.0 is less than version 1.1 because their revision 0s are
the same, but their revision 1s are 0 and 1 respectively, and 0 < 1.

Return the following:

If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.

Example 1:

Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".
Example 2:

Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as "0".
Example 3:

Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1's revision 0 is "0", while version2's revision 0 is "1". 0 < 1, so version1 < version2.

Constraints:

1 <= version1.length, version2.length <= 500
version1 and version2 only contain digits and '.'.
version1 and version2 are valid version numbers.
All the given revisions in version1 and version2 can be stored in a 32-bit integer.

 */
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
/* 
Approach: Split, Two pass
Runtime: 95 ms, faster than 19.93% of JavaScript online submissions for Compare Version Numbers.
Memory Usage: 42.1 MB, less than 52.94% of JavaScript online submissions for Compare Version Numbers.
*/
var compareVersion = function (version1, version2) {
  const version1Arr = version1.split(".");
  const version2Arr = version2.split(".");
  const m = version1Arr.length;
  const n = version2Arr.length;
  let i = 0,
    j = 0;
  while (true) {
    let v1Int = 0;
    let v2Int = 0;
    if (i < m) {
      let v1Pointer = 0;
      //skip the leading zeros
      while (version1Arr[i][v1Pointer] === "0") v1Pointer++;
      //find the number
      while (v1Pointer < version1Arr[i].length) {
        const digit = version1Arr[i][v1Pointer] - "0";
        // console.log(`v1 digit: ${digit}, v1Pointer: ${v1Pointer}`);
        v1Int = v1Int * 10 + digit;
        v1Pointer++;
      }
    }
    // console.log(`v1Int: ${v1Int}`);
    // for version 2
    if (j < n) {
      let v2Pointer = 0;
      //skip the leading zeros
      while (version2Arr[j][v2Pointer] === "0") v2Pointer++;
      //find the number
      while (v2Pointer < version2Arr[j].length) {
        const digit = version2Arr[j][v2Pointer] - "0";
        // console.log(`v2 digit: ${digit}, v2Pointer: ${v2Pointer}`);
        v2Int = v2Int * 10 + digit;
        v2Pointer++;
      }
    }
    // console.log(`v2Int: ${v2Int}`);
    if (v1Int < v2Int) return -1;
    else if (v1Int > v2Int) return 1;
    else {
      if (i == m && j == n) return 0;
      if (i < m) i++;
      if (j < n) j++;
    }
  }
};

//cleaner code using parse (Solution reference)
/* 
Approach: Split + Parse, two pass
Time complexity : O(N+M+max(N,M)), where N and M are lengths of input strings.
Space complexity : O(N+M) to store arrays nums1 and nums2.

Runtime: 93 ms, faster than 22.55% of JavaScript online submissions for Compare Version Numbers.
Memory Usage: 41.5 MB, less than 94.44% of JavaScript online submissions for Compare Version Numbers.
*/
var compareVersion = function (version1, version2) {
  const nums1 = version1.split(".");
  const nums2 = version1.split(".");
  const m = nums1.length;
  const n = nums2.length;
  let int1, int2;
  for (let i = 0; i < Math.max(m, n); i++) {
    int1 = i < m ? parseInt(nums1[i]) : 0;
    int1 = i < n ? parseInt(nums2[i]) : 0;
    if (int1 != int2) {
      return int1 > int2 ? 1 : -1;
    }
  }
  //versions are equal
  return 0;
};
