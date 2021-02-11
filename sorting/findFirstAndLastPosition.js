/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/* 
Approach: Linear Search
Time Complexity: O(N)
Space Complexity: O(1)
Runtime: 88 ms, faster than 24.13% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
Memory Usage: 39.9 MB, less than 38.73% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
*/
var searchRange = function(nums, target) {
  let start = -1, end = -1;
  for(let i = 0; i < nums.length; i++) {
      if (target == nums[i]){
        if (start >= 0){
            end = i;
          } else {
              start = i;
          }
      } 
  }
  if (start >= 0) {
      end = end >= 0? end: start;
  }
  return [start, end];
};

/* 
Approach: Binary Search
Time: O(N)
Space: O(1)

Runtime: 80 ms, faster than 69.95% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
Memory Usage: 40.3 MB, less than 8.04% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
*/

var searchRange = function(nums, target) {
let start = -1, end = -1;
const binarySearch = (left, right) => {
    while(left <= right){
        const mid = left + parseInt((right - left) / 2);
        if (target == nums[mid]){
            return mid;
        } else if (target < nums[mid]) {                
            right = mid -1; //look for target into left side
        } else {                
            left = mid + 1; //look for target into left side
        }
    }
    return -1;
}
let matchIndex =  binarySearch(0, nums.length -1);
//target found
if (matchIndex != -1){
    start = matchIndex;
    end = matchIndex;
    //look in left side for any other match
    let leftMatchIndex = matchIndex;
    while(leftMatchIndex != -1){
        leftMatchIndex = binarySearch(0, leftMatchIndex - 1);
        if (leftMatchIndex != -1) start = leftMatchIndex;
    }
    let rightMatchIndex = matchIndex;
    while(rightMatchIndex != -1){
        rightMatchIndex = binarySearch(rightMatchIndex + 1, nums.length -1);
        if (rightMatchIndex != -1) end = rightMatchIndex;
    }
}
return [start, end];
};  