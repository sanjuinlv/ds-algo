/* 
https://leetcode.com/problems/open-the-lock/
Category: Medium

You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: 
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and
wrap around: for example we can turn '9' to be '0', or '0' to be '9'. 
Each move consists of turning one wheel one slot.
The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of
these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, 
return the minimum total number of turns required to open the lock, or -1 if it is impossible.

Example 2:

Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".

Example 2:

Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".

Example 3:

Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.

Constraints:

 - 1 <= deadends.length <= 500
 - deadends[i].length == 4
 - target.length == 4
 - target will not be in the list deadends.
 - target and deadends[i] consist of digits only.
*/

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
/* 
Approach: BFS
Runtime: 2771 ms, faster than 6.76% of JavaScript online submissions for Open the Lock.
Memory Usage: 126.6 MB, less than 5.15% of JavaScript online submissions for Open the Lock.
*/
var openLock = function (deadends, target) {
  const START = "0000";
  if (target === START) return 0;
  const adj = new Map();
  const dead = new Set(deadends);
  if (dead.has(START)) return -1;
  const digitMap = {
    0: ["1", "9"],
    1: ["0", "2"],
    2: ["1", "3"],
    3: ["2", "4"],
    4: ["3", "5"],
    5: ["4", "6"],
    6: ["5", "7"],
    7: ["6", "8"],
    8: ["7", "9"],
    9: ["8", "0"],
  };
  //make a graph with 10000 nodes ("0000" to "9999").
  let nodeStr = START;
  for (let i = 0; i < 10000; i++) {
    adj.set(nodeStr, []);
    for (let i = 0; i < 4; i++) {
      const chars = nodeStr.split("");
      const char = chars[i];
      const adjDigits = digitMap[char];
      for (const adjDigit of adjDigits) {
        chars[i] = adjDigit;
        adj.get(nodeStr).push(chars.join(""));
      }
    }
    //next number
    let num = parseInt(nodeStr);
    num += 1;
    //update variation for next number
    nodeStr = num.toString();
    //add padding, if required
    if (nodeStr.length < 4) {
      let paddingCount = 4 - nodeStr.length;
      while (paddingCount > 0) {
        nodeStr = "0" + nodeStr;
        paddingCount--;
      }
    }
  }
  //do BFS
  const queue = [];
  const seen = new Set();
  queue.push(START);
  seen.add(START);
  let step = 1;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      for (let neighbor of adj.get(node)) {
        if (neighbor === target) return step;
        if (dead.has(neighbor) || seen.has(neighbor)) continue;
        queue.push(neighbor);
        seen.add(neighbor);
      }
    }
    step = step + 1;
  }
  return -1;
};

/* 
Approach: Optimized BFS
Runtime: 455 ms, faster than 53.06% of JavaScript online submissions for Open the Lock.
Memory Usage: 61.8 MB, less than 70.42% of JavaScript online submissions for Open the Lock.
*/
var openLock = function (deadends, target) {
  const START = "0000";
  const queue = [];
  const dead = new Set(deadends);
  const seen = new Set();
  queue.push(START);
  //level separator
  queue.push(null);
  seen.add(START);
  let depth = 0;
  while (queue.length) {
    const node = queue.shift();
    if (node === target) return depth;
    if (node == null) {
      depth++;
      if (queue.length) queue.push(null);
    } else if (!dead.has(node)) {
      for (let i = 0; i < 4; i++) {
        //we can go +1 or -1 for current digit
        for (let d = -1; d <= 1; d += 2) {
          //-1 & 1
          const digit = node[i].codePointAt() - "0".codePointAt();
          //adding 10 and modulus of sum ensures we always have number between 0-9
          const nextDigit = (digit + d + 10) % 10;
          const neighbor =
            node.substring(0, i) + nextDigit + node.substring(i + 1);
          if (!seen.has(neighbor) && !dead.has(neighbor)) {
            queue.push(neighbor);
            seen.add(neighbor);
          }
        }
      }
    }
  }
  return -1;
};
