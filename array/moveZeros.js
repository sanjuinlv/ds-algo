/**
 * Given an array nums, write a function to move all 0's to the end of it 
 * while maintaining the relative order of the non-zero elements.
    Input: [0,1,0,3,12]
    Output: [1,3,12,0,0]
 * Note:
    - You must do this in-place without making a copy of the array.
    - Minimize the total number of operations.
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 
nums = [0,1,0,3,12]  => PASSED
nums = [1,1,0,3,12]  => PASSED
nums = [-1,1,-1,-1]  => PASSED
nums = [0,0,0,0]     => PASSED
*/
// Time complexity: O(N)
// Space: O(N)
var moveZeroes = function(nums) {
    let j = 0, N = nums.length;
    for (let i = 0; i < N; i++) {
        //if its non zero then copy to last insert point (j), 
        //if both are not same (case of no zeros found)
        if (nums[i] !== 0) {
            if (i !== j) {
                nums[j++] = nums[i];
            } else {
                j++;
            }
        }
    }
    console.log(`j: ${j}`);
    //copy zeros from j until end of the array.
    while (j < N) {
        nums[j++] = 0;
    }
    console.log(`final array: ${nums}`);
};

// for submission
/* 
Runtime: 80 ms
Memory Usage: 38.6 MB
Your runtime beats 82.25 % of javascript submissions.
Your memory usage beats 38.61 % of javascript submissions.
*/
var moveZeroes = function(nums) {
    let j = 0, N = nums.length, i = 0;
    while (i < N) {
        if (nums[i] !== 0) {
            if (i === j) {
                j++;
            } else {
                nums[j++] = nums[i];
            }
        }
        i++;
    }
    while (j < N) {
        nums[j++] = 0;
    }
};

// Using pointer with swap approach
/* 
The total number of operations of the previous approach is sub-optimal. 
For example, the array which has all (except last) leading zeroes: [0, 0, 0, ..., 0, 1].
How many write operations to the array? For the previous approach, it writes 0's n−1 times, 
which is not necessary. We could have instead written just once.
 How? ..... By only fixing the non-0 element,i.e., 1.
The optimal approach is again a subtle extension of above solution. 
A simple realization is if the current element is non-0, its' correct position 
can at best be it's current position or a position earlier. 
If it's the latter one, the current position will be eventually occupied by a non-0 ,
or a 0, which lies at a index greater than 'cur' index. 
We fill the current position by 0 right away,so that unlike the previous solution, 
we don't need to come back here in next iteration.
*/
var moveZeroes = function(nums) {
    let slowPointer = 0, N = nums.length;
    for (let currentPointer = 0; currentPointer < N; currentPointer++) {
        if (nums[currentPointer] != 0) {
            //swap elements
            let temp = nums[slowPointer];
            nums[slowPointer++] = nums[currentPointer];
            nums[currentPointer] = temp;
        }
    }
}

//2nd try
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*
nums = [0,1,0,3,12] - PASS
nums = [1,1,0,0,2,3] - PASS

Runtime: 84 ms
Memory Usage: 40.2 MB
Your runtime beats 80.37 % of javascript submissions.
Your memory usage beats 64.94 % of javascript submissions.
 */
var moveZeroes = function(nums) {
    let N = nums.length;
    let i = 0, j=0, zeroCount = 0;
    while(j < N && i < N) {
      if (nums[j] == 0){
          zeroCount += 1; 
          j++
      } else { //copy j value to i
         if (i != j) nums[i] = nums[j];
         i++; j++;
      }
    }
    //fill the zeros 
    if (zeroCount > 0){
        for(let i = N - zeroCount; i < N; i++){
            nums[i] = 0;
        }
    }
 };

/* 
without using zeroCount variable
Runtime: 80 ms
Memory Usage: 40.4 MB
Your runtime beats 92.10 % of javascript submissions.
Your memory usage beats 48.50 % of javascript submissions.
*/

var moveZeroes = function(nums) {
   let N = nums.length;
   //slow pointer
   let i = 0;
   //fast pointer
   let j = 0;
   while(j < N) {
    if (nums[j] != 0) {
        //copy item at index j to index i
        if (i != j) nums[i] = nums[j];
        i++; 
    }
    j++;
   }
   //fill the zeros 
   while (i < N) {
       nums[i++] = 0;
   }
};
