/* 
Type: Easy

Given a 32-bit signed integer, reverse digits of an integer.

Note:
Assume we are dealing with an environment that could only store integers
within the 32-bit signed integer range: [−2^31,  2^31 − 1]. 
For the purpose of this problem, assume that your function returns 0 when 
the reversed integer overflows.

Example 1: 
Input: x = 123
Output: 321

Example 2: 
Input: x = -123
Output: -321

Example 3: 
Input: x = 120
Output: 21

Example 4: 
Input: x = 0
Output: 0
*/
/**
 * @param {number} x
 * @return {number}
 */
/* 
The below statement can cause to overflow
digits = x % 10;
x /= 10;
rev = rev * 10 + digits;
So we can handle it 
 - If temp = rev * 10 + pop causes overflow, then it must be that rev ≥ INTMAX / 10
 - if rev > INTMAX / 10, then temp = rev * 10 + pop is guaranteed to overflow.
 - if rev == INTMAX / 10, then temp = rev * 10 + pop will overflow if and only if digit > 7.

Time Complexity: O(log(x)). There are roughly log10(x) digits in x.
Space Complexity: O(1)
Runtime: 108 ms, faster than 21.73% of JavaScript online submissions for Reverse Integer.
Memory Usage: 40.5 MB, less than 27.75% of JavaScript online submissions for Reverse Integer.
*/
var reverse = function(x) {
    //integer max and min value as restricted for environment
    const MAX_VALUE = Math.pow(2, 31) - 1; //2147483647
    const MIN_VALUE = Math.pow(-2, 31); // -2147483648                                         
    let reversed = 0;
    while (x != 0) {
        let digit = x % 10;
        x = parseInt(x / 10);
        if (reversed > parseInt(MAX_VALUE / 10) 
            || (reversed == parseInt(MAX_VALUE / 10) && digit > 7)){
                return 0;
        } 
        if (reversed < parseInt(MIN_VALUE / 10) 
            || (reversed == parseInt(MIN_VALUE / 10) && digit < - 8) ){
                return 0;
        }
        reversed = reversed * 10 + digit;        
    }    
    return reversed;
};

//solution by others
/*
If overflow exists, the new result will not equal previous one.
No flags needed. No hard code like 0xf7777777 needed.
Sorry for my bad english.

public int reverse(int x)
{
    int result = 0;

    while (x != 0)
    {
        int tail = x % 10;
        int newResult = result * 10 + tail;
        if ((newResult - tail) / 10 != result)
        { return 0; }
        result = newResult;
        x = x / 10;
    }

    return result;
}
*/