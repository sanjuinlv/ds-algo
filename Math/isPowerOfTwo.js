/**
 * @param {number} n
 * @return {boolean}
 */
/* 
Approach I: Iterative
Time: O(LogN)
Space: O(1)

Runtime: 100 ms, faster than 45.50% of JavaScript online submissions for Power of Two.
Memory Usage: 40.2 MB, less than 22.92% of JavaScript online submissions for Power of Two.
*/
var isPowerOfTwo = function(n) {
    if (n <= 0) return false;
    //Keep dividing the number by 2 until remainder is zero
    while(n % 2 == 0){
        n = Math.floor(n / 2);
    }
    return n == 1;
};

/* 
Approach 2: 
Time: O(1)
Space: O(1)
 */
var isPowerOfTwo = function(n) {
    if (n <= 0) return false;
    const maxPowerOfTwoNumber = Math.pow(2, 31);
    return maxPowerOfTwoNumber % n == 0;
};

/* 
Runtime: 108 ms, faster than 14.09% of JavaScript online submissions for Power of Two.
Memory Usage: 40.2 MB, less than 22.92% of JavaScript online submissions for Power of Two.
*/
var isPowerOfTwo = function(n) {
    if (n <= 0) return false;
    return 2147483648 % n == 0;
};