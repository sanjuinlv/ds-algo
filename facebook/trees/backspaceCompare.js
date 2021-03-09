/* 
Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.
Note that after backspacing an empty text, the text will continue empty.

Eaxmple 1:
Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".

Eaxmple 2:
Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".

Eaxmple 3:
Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".

Eaxmple 4:
Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".

1 <= S.length <= 200
1 <= T.length <= 200
S and T only contain lowercase letters and '#' characters.

Can you solve it in O(N) time and O(1) space?
*/
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */

/* 
Using Stack
Time: O(N)
Space: O(N)

Runtime: 84 ms, faster than 51.72% of JavaScript online submissions for Backspace String Compare.
Memory Usage: 39.2 MB, less than 44.23% of JavaScript online submissions for Backspace String Compare.
*/
var backspaceCompare = function(S, T) {
    const N = S.length;
    const createStack = (str) => {
        stack = [];
        for(let char of str){
            if (char != '#') {
                stack.push(char);
            } else if (stack.length != 0){
                stack.pop();
            }
        }    
        return stack;
    }
    const stack1 = createStack(S);
    const stack2 = createStack(T);
    console.log(stack1);
    console.log(stack2);
    if (stack1.length != stack2.length) return false;
    if (stack1.length == 0 && stack2.length == 0) return true;    
    while(stack1.length != 0){
        if (stack1.pop() != stack2.pop()) return false;
    }
    return true;
};

/* 
Using Stack
Time: O(N)
Space: O(1)

Runtime: 84 ms, faster than 51.72% of JavaScript online submissions for Backspace String Compare.
Memory Usage: 39.2 MB, less than 44.23% of JavaScript online submissions for Backspace String Compare.
*/
var backspaceCompare = function(S, T) {
    const N = S.length;
    const createStack = (str) => {
        stack = [];
        for(let char of str){
            if (char != '#') {
                stack.push(char);
            } else if (stack.length != 0){
                stack.pop();
            }
        }    
        return stack;
    }
    const stack1 = createStack(S);
    const stack2 = createStack(T);
    console.log(stack1);
    console.log(stack2);
    if (stack1.length != stack2.length) return false;
    if (stack1.length == 0 && stack2.length == 0) return true;    
    while(stack1.length != 0){
        if (stack1.pop() != stack2.pop()) return false;
    }
    return true;
};