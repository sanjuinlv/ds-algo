/* 
Given a string containing digits from 2-9 inclusive, return all possible letter 
combinations that the number could represent. Return the answer in any order.
A mapping of digit to letters (just like on the telephone buttons) is given below.
Note that 1 does not map to any letters.
2 => "abc"
3 => "def"
4 => "ghi"
5 => "jkl"
6 => "mno"
7 => "pqrs"
8 => "tuv"
9 => "wxyz"

Example 1: 
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2: 
Input: digits = ""
Output: []

Example 3: 
Input: digits = "2"
Output: ["a","b","c"]

Constraint:
    -   0 <= digits.length <= 4
    -   digits[i] is a digit in the range ['2', '9'].
*/
/**
 * @param {string} digits
 * @return {string[]}
 */
/*
Runtime: 76 ms, faster than 71.58% of JavaScript online submissions for Letter Combinations of a Phone Number.
Memory Usage: 38.5 MB, less than 54.60% of JavaScript online submissions for Letter Combinations of a Phone Number.
 */
var letterCombinations = function(digits) {
    const phone = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    }
    const findCombination = (digits) => {
        if (!digits.length) return [];
        const result = [];
        // base case
        if (digits.length == 1){            
            for(let i = 0; i < phone[digits].length; i++){
                result.push(phone[digits][i]);
            }
            return result;
        }
        //compute the computation for all digits except for last digits
        const prevCombinations = findCombination(digits.slice(0, digits.length-1));
        // compute the combination for last digits
        const lastLetterCombinations = findCombination(digits.slice(digits.length-1, digits.length));
        // console.log(`prevCombinations: ${prevCombinations}, lastLetterCombinations: ${lastLetterCombinations}`);        
        //combine the result
        for (let i = 0; i < prevCombinations.length; i++){
            for (let j = 0; j < lastLetterCombinations.length; j++){
                result.push(`${prevCombinations[i]}${lastLetterCombinations[j]}`);
            }
        }
        return result;
    }
    return findCombination(digits);
};

//Other solutions
/* 
Using Backtracking
Time Complexity: O(3^N X 4^M), where N is the number of digits in the input that 
maps to 3 letters (e..g, 2,3,4,5,6,8) and M is the number of digits in the input that
maps to 4 letters (e.g., 7,9) and N+M is total number digits in the input;

Space Complexity: O (3^N X 4 ^M) since one has to keep 3^N X 4^M solution
*/
var letterCombinations = function(digits) {
    const phone = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    const backtrack = (combination, nextDigits) => {
        //if we are done with all digits then add combination to the result and return
        if (nextDigits.length == 0){
            result.push(combination);
            return;
        }
        //if there are still digits to to check
        //iterate over all letters which map to next available digits
        const letters = phone.get(nextDigits[0]);//first digit
        for (let i = 0; i < letters.length; i++){
            //combine this letter with current combination and check for rest of letters
            backtrack(combination + letters[i], nextDigits.substring(1,nextDigits.length));
        }
    }
    const result = [];
    if (digits.length) {
        backtrack("", digits);
    }
    return result;
}
/*
Iterative (using queue)
Runtime: 76 ms, faster than 71.58% of JavaScript online submissions for Letter Combinations of a Phone Number.
Memory Usage: 38.5 MB, less than 71.53% of JavaScript online submissions for Letter Combinations of a Phone Number.
 */
var letterCombinations = function(digits) {
    const phone = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    //queue
    const result = [];
    if (digits.length == 0) return result;
    //base case
    result.push("");
    for (let i = 0; i < digits.length; i++){
        const letters = phone[digits[i]];
        //until queue front item lenth and this index is same create new combinations
        while(result[0].length == i ){
            //remove from queue
            const combination = result.shift();
            for(let char of letters){
                //push new combination from this letters and currrent combination
                result.push(combination + char);
            }
        }
    }
    return result;
}

/*
DFS + backtracking 
 */
var letterCombinations = function(digits) {
    const phone = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    const dfs = (nextDigits, path) => {
        //we are done with all digits, add the current combination to the result and return
        if (nextDigits.length == 0){
            result.push(path);
            return;
        }
        //if there are still digits to to check
        //iterate over all letters which map to next available digits
        const letters = phone[nextDigits[0]];
        for (let i = 0; i < letters.length; i++){
            //combine this letter with current combination and check for rest of letters
            dfs(nextDigits.slice(1, nextDigits.length), `${path}${letters[i]}`);
        }
    }
    const result = [];
    if (digits.length) {
        dfs(digits, "");
    }
    return result;
}