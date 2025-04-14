/* 
Count Occurences of Anagrams
https://www.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1
Type - Medium

Given a word pat and a text txt. Return the count of the occurrences of anagrams of the word in the text.

Example 1:
    Input:
    txt = forxxorfxdofr
    pat = for
    Output: 3
    Explanation: for, orf and ofr appears
    in the txt, hence answer is 3.

Example 2:
    Input:
    txt = aabaabaa
    pat = aaba
    Output: 4
    Explanation: aaba is present 4 times
    in txt.

Your Task:
Complete the function search() which takes two strings pat, txt, as input parameters and returns an integer denoting the answer. 
You don't need to print answer or take inputs.

Expected Time Complexity: O(N)
Expected Auxiliary Space: O(26) or O(256)

Constraints:
 - 1 <= |pat| <= |txt| <= 10^5
 - Both strings contain lowercase English letters.
*/

/**
 * @param {string} pat
 * @param {string} txt
 * @return {number}
 */

//Brute force
class Solution {
  search(pat, txt) {
    let k = pat.length;
    let N = txt.length;
    let count = 0;
    for (let i = 0; i <= N - k; i++) {
      if (this.isAnagram(pat, txt.slice(i, k))) count++;
    }
    return count;
  }

  isAnagram(s, t) {
    if (s.length != t.length) return false;
    const sArr = Array.from(s).sort();
    const tArr = Array.from(t).sort();
    for (let i = 0; i < sArr.length; i++) {
      if (sArr[i] != tArr[i]) return false;
    }
    return true;
  }
}

/*
Approach : Sliding Window 
Time: O(N)
Space: O(1) - The space taken by map will be 26, i.e., english characters
Runtime - 0.15
*/
class Solution {
  search(pat, txt) {
    const N = txt.length;
    //create char count of pat
    const pCharMap = new Map();
    for (let c of pat) {
      pCharMap.set(c, (pCharMap.get(c) || 0) + 1);
    }
    let i = 0;
    let j = 0;
    let anagramCount = 0;
    let uniqueCount = pCharMap.size;
    const k = pat.length;
    while (j < N) {
      const char = txt[j];
      //curr char matches with pat
      if (pCharMap.has(char)) {
        //if char fount in 'pat' then reduce the char count, marking it as found
        pCharMap.set(char, pCharMap.get(char) - 1);
        //if unique count has reduced to 0, that means all occurance of same char found
        //so reduce the total char to be matched
        if (pCharMap.get(char) == 0) uniqueCount--;
      }
      //window size reached
      if (j - i + 1 == k) {
        //if count is zero then all char are found in this window
        if (uniqueCount == 0) anagramCount++;
        //left char to be removed from current window
        const outChar = txt[i];
        if (pCharMap.has(outChar)) {
          //out char count
          const outCharCount = pCharMap.get(outChar);
          //if count was 0 then increament unique count as we need one more unique char
          if (outCharCount == 0) uniqueCount++;
          //since it is removed from left we need one more count to match later
          pCharMap.set(outChar, outCharCount + 1);
        }
        i++;
      }
      j++;
    }
    return anagramCount;
  }
}
