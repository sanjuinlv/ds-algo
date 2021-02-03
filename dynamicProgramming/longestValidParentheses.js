/* 
Type : Medium
Given a string containing just the characters '(' and ')', find the length of the longest 
valid (well-formed) parentheses substring.

Example 1: 
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".

Example 2: 
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".

Example 3: 
Input: s = ""
Output: 0

COnstraint:
0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
*/
/**
 * @param {string} s
 * @return {number}
 */
/* 
This solution computes all valid parenthese combination, rather than checking continuous valid substring
*/
var longestValidParentheses = function (s) {
  let longestValidParentheses = "";
  let rmL = 0,
    rmR = 0;
  for (let char of s) {
    if (char == "(") {
      rmL++;
    } else {
      if (rmL > 0) rmL--;
      else rmR++;
    }
  }
  console.log(`rmL: ${rmL}, rmR: ${rmR}`);
  const backtrack = (pos, curr, rmL, rmR, open) => {
    //can we add max length known
    console.log(
      `pos: ${pos}, curr: ${curr}, rmL: ${rmL}, rmR: ${rmR}, open: ${open}`
    );
    if (rmL < 0 || rmR < 0 || open < 0) {
      return;
    }
    //reached end of the string
    if (pos == s.length) {
      if (rmL == 0 && rmR == 0 && open == 0) {
        console.log(`valid parentheses: ${curr}`);
        if (curr.length > longestValidParentheses.length) {
          longestValidParentheses = curr;
          console.log(`longestPalindrome: ${longestValidParentheses}`);
        }
      }
      return;
    }
    if (s[pos] == "(") {
      //use "("
      backtrack(pos + 1, curr + s[pos], rmL, rmR, open + 1);
      //don't use "("
      backtrack(pos + 1, curr, rmL - 1, rmR, open);
    } else {
      //use ")"
      backtrack(pos + 1, curr + s[pos], rmL, rmR, open - 1);
      //don't use ")"
      backtrack(pos + 1, curr, rmL, rmR - 1, open);
    }
  };
  backtrack(0, "", rmL, rmR, 0);
  return longestValidParentheses ? longestValidParentheses.length : 0;
};

// fails for "()(()"
var longestValidParentheses = function (s) {
  // backtrack(0, [], rmL, rmR, 0);
  let maxLength = -Number.MAX_VALUE;
  let stack = [];
  let count = 0;
  for (let char of s) {
    // char is "(".  add to stack and increase the counter
    if (char == "(") {
      stack.push("(");
      count++;
    } else {
      // char is ")"
      // check top of the stack
      if (stack.length == 0 || stack.pop() != "(") {
        stack = [];
        if (count > maxLength) {
          maxLength = count * 2;
          count = 0;
        }
      }
    }
    console.log(`char: ${char}, valid count: ${count}`);
  }
  console.log(`final count: ${count}, maxLength: ${maxLength}`);
  console.log(stack);
  //if stack contains
  if (stack.length != 0) {
    count = count - stack.length;
  }
  return Math.max(count * 2, maxLength);
};

/*
Approach I: Brute force
Time Complexity: O(N^3)
Space Complexity: O(N) (for stack)
*/
var longestValidParentheses = function (s) {
  const N = s.length;
  const isValid = (s) => {
    console.log(`s: ${s}`);
    const stack = [];
    for (let char of s) {
      if (char == "(") {
        // char is "("
        stack.push(char);
        // char is ")"
      } else if (stack.length != 0 && stack[stack.length - 1] == "(") {
        stack.pop();
      } else {
        return false;
      }
    }
    return stack.length == 0;
  };

  let maxLength = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 2; j <= N; j += 2) {
      if (isValid(s.slice(i, j))) {
        maxLength = Math.max(maxLength, j - i);
      }
    }
  }
  return maxLength;
};

/*
Approach I: Using Stack

For every ‘(’ encountered, we push its index onto the stack. For every ‘)’ encountered, 
we pop the topmost element and subtract the current element's index from the top element
of the stack, which gives the length of the currently encountered valid string of parentheses.
If while popping the element, the stack becomes empty, we push the current element's 
index onto the stack. In this way, we keep on calculating the lengths of the valid substrings, 
and return the length of the longest valid string at the end.

Time Complexity: O(N)
Space Complexity: O(N) (for stack)

Runtime: 120 ms, faster than 25.66% of JavaScript online submissions for Longest Valid Parentheses.
Memory Usage: 40.2 MB, less than 69.10% of JavaScript online submissions for Longest Valid Parentheses.
*/
var longestValidParentheses = function (s) {
  let maxLength = 0;
  const stack = [];
  stack.push(-1);
  for (let i = 0; i < s.length; i++) {
      if (s[i] == "("){
          stack.push(i);
      } else {
          //if char ')', then pop the stack
          stack.pop();
          //stack is empty, push ")"
          if (stack.length == 0){
              stack.push(i);
          } else {
              //stack is not empty, calculate the length of valid 
              // parenthese length from current index and index at top of stack
              maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
          }
      }
  }
  return maxLength;
};
