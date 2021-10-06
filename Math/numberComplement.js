/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    //1. convert the number to binary
    //2. flip the bits
    //3. convert to decimal
    let digits = [];
    while(num > 0){
        const rem = num % 2;
        digits.push(rem);
        num = parseInt(num / 2);
    }
    console.log(`binary digits: ${digits}`);
    const complimentBits = [];
    while(digits.length) {
        complimentBits.push(digits.pop() == 0 ? 1 : 0 );
    }
    console.log(`complimentBits: ${complimentBits}`);
    let result = 0;
    let multiplier = 1;
    for (let i = complimentBits.length - 1 ; i > 0; i--){
        result = result + complimentBits[i] * multiplier;
        multiplier *= 2;
    }
    return result;
};

// From solution
/* 
Approach I: Flip Bit by Bit
 - Initiate 1-bit variable which will be used to flip bits one by one. 
 Set it to the smallest register bit = 1.
 - Initiate the marker variable which will be used to stop the loop over the bits todo = num.
 - Loop over the bits. While todo != 0:
    - Flip the current bit: num = num ^ bit.
    - Prepare for the next run. Shift flip variable to the left and todo variable to the right.

num: |0 0 0 0 0 1 0 1|  num ^ bit => |0 0 0 0 0 1 0 0|
bit: |0 0 0 0 0 0 0 1| 

num: |0 0 0 0 0 1 0 1|  num ^ bit => |0 0 0 0 0 1 1 0|
bit: |0 0 0 0 0 0 1 0| 

num: |0 0 0 0 0 1 0 1|  num ^ bit => |0 0 0 0 0 0 1 0|
bit: |0 0 0 0 0 1 0 0| 


Time Complexity: O(1), since we're doing not more than 32 iterations here.
Space Complexity: O(1).

Runtime: 76 ms, faster than 62.90% of JavaScript online submissions for Number Complement.
Memory Usage: 39 MB, less than 20.16% of JavaScript online submissions for Number Complement.
*/
var findComplement = function(num) {
    let bit = 1;
    let temp = num;
    while (temp != 0){
        num = num ^ bit;// XOR of num and bitMask
        //move bit of 'bitMask' one position left
        bit = bit << 1;
        // decrement the number by 1 bit position, shifting by right
        temp = temp >> 1; 
    }
    return num;
}

/*
Approach II: Compute Bit Length and Construct 1-bits Bitmask
i) Compute bit length of the input number l = [log_2 num] + 1
ii) Compute 1-bits bitmask of length l: bitmask = (1 << l) - 1
E.g., num = 5
Num: |0 0 0 0 0 1 0 1|, bit length = 3
1 << 3 --> 1 -bit followed by three zeros   |0 0 0 0 1 0 0 0|
(1 << 3) - 1 --> 1-bit bitmask of length 3  |0 0 0 0 0 1 1 1|
------------------------------------------------------------
num  -->          |0 0 0 0 0 1 0 1|
bitmask -->       |0 0 0 0 0 1 1 1|
num ^ bitmask --> |0 0 0 0 0 0 1 0|

Time Complexity: O(1).
Space Complexity: O(1).

Runtime: 72 ms, faster than 82.26% of JavaScript online submissions for Number Complement.
Memory Usage: 38.9 MB, less than 49.19% of JavaScript online submissions for Number Complement.
*/
var findComplement = function(num) {
    // n is a length of num in binary representation
    const n = parseInt(Math.log(num) / Math.log(2)) + 1;
    const bitMask = (1 << n) - 1;
    return num ^ bitMask;
}

/*
e.g., 100110, its complement is 011001, the sum is 111111. 
So we only need get the min number large or equal to num, then do substraction
*/
var findComplement = function(num) {
    let n = 0;
    while (n < num) {
        n = (n << 1) | 1;
    }
    return n - num;
}