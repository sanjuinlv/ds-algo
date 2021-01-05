/**
 * @param {number[]} A
 * @return {boolean}
 */
// A = [0,3,2,1] => True  => PASSED
// A = [2,1] => false     => PASSED
// A = [3,5,5] => false   => PASSED
// A = [0,2,3,4,5,2,1,0] => true => Passed
// A = [0,2,3,3,5,2,1,0] => false => PASSED
// This solution will fail when there is only ascend or descend. 
//A mountain should have ascend, peak & descend
var validMountainArray = function(A) {
    if (A.length < 3) return false;
    let i = 0, j = A.length - 1;
    while (i < A.length - 1) {
        // console.log(`i: ${i}`);
        console.log(`A[${i}]: ${A[i]}, A[${i + 1}]: ${A[i + 1]}`);
        if (A[i] < A[i + 1]) {
            i++;
        } else if (A[i] === A[i + 1]) {
            j = -1;
            break;
        } else {
            break;
        }
    }
    while (j >= i) {
        console.log(`j: ${j}`);
        if (A[j] < A[j - 1]) {
            j--;
        } else if (A[j] === A[j - 1]) {
            break;
        } else {
            break;
        }
    }
    console.log(`i: ${i}, j: ${j}`);
    return i == j;
};

// for submit
var validMountainArray = function(A) {
    if (A.length < 3) return false;
    let i = 0, j = A.length - 1;
    while (i < A.length - 1) {
        if (A[i] < A[i + 1]) {
            i++;
        } else if (A[i] === A[i + 1]) {
            j = -1;
            break;
        } else {
            break;
        }
    }
    while (j >= i) {
        if (A[j] < A[j - 1]) {
            j--;
        } else if (A[j] === A[j - 1]) {
            break;
        } else {
            break;
        }
    }
    return i == j;
};

// Fix to have both ascend, peak, descend
// A = [0,3,2,1] => True  => PASSED
// A = [2,1] => false     => PASSED
// A = [3,5,5] => false   => PASSED
// A = [0,2,3,4,5,2,1,0] => true => Passed
// A = [0,2,3,3,5,2,1,0] => false => PASSED
// A = [0,1,2,3,4,5,6,7,8,9] = false => PASSED
// A = [0,1,0] => true   => PASSED
var validMountainArray = function(A) {
    if (A.length < 3) return false;
    let N = A.length;
    let i = 0;
    //climb up
    while (i + 1 < N && A[i] < A[i + 1]) {
        i++;
    }
    // peak can't be first or last
    if (i == 0 || i == N - 1) {
        return false;
    }
    //climb down
    while (i + 1 < N && A[i] > A[i + 1]) {
        i++;
    }
    return i === N - 1;
}