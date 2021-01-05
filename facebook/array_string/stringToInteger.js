/* 
Implement atoi which converts a string to an integer.
The function first discards as many whitespace characters as necessary until the first non-whitespace
character is found. Then, starting from this character takes an optional initial plus or minus sign 
followed by as many numerical digits as possible, and interprets them as a numerical value.
The string can contain additional characters after those that form the integral number, which are
ignored and have no effect on the behavior of this function.
If the first sequence of non-whitespace characters in str is not a valid integral number, 
or if no such sequence exists because either str is empty or it contains only whitespace characters, 
no conversion is performed.
If no valid conversion could be performed, a zero value is returned.

Note: 
Only the space character ' ' is considered a whitespace character.
Assume we are dealing with an environment that could only store integers within the 32-bit signed 
integer range: [−2^31,  2^31 − 1]. 
If the numerical value is out of the range of representable values, INT_MAX (2^31 − 1) or 
INT_MIN (−2^31) is returned.

Input: str = "42"
Output: 42

Input: str = "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign. 
Then take as many numerical digits as possible, which gets 42.

Input: str = "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.

Input: str = "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical digit or a +/- sign. 
Therefore no valid conversion could be performed.

Input: str = "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer. 
Therefore INT_MIN (−2^31) is returned.
*/

/**
 * @param {string} s
 * @return {number}
 */
//1.first discards as many whitespace characters as necessary until the first non-whitespace character is found
// 2. starting from this character takes an optional initial plus or minus sign
// followed by as many numerical digits as possible, and interprets them as a numerical value
// the additional characters after those that form the integral number, which are
// ignored and have no effect on the behavior of this function.
// If the numerical value is out of the range of representable values, INT_MAX (2^31 − 1) or 
// INT_MIN (−2^31) is returned.
// str = "42" - PASS
// str = "   -42"  - PASS
// str = "4193 with words" - PASS
// str = "words and 987"  - PASS
// str = "-91283472332", output= -2147483648  
var myAtoi = function(s) {
    const N = s.length;
    const digits = [];
    for (let i = 0; i < N; i++) {
        const char = s.charAt(i);
        console.log(`char: ${char}`);
        // ignore the whitespaces until any digit is found
        if (!digits.length && char === ' ') continue;
        //add '-' or '-' if its first entry
        if (!digits.length && (char == "-" || char == "+")) {
            digits.push(char);
            continue;
        }
        if (!isNaN(char)) {
            digits.push(char);
            console.log(`digits: ${digits}`);
        } else {
            break;
        }
        console.log(`digits: ${digits}`);
    }
    console.log(`final digits: ${digits}`);
    const number = Number(digits.join(""));
    if (number > Number.MAX_VALUE) return Number.MAX_VALUE;
    if (number < Number.MIN_VALUE) return Number.MIN_VALUE;
    return number;
};

// From solutions
//Handling the overflow and underflow situations
/*
Case 1).result = INT_MAX / 10, it would result in integer overflow if next integer character 
is greater than 7. (7 in this case is last digit of INT_MAX (2147483647)). 
We can use INT_MAX % 10 to generically represent the last digit.
Case 2). If result > INT_MAX/10, we are sure that adding next number would result in integer overflow.
 */
// str = "42" - PASS
// str = "   -42"  - PASS
// str = "4193 with words" - PASS
// str = "words and 987"  - PASS
// str = "-91283472332", output= -2147483648  
//2147483647
//2147483646
//"21474836460"
//"2147483648"
var myAtoi = function(s) {
    //JS MAX_INT and MIN_INT are different so create const equivalent of 2^31-1 & -2^31
    const MAX_INT = Math.pow(2, 31) - 1;
    const MIN_INT = Math.pow(-2, 31);
    const N = s.length;
    let sign = 1;
    let result = 0;
    let i = 0;
    //Discard whitespaces in the beginning
    while (i < N && s.charAt(i) == ' ') {
        i++;
    }
    // Check if optional sign is exists
    if (i < N && (s.charAt(i) == "-" || s.charAt(i) == "+")) {
        sign = s.charAt(i) === "+" ? 1 : -1;
        i++;
    }
    console.log(`i: ${i}`);
    // Build the result and check for overflow/underflow condition
    while (i < N && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
        // const digit = Number(s.charAt(i));
        console.log(`result as input: ${result}`);
        console.log(`char at ${i}: ${s.charAt(i)}`);
        //handle overflow and underflow
        if (result > Math.floor(MAX_INT / 10) ||
            (result == Math.floor(MAX_INT / 10) && s.charAt(i) - '0' > MAX_INT % 10)) {
            console.log('overflow');
            return (sign == 1) ? MAX_INT : MIN_INT;
        }
        result = result * 10 + Number(s.charAt(i) - '0');
        // console.log(`updated result: ${result}`);
        i++;
    }
    return result * sign;
}


//for submission
/*
Runtime: 96 ms, faster than 80.65% of JavaScript online submissions for String to Integer (atoi).
Memory Usage: 40.5 MB, less than 5.04% of JavaScript online submissions for String to Integer (atoi).
*/
var myAtoi = function(s) {
    //JS MAX_INT and MIN_INT are different so create const equivalent of 2^31-1 & -2^31
    const MAX_INT = Math.pow(2, 31) - 1;
    const MIN_INT = Math.pow(-2, 31);
    const N = s.length;
    let sign = 1;
    let result = 0;
    let i = 0;
    // 1. handle empty string
    if (!s.length) return 0;
    // 2. remove space
    while (i < N && s.charAt(i) == ' ') {
        i++;
    }
    // Handle sign
    if (i < N && (s.charAt(i) == "-" || s.charAt(i) == "+")) {
        sign = s.charAt(i) === "+" ? 1 : -1;
        i++;
    }
    //convert number and avoid overflow
    while (i < N && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
        if (result > Math.floor(MAX_INT / 10) ||
            (result == Math.floor(MAX_INT / 10) && s.charAt(i) - '0' > MAX_INT % 10)) {
            return (sign == 1) ? MAX_INT : MIN_INT;
        }
        result = result * 10 + Number(s.charAt(i) - '0');
        i++;
    }
    return result * sign;
}

//2nd try
/* 
Runtime: 104 ms, faster than 54.84% of JavaScript online submissions for String to Integer (atoi).
Memory Usage: 41 MB, less than 45.32% of JavaScript online submissions for String to Integer (atoi).
*/
var myAtoi = function(s) {
    //JS MAX_INT and MIN_INT are different so create const equivalent of 2^31-1 & -2^31
    const MAX_INT = Math.pow(2, 31) - 1;
    const MIN_INT = Math.pow(-2, 31);
    const N = s.length;
    let sign = 1;
    let result = 0;
    let i = 0;
    // 1. handle empty string
    if (!s.length) return 0;
    // 2. remove space
    while (i < N && s[i] == ' ') {
        i++;
    }
    // Handle sign
    if (i < N && ( s[i] == "-" ||  s[i] == "+")) {
        sign =  s[i] === "+" ? 1 : -1;
        i++;
    }
    //convert number and avoid overflow
    while (i < N) {
        const digit = s.codePointAt(i) - '0'.codePointAt(0);
        if (digit < 0 || digit > 9) break;
        if (result > Math.floor(MAX_INT / 10) ||
            (result == Math.floor(MAX_INT / 10) &&  digit > MAX_INT % 10)) {
            return (sign == 1) ? MAX_INT : MIN_INT;
        }
        //+ used before digit to ensure that operation is treated is numeric 
        // addition instead of concatenation
        result = result * 10 +  digit;
        i++;
    }
    return result * sign;
}
