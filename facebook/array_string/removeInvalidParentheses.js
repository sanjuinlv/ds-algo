/* 
Remove the minimum number of invalid parentheses in order to make the input string
valid. Return all possible results.

Note: The input string may contain letters other than the parentheses ( and ).

Example 1:
Input: "()())()"
Output: ["()()()", "(())()"]

Example 2:
Input: "(a)())()"
Output: ["(a)()()", "(a())()"]

Example 3:
Input: ")("
Output: [""]
*/
/**
 * @param {string} s
 * @return {string[]}
 */
/* 
Brute Force
This produces the duplicate entry
Input: "()())()"
Ouput: ["(())()","()()()","()()()"]
Expected Output: ["(())()","()()()"]

Input: "(a)())()"
Output: ["(a())()","(a)()()","(a)()()"]
Expected Output: ["(a())()","(a)()()"]

Time: O(N^2)
Space: O(N)
 */
var removeInvalidParentheses = function(s) {
    if (!s.length) return [];
    const result = [];
    const computeValidString = (s, index) => {
        console.log(`index: ${index}`);
        let validString = "";
        const stack = [];
        for (let i = 0; i < s.length; i++){
            if (i == index) continue;
            validString += s[i];
            if (stack.length && s[i] == ")" && stack[stack.length-1] == "("){
                stack.pop();
            } else if (s[i] == "(" || s[i] == ")"){
                stack.push(s[i]);
            }
        }
        console.log(`stack: ${stack}, validString: ${validString}`);
        if (!stack.length) result.push(validString);
    }
    for (let i = 0; i < s.length; i++){
        computeValidString(s, i);
    }
    return result;  
};

/* 
Optimization by terminating the loop earlier.
*/
var removeInvalidParentheses = function(s) {
    if (!s.length) return [];
    const result = [];
    const computeValidString = (s, index) => {
        console.log(`index: ${index}`);
        let validString = "";
        const stack = [];
        for (let i = 0; i < s.length; i++){
            if (i == index) continue;
            console.log(`stack: ${stack}, validString: ${validString}`);            
            if (s[i] == ")"){
                if (stack.length == 0 || stack[stack.length-1] != "("){
                    validString = "";
                    break;
                } 
                stack.pop();
            } else if (s[i] == "("){
                stack.push(s[i]);
            }
            validString += s[i];
        }
        console.log(`stack: ${stack}, validString: ${validString}`);
        if (!stack.length && validString.length) result.push(validString);
    }
    for (let i = 0; i < s.length; i++){
        computeValidString(s, i);
    }
    return result;  
};

/*
Better solution? 
The one thing all these valid expressions have in common is that they will all be of 
the same length i.e. as compared to the original expression, all of these expressions
will have the same number of characters removed. Can we somehow find the number of 
misplaced parentheses and use it in our solution?

This solution works same as aboves, producing the duplicates
 */
var removeInvalidParentheses = function(s) {
    if (!s.length) return [];
    const result = [];
    //find the size of invalid parenthese count
    const findInvalidParentheseCount = (s) => {
        const stack = [];
        for (let i = 0; i < s.length; i++){
            if (s[i] == ")") {
                if (stack.length && stack[stack.length-1] == "("){
                    stack.pop();
                } else {
                    stack.push(s[i]);    
                }
            } else if (s[i] == "("){
                stack.push(s[i]);
            }
        }
        return stack.length ? stack.length : 0;
    }
    const invalidParentheseCount = findInvalidParentheseCount(s);
    const validStringSize = s.length - invalidParentheseCount;
    const backtrack = (s, validString, stack) => {
        console.log(`s: ${s}, validString: ${validString}, stack: ${stack}`);
        if (s.length + validString.length < validStringSize){
            console.log(`input and current string length is less than min lenght`);
            return;
        }
        //if ')' is on top of stack, it can't be a valid string
        if (stack.length && stack[stack.length -1] == ')'){
            console.log(`invalid parentheses at top of stack`)
            return;
        }
        //if we are done and valid string has reached the size and there is no item on stack
        if (validString.length == validStringSize && stack.length == 0){
            result.push(validString);
            return;
        }
        //if there is nothing to check
        if (s.length == 0) return;
        const first = s[0];
        const second = s[1];
        //stack update
        //we can choose brace '(' , ')' or we can ignore it 
        let firstStack = [...stack];
        if (first == ")" && firstStack.length && firstStack[firstStack.length - 1] == "("){
                firstStack.pop();
        } else if (first == ")" || first == "("){
            firstStack.push(first);
        }
        let secondStack = [...stack];
        if (second == ")" && secondStack.length && secondStack[secondStack.length - 1] == "("){
            secondStack.pop();
        } else if (second == ")" || second == "("){
            secondStack.push(second);
        }
        backtrack(s.slice(1, s.length), validString + first, firstStack);
        if (s.length > 1) {
            backtrack(s.slice(2, s.length), validString + second, secondStack);
        }
    }
    backtrack(s, "", []);
    return result;  
};


/* 
From Solution reference
*/

var removeInvalidParentheses = function(s) {
    if (!s.length) return [];
    //pre-process and find the invalid left and right braces to be removed
    //count of invalid left and right parentheses which needs to be removed
    let rmL = 0, rmR = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '('){
            rmL++;
        } else if (s[i] == ')') {
            if (rmL > 0){
                //')' found, reduce '(' count
                rmL--;
            } else {
                rmR++;
            }
        }
    }
    console.log(`rmL: ${rmL}, rmR: ${rmR}`);
    let resultSet = new Set();;    
    const dfs = (s, pos, str, rmL, rmR, open) => {
        console.log(`pos: ${pos}, str: ${str}, rmL: ${rmL}, rmR: ${rmR}, open: ${open}`);
        //if we have already removed invalid left and right parenthese then we can't proceed further
        if (rmL < 0 || rmR < 0 || open < 0){
            return;
        }
        //we reached end of string
        if (pos == s.length) {
            //if valid string (any string with count of left or right parenthese not 0 is invalid)
            if (rmL == 0 && rmR == 0 && open == 0){
                console.log(`valid string: ${str}`);
                resultSet.add(str);
            }
            return;
        }
        if (s[pos] == '('){
            //use '('
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open + 1);
            //do not use '('
            dfs(s, pos + 1, str, rmL - 1, rmR, open);
        } else if (s[pos] == ')'){
            //use ')'
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open - 1);
            //do not use ')'
            dfs(s, pos + 1, str, rmL, rmR - 1, open);
        } else { //other character
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open);
        }
    }

    dfs(s, 0, "", rmL, rmR, 0);
    console.log(`resultSet size: ${resultSet.size}`);
    return [...resultSet];
}

/* 

Runtime: 80 ms, faster than 97.80% of JavaScript online submissions for Remove Invalid Parentheses.
Memory Usage: 40.8 MB, less than 78.62% of JavaScript online submissions for Remove Invalid Parentheses.
*/
var removeInvalidParentheses = function(s) {
    if (!s.length) return [""];
    //pre-process and find the invalid left and right braces to be removed
    //count of invalid left and right parentheses which needs to be removed
    let rmL = 0, rmR = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '('){
            rmL++;
        } else if (s[i] == ')') {
            if (rmL > 0){
                //')' found, reduce '(' count
                rmL--;
            } else {
                rmR++;
            }
        }
    }
    let resultSet = new Set();;    
    const dfs = (s, pos, str, rmL, rmR, open) => {
        //if we have already removed invalid left and right parenthese then we can't proceed further
        if (rmL < 0 || rmR < 0 || open < 0){
            return;
        }
        //we reached end of string
        if (pos == s.length) {
            //if valid string (any string with count of left or right parenthese not 0 is invalid)
            if (rmL == 0 && rmR == 0 && open == 0){
                resultSet.add(str);
            }
            return;
        }
        if (s[pos] == '('){
            //use '('
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open + 1);
            //do not use '('
            dfs(s, pos + 1, str, rmL - 1, rmR, open);
        } else if (s[pos] == ')'){
            //use ')'
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open - 1);
            //do not use ')'
            dfs(s, pos + 1, str, rmL, rmR - 1, open);
        } else { //other character
            dfs(s, pos + 1, str + s[pos], rmL, rmR, open);
        }
    }

    dfs(s, 0, "", rmL, rmR, 0);
    return [...resultSet];
}