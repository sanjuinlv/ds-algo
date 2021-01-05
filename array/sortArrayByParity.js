/**
 * @param {number[]} A
 * @return {number[]}
 */
// A = [3,1,2,4] => PASSED
// A = [3,2,1,4] => PASSED
// A = [3,1,3,1] => PASSED
// A = [2,4,2,4] => PASSED
// A = [2,4,3,1,5,6] => PASSED
// A = [3,1,0,0] => Passed
var sortArrayByParity = function(A) {
    let slowPointer = 0;
    for (let fastPointer = 1; fastPointer < A.length; fastPointer++) {
        console.log(`j: ${slowPointer}, i: ${fastPointer}`);
        //If left side element is odd and right side is even then swap them
        // and move both pointer
        if (A[slowPointer] % 2 !== 0 && A[fastPointer] % 2 === 0) {
            //swap element 
            console.log(`swapping the element`)
            let temp = A[fastPointer];
            A[fastPointer] = A[slowPointer];
            A[slowPointer++] = temp;
        } else if (A[slowPointer] % 2 == 0) {
            // If left side element is even then move the pointer
            slowPointer++;
        }
    }
    console.log(`final array: ${A}`);
    return A;
};
//Using odd and even property
// odd + even => odd
var sortArrayByParity = function(A) {
    let slowPointer = 0;
    for (let fastPointer = 1; fastPointer < A.length; fastPointer++) {
        console.log(`j: ${slowPointer}, i: ${fastPointer}`);
        // Left side element is even, move the slow pointer
        if (A[slowPointer] % 2 == 0) {
            slowPointer++;
        } else if ((A[slowPointer] + A[fastPointer]) % 2 != 0) {
            //left is not even, and both element is not even
            console.log(`swapping the element`)
            let temp = A[fastPointer];
            A[fastPointer] = A[slowPointer];
            A[slowPointer++] = temp;
        }
    }
    console.log(`final array: ${A}`);
    return A;
}

// for submission
/* 
Your runtime beats 84.74 % of javascript submissions.
Your memory usage beats 77.01 % of javascript submissions.
Runtime: 92 ms
Memory Usage: 38.8 MB
*/
var sortArrayByParity = function(A) {
    let slowPointer = 0;
    for (let fastPointer = 1; fastPointer < A.length; fastPointer++) {
        // Left side element is even, move the slow pointer
        if (A[slowPointer] % 2 == 0) {
            slowPointer++;
        } else if ((A[slowPointer] + A[fastPointer]) % 2 != 0) {
            //left is not even, and both element is not even
            // swap the elements
            let temp = A[fastPointer];
            A[fastPointer] = A[slowPointer];
            A[slowPointer++] = temp;
        }
    }
    return A;
}