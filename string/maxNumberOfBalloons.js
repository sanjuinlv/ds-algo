/* 
1189. Maximum Number of Balloons
https://leetcode.com/problems/maximum-number-of-balloons
Type: Easy

Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

You can use each character in text at most once. Return the maximum number of instances that can be formed.

Example 1:
Input: text = "nlaebolko"
Output: 1

Example 2:
Input: text = "loonbalxballpoon"
Output: 2

Example 3:
Input: text = "leetcode"
Output: 0
 
Constraints:
 - 1 <= text.length <= 104
 - text consists of lower case English letters only.

*/
/**
 * @param {string} text
 * @return {number}
 */
/* 
Runtime: 12 ms Beats 13.85%
Memory: 52.56 MB Beats 15.72%
*/
var maxNumberOfBalloons = function (text) {
  const balloonStr = "balloon";
  //create char map ballon
  const balloonCharMap = new Map();
  for (const c of balloonStr) {
    balloonCharMap.set(c, (balloonCharMap.get(c) || 0) + 1);
  }
  const ballonCharCount = balloonCharMap.size;
  //   console.log(`matchMap`, balloonCharMap);
  //text character map
  const txtCharMap = new Map();
  for (let c of text) {
    //add only characters matching with baloon
    if (balloonCharMap.has(c)) txtCharMap.set(c, (txtCharMap.get(c) || 0) + 1);
  }
  //   console.log(`textMap`, txtCharMap);
  let baloonCount = 0;
  //until text character count is same as baloon check for match
  while (txtCharMap.size == ballonCharCount) {
    let charMatchCount = 0;
    //for each char in ballon reduce count
    for (const c of balloonCharMap.keys()) {
      if (txtCharMap.get(c) >= balloonCharMap.get(c)) {
        txtCharMap.set(c, txtCharMap.get(c) - balloonCharMap.get(c));
        //if char count is zero then remove from map, indicating we are done
        if (txtCharMap.get(c) <= 0) txtCharMap.delete(c);
        charMatchCount++;
      }
    }
    if (charMatchCount == ballonCharCount) baloonCount++;
  }
  return baloonCount;
};

/* 
Approach II: Using potential of a character
*/
var maxNumberOfBalloons = function (text) {
  const balloonStr = "balloon";
  //create char map ballon
  const balloonCharMap = new Map();
  for (const c of balloonStr) {
    balloonCharMap.set(c, (balloonCharMap.get(c) || 0) + 1);
  }
  const ballonCharCount = balloonCharMap.size;
  //   console.log(`matchMap`, balloonCharMap);
  //text character map
  const txtCharMap = new Map();
  for (let c of text) {
    //add only characters matching with baloon
    if (balloonCharMap.has(c)) txtCharMap.set(c, (txtCharMap.get(c) || 0) + 1);
  }
  //not all characters are present, return 0
  if (txtCharMap.size < balloonCharMap.size) return 0;
  //   console.log(`textMap`, txtCharMap);
  let balloonCount = Number.MAX_VALUE;
  //until text character count is same as baloon check for match
  for (const c of balloonStr) {
    if (txtCharMap.get(c) > 0) {
      balloonCount = Math.min(
        balloonCount,
        parseInt(txtCharMap.get(c) / balloonCharMap.get(c))
      );
    }
  }
  return balloonCount == Number.MAX_VALUE ? 0 : balloonCount;
};
