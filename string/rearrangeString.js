/* 
Given a string s and an integer k, rearrange s such that the same characters are at least
distance k from each other. If it is not possible to rearrange the string, return an empty string "".

Example 1:

Input: s = "aabbcc", k = 3
Output: "abcabc"
Explanation: The same letters are at least a distance of 3 from each other.
Example 2:

Input: s = "aaabc", k = 3
Output: ""
Explanation: It is not possible to rearrange the string.
Example 3:

Input: s = "aaadbbcc", k = 2
Output: "abacabcd"
Explanation: The same letters are at least a distance of 2 from each other.
 
Constraints:

1 <= s.length <= 3 * 105
s consists of only lowercase English letters.
0 <= k <= s.length

*/
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
/* 
Using Heap(Priority Queue) and Map

Runtime: 191 ms, faster than 44.00% of JavaScript online submissions for Rearrange String k Distance Apart.
Memory Usage: 53.8 MB, less than 64.00% of JavaScript online submissions for Rearrange String k Distance Apart.
*/
var rearrangeString = function (s, k) {
  if (k == 0) return;
  //create character count map
  const charMap = new Map();
  for (let c of s) {
    charMap.set(c, (charMap.get(c) || 0) + 1);
  }
  //max priority queue (ideally this should have been PriorityQueue,but leet code env gives error with PriorityQueue)
  const pq = new MaxPriorityQueue({
    compare: (c1, c2) => {
      return charMap.get(c2) - charMap.get(c1);
    },
  });
  //add entries to the queue
  for (let key of charMap.keys()) {
    pq.enqueue(key);
  }

  let result = "";
  const Q = [];
  while (pq.size()) {
    const c = pq.dequeue();
    //add this character to the result
    result += c;
    //we need to process this character later
    Q.push(c);
    //reduce the char count
    charMap.set(c, charMap.get(c) - 1);
    //add the character back in the order it was removed to the heap
    if (Q.length >= k) {
      const ch = Q.shift();
      if (charMap.get(ch) > 0) {
        pq.enqueue(ch);
      }
    }
  }
  return result.length === s.length ? result : "";
};
