/*
Given two integers dividend and divisor, divide two integers without using 
multiplication, division, and mod operator.
Return the quotient after dividing dividend by divisor.
The integer division should truncate toward zero, which means losing its fractional 
part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Note:
Assume we are dealing with an environment that could only store integers within the
32-bit signed integer range: [−2^31,  2^31 − 1]. For this problem, assume that your 
function returns 2^31 − 1 when the division result overflows.

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.

Input: dividend = 0, divisor = 1
Output: 0

Input: dividend = 1, divisor = 1
Output: 1

Constraints
 - -2^31 <= dividend, divisor <= 2^31 - 1
 - divisor != 0
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
/* 
Repeated Addition
Test data:
 1 2147483647
 -1 2147483647
 1 -2147483647
 -1 -2147483647
 
 1 -2147483648
 -1 -2147483648 

Runtime: 3648 ms, faster than 22.62% of JavaScript online submissions for Divide Two Integers.
Memory Usage: 40.2 MB, less than 61.90% of JavaScript online submissions for Divide Two Integers.
*/
var divide = function(dividend, divisor) {
    //handle 0
    if (dividend == 0) return dividend;
    //dividend and divisor are same
    if (dividend == divisor) return 1;
    const MAX_POSITIVE_VALUE = Math.pow(2, 31) - 1;
    //TBD: handle negative & overflow
    let sign = 1;
    if (dividend < 0) {
        sign = -sign;
        dividend = -dividend;
    }
    if (divisor < 0){
        sign = -sign;
        //this line is not safe for other compiler, e.g., in 'C' it will cause overflow.
        // so we need to address it (fixed in next solution)
        divisor = -divisor;
    }
    //we don't need to really perform addition operation to find the quotient if divisor is 1
    if (divisor == 1) {
        if (sign > 0) {
            if (dividend >= MAX_POSITIVE_VALUE) return MAX_POSITIVE_VALUE;
        } else {
            if (dividend >= MAX_POSITIVE_VALUE + 1) return -(MAX_POSITIVE_VALUE + 1);
            else return -dividend;
        }
    };

    let quotient = 0;
    let divisorMultiple = divisor;
    while(divisorMultiple <= dividend){
        if (quotient == MAX_POSITIVE_VALUE) return MAX_POSITIVE_VALUE;
        quotient++;
        divisorMultiple += divisor;
        // console.log(`divisorMultiple: ${divisorMultiple}`)
    }
    // console.log(`outside while loop`);
    return sign < 0 ? -quotient: quotient;
};

//Solution reference
/* 
Approach: Repeated Substraction
To handle the overflow in case of bigger negative getting converted to positive,e.g.
if dividend is -2147483648 and we convert it to positive, i.e., -dividend, which will be 
2147483648. And this will not fit for int size. Below solution works on approach of
converting the number to negative, instead of positive, to make it compatible with all compiler.

we're converting the inputs to negative numbers. This is because we don't want separate 
code for all the possible combinations of positive/negative divisor and dividend.
We converted them to negative instead of positive because the range of valid 
negative numbers is bigger, and therefore overflows can be cleanly avoided.
Time Complexity: O(N): Consider the worst case where the divisor is 1. 
For any dividend n, we'll need to subtract 1 a total of n times to get to 0. 
Therefore, the time complexity is O(n) in the worst case
Space Complexity; O(1). We only use a fixed number of integer variables, so the space complexity is O(1)
Seeing as n can be up to 2^31, this algorithm is too slow on the largest test cases. We'll need to do better.

Runtime: 92 ms, faster than 92.25% of JavaScript online submissions for Divide Two Integers.
Memory Usage: 40.1 MB, less than 61.96% of JavaScript online submissions for Divide Two Integers.
*/ 
var divide = function(dividend, divisor) {
    const MIN_VALUE = -2147483648;
    const MAX_VALUE = 2147483647;
    //special case: overflow
    if (dividend == MIN_VALUE && divisor == -1){
        return MAX_VALUE;
    }
    /* We need to convert both numbers to negatives
     * for the reasons explained above.
     * Also, we count the number of negatives signs. */    
    let negatives = 2;
    if (dividend > 0){
        negatives--;
        dividend = -dividend;
    }
    if (divisor > 0){
        negatives--;
        divisor = -divisor;
    }
    //difference is moving towards zero from the negative side
    /* Count how many times the divisor has to be added
     * to get the dividend. This is the quotient. */    
    let quotient = 0;
    while(dividend - divisor <= 0){
        // console.log(`quotient: ${quotient}, dividend: ${dividend}`)
        quotient--;
        dividend -= divisor;
        console.log(`quotient: ${quotient}, dividend: ${dividend}`)
    }   
    /* If there was originally one negative sign, then
     * the quotient remains negative. Otherwise, switch
     * it to positive. */    
    if (negatives != 1){
        quotient = -quotient;
    }
    return quotient;
}

/* 
Approach 2: Repeated Exponential Searches
Time Complexity : O(log^2n).
Space Complexity: O(1)
*/
var divide = function(dividend, divisor) {
    const MIN_VALUE = -2147483648;
    const MAX_VALUE = 2147483647;
    const HALF_INT_MIN = -1073741824;
    //special case: overflow
    if(dividend == MIN_VALUE && divisor == -1){
        return MAX_VALUE;
    }
    /* We need to convert both numbers to negatives
     * for the reasons explained above.
     * Also, we count the number of negatives signs. */    
    let negatives = 2;
    if (dividend > 0){
        negatives--;
        dividend = -dividend;
    }
    if (divisor > 0){
        negatives--;
        divisor = -divisor;
    }
    let quotient = 0;
    /* Once the divisor is bigger than the current dividend,
     * we can't fit any more copies of the divisor into it. */    
    while(divisor >= dividend){
        /* We know it'll fit at least once as divivend >= divisor.
         * Note: We use a negative powerOfTwo as it's possible we might have
         * the case divide(INT_MIN, -1). */        
        let powerOfTwo = -1;
        let value = divisor;
        /* Check if double the current value is too big. If not, continue doubling.
         * If it is too big, stop doubling and continue with the next step */        
        while(value >= HALF_INT_MIN && value + value >= dividend){
            value += value;
            powerOfTwo += powerOfTwo;
        }
        // We have been able to subtract divisor another powerOfTwo times.
        quotient += powerOfTwo;
        // Remove value so far so that we can continue the process with remainder.
        dividend -= value;
    }
    if (negatives != 1){
        quotient = -quotient;
    }
    return quotient;
}

//testing
var divide = function(dividend, divisor) {
    const MIN_VALUE = -2147483648;
    const MAX_VALUE = 2147483647;
    const HALF_INT_MIN = -1073741824;
    //special case: overflow
    if(dividend == MIN_VALUE && divisor == -1){
        return MAX_VALUE;
    }
    /* We need to convert both numbers to negatives
     * for the reasons explained above.
     * Also, we count the number of negatives signs. */    
    let negatives = 2;
    if (dividend > 0){
        negatives--;
        dividend = -dividend;
    }
    if (divisor > 0){
        negatives--;
        divisor = -divisor;
    }
    let quotient = 0;
    /* Once the divisor is bigger than the current dividend,
     * we can't fit any more copies of the divisor into it. */    
    while(divisor >= dividend){
        console.log(`quotient: ${quotient}, dividend: ${dividend}`);
        /* We know it'll fit at least once as divivend >= divisor.
         * Note: We use a negative powerOfTwo as it's possible we might have
         * the case divide(INT_MIN, -1). */        
        let powerOfTwo = -1;
        let value = divisor;
        /* Check if double the current value is too big. If not, continue doubling.
         * If it is too big, stop doubling and continue with the next step */        
        while(value >= HALF_INT_MIN && value + value >= dividend){
            value += value;
            powerOfTwo += powerOfTwo;
            console.log(`powerOfTwo: ${powerOfTwo}, value: ${value}`);
        }
        // We have been able to subtract divisor another powerOfTwo times.
        quotient += powerOfTwo;
        // Remove value so far so that we can continue the process with remainder.
        dividend -= value;
    }
    if (negatives != 1){
        quotient = -quotient;
    }
    return quotient;
}