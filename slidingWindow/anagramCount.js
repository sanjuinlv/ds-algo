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
      if (this.isAnagram(pat, txt.slice(i, i + 3))) count++;
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
*/
class Solution {
  search(pat, txt) {
    let k = pat.length;
    let N = txt.length;
    const patCharCount = {};
    for (let c of pat) {
      patCharCount[c] = (patCharCount[c] || 0) + 1;
    }
    let count = 0;
    let i = 0;
    let j = 0;
    const charCount = new Map();
    while (j < N) {
      //calculation
      charCount[txt[j]] = (charCount[txt[j]] || 0) + 1;
      if (j - i + 1 < k) j++;
      else {
        //check if the string bewtween i and j is anagram of pat
        if (this.isAnagram(patCharCount, charCount)) count++;
        //reduce count of left item from current count
        charCount[txt[j]]--;
        i++;
        j++;
      }
    }
    return count;
  }

  isAnagram(countMap1, countMap2) {
    for (let key of Object.keys(countMap1)) {
      if (countMap1[key] !== countMap2[key]) return false;
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
    let k = pat.length;
    let N = txt.length;
    const patCharCount = new Map();
    for (let c of pat) {
      patCharCount.set(c, (patCharCount.get(c) || 0) + 1);
    }
    let count = patCharCount.size;
    let i = 0;
    let j = 0;
    let result = 0;
    while (j < N) {
      //calculation
      const char = txt[j];
      if (patCharCount.has(char)) {
        //if char fount in 'pat' then reduce the char count, marking it as found
        patCharCount.set(char, patCharCount.get(char) - 1);
        //if unique count has reduced to 0, that means all occurance of same char found
        //so reduce the total char to be matched
        if (patCharCount.get(char) == 0) count--;
      }
      if (j - i + 1 < k) j++;
      else {
        //if count is zero then all char are found in this window
        if (count == 0) result++;
        const charOut = txt[i];
        if (patCharCount.has(charOut)) {
          const a = patCharCount.get(charOut);
          // if this char was already matched and if we are removing from curr window
          // then we need to increase the unique chars count to be found
          if (a == 0) count++;
          patCharCount.set(charOut, a + 1);
        }
        i++;
        j++;
      }
    }
    return result;
  }
}
