/* 
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
*/
/* 
Approach : Linear scan
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00% 
Memory: 48.77 MB Beats 71.16%
*/
var lengthOfLastWord = function (s) {
  const N = s.length;
  //start from end until we find non white space character
  let j = N;
  while (j - 1 >= 0 && s[j - 1] == " ") j--;
  console.log(`j: ${j}`);
  //move towards left until we find whitespace or cross the string
  let i = j - 1;
  while (i >= 0 && s[i] != " ") i--;
  console.log(`i: ${i}, word: '${s.slice(i + 1, j)}'`);
  return j - i - 1;
};

/* 
Slight variation of above 
Runtime: 0 ms Beats 100.00% 
Memory: 49.28 MB Beats 14.07%
*/
var lengthOfLastWord = function (s) {
  const N = s.length;
  //trim the trailing spaces
  let j = N - 1;
  while (j >= 0 && s[j] == " ") j--;
  //compute the length of the last word
  let length = 0;
  while (j >= 0 && s[j] != " ") {
    j--;
    length++;
  }
  return length;
};
