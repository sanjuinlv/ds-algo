/* 
Largest number in K swaps
https://www.geeksforgeeks.org/problems/largest-number-in-k-swaps-1587115620/1
Type: Medium

Given a number K and string str of digits denoting a positive integer, build the largest number possible by performing swap operations on the digits of str at most K times.

Example 1:
Input: K = 4, str = "1234567"
Output: 7654321
Explanation:
Three swaps can make the input 1234567 to 7654321, swapping 1 with 7, 2 with 6 and finally 3 with 5

Example 2:
Input: K = 3, str = "3435335"
Output: 5543333
Explanation:
Three swaps can make the input 3435335 to 5543333, swapping 3 with 5, 4 with 5 and finally 3 with 4 

Your task:
You don't have to read input or print anything. Your task is to complete the function findMaximumNum() which takes the string and an integer as input and returns a string containing the largest number formed by perfoming the swap operation at most k times.

Expected Time Complexity: O(n!/(n-k)!) , where n = length of input string
Expected Auxiliary Space: O(n)

Constraints:
 - 1 ≤ |str| ≤ 30
 - 1 ≤ K ≤ 10
*/

/* 
Approach: Backtracking
Time: O(N^k) For every recursive call n recursive calls is generated until the value of k is 0. So total recursive calls are O((n)^k).
Space: O(N) The space required to store the answer, where n is the size of string.

*/
class Solution {
  // Function to find the largest number after k swaps.
  findMaximumNum(str, k) {
    const N = str.length;
    // Function to compare two strings and updating result
    // which stores the string with larger number.
    const match = () => {
      for (let i = 0; i < N; i++) {
        if (result[i] > chars[i]) {
          return;
        }
        // if chars[i] is greater, we update result as str or store
        // the larger value in result.
        if (result[i] < chars[i]) {
          for (let j = 0; j < N; j++) result[j] = chars[j];
          return;
        }
      }
    };
    const backtrack = (i, k) => {
      console.log(`i: ${i}, k: ${k}, chars`, chars);
      //Base condition
      if (i == N - 1 || k == 0) {
        match();
        return;
      }
      let maxDigit = 0;
      //find max digit
      for (let j = i; j < N; j++) {
        maxDigit = Math.max(
          maxDigit,
          chars[j].charCodeAt(0) - "0".charCodeAt()
        );
      }
      //if max digit isn't greater than current index 'i' then swapping isn't needed
      if (maxDigit == chars[i].charCodeAt(0) - "0".charCodeAt()) {
        backtrack(i + 1, k);
        return;
      }
      // swap max digit
      for (let j = i + 1; j < N; j++) {
        // if max digit is found at current index.
        if (chars[j].charCodeAt(0) - "0".charCodeAt(0) == maxDigit) {
          //swap with max digit at index i
          let temp = chars[i];
          chars[i] = chars[j];
          chars[j] = temp;
          //backtrack
          backtrack(i + 1, k - 1);
          //revert the swap
          temp = chars[i];
          chars[i] = chars[j];
          chars[j] = temp;
        }
      }
    };
    const chars = str.split("");
    const result = str.split("");
    backtrack(0, k);
    return result.join("");
  }
}
