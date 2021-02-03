/* 
Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

constraint:
    -   1 <= nums.length <= 10
    -   -10 <= nums[i] <= 10
    -   All the numbers of nums are unique.

*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/*
Approach I: Brute Force
 */
var subsets = function(nums) {
    if (nums.length == 0) return [[]];
    const visited = new Map();
    nums.forEach(num => visited.set(num, false));
    const result = [];
    result.push([]);
    const dfs = (nums, pos, subsets) => {
        console.log(`pos: ${pos}, subsets: ${subsets}`);
        console.log(subsets);
        //reached end of the nums, push the subset to the result
        if (pos == nums.length){
            subsets.forEach(item => result.push(Array.from(item)));
            console.log(`reached at the end of array. Updated result`);
            console.log(result);
            return;
        }
        num = nums[pos];
        console.log(`next num: ${num}`);
        if (subsets.length) {
            for (let subset of subsets){
                subset.push(num);
            }
        }
        if (!visited.get(num)){ 
            subsets.push([num]);
            visited.set(num, true);
        }
        console.log(`updated subsets`);
        console.log(subsets);
        for (let i = pos; i < nums.length; i++){
            console.log(`i: ${i}`);
            dfs(nums, i + 1, Array.from(JSON.parse(JSON.stringify(subsets))));
        }
    }

    dfs(nums, 0, []);
    return result;
};

/* 
Runtime: 88 ms, faster than 36.46% of JavaScript online submissions for Subsets.
Memory Usage: 41.2 MB, less than 13.54% of JavaScript online submissions for Subsets.
*/
var subsets = function(nums) {
    if (nums.length == 0) return [[]];
    const visited = new Map();
    nums.forEach(num => visited.set(num, false));
    const result = [];
    result.push([]);
    const dfs = (nums, pos, subsets) => {
        //reached end of the nums, push the subset to the result
        if (pos == nums.length){
            subsets.forEach(item => result.push(Array.from(item)));
            return;
        }
        num = nums[pos];
        if (subsets.length) {
            for (let subset of subsets){
                subset.push(num);
            }
        }
        if (!visited.get(num)){ 
            subsets.push([num]);
            visited.set(num, true);
        }
        for (let i = pos; i < nums.length; i++){
            //deep copy the array, as apread operator or Array from create only shallow copy
            dfs(nums, i + 1, Array.from(JSON.parse(JSON.stringify(subsets))));
        }
    }

    dfs(nums, 0, []);
    return result;
};

//other solution reference
/* 
Runtime: 120 ms, faster than 7.57% of JavaScript online submissions for Subsets.
Memory Usage: 39.8 MB, less than 60.92% of JavaScript online submissions for Subsets.
*/
var subsets = function(nums) {
    let result = [];
    dfs([], 0);
    
    function dfs(current, index){
        result.push(current);
        for(let i = index; i < nums.length; i++) {
            //create new array joined with nums[i] 
            // concat creates new array copy
            dfs(current.concat(nums[i]), i + 1);
        }
    }
    
    return result;
};

/* 
Clean backtrack example

Time complexity: O(N X 2^N) to generate all subsets and then copy them into output list
Space complexity: O(N X 2^N) to keep all subsets of length N, since each of N elements could be present or absent

Runtime: 100 ms, faster than 14.67% of JavaScript online submissions for Subsets.
Memory Usage: 40 MB, less than 54.19% of JavaScript online submissions for Subsets.
*/
var subsets = function(nums) {
    let result = [];
    backtrack([], 0);
    function backtrack(current, index){
        result.push([...current]);
        for(let i = index; i < nums.length; i++) {
            // add nums[i] into the current combination            
            current.push(nums[i]);
            // use next integers to complete the combination            
            backtrack(current, i + 1);
            // backtrack
            current.pop();
        }
    }
    return result;
};

