/* 
Given a collection of numbers, nums, that might contain duplicates, return all possible 
unique permutations in any order.

Example 1: 
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Contraints:
1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/* 
Runtime: 348 ms, faster than 53.16% of JavaScript online submissions for Permutations II.
Memory Usage: 42.8 MB, less than 63.01% of JavaScript online submissions for Permutations II.
*/
var permuteUnique = function(nums) {
    if (!nums) return null;
    const result = [];
    const visited = new Array(nums.length).fill(false);
    const dfs = (letters, path) => {
        if (path.length == letters.length){
            //make deep copy of path else we will be updating the same array again & again
            result.push(Array.from(path));
            return;
        }
        const unique = new Set();
        for (let i = 0; i < letters.length; i++){
            if (unique.has(letters[i])) continue;
            console.log(`letters[${i}]: ${letters[i]}`);
            //skip used letters
            if (visited[i]) continue;
            //add letter to permutation and mark it used
            path.push(letters[i]);
            unique.add(letters[i]);            
            console.log(`path: ${path}`);
            visited[i] = true;
            dfs(letters, path);
            //remove letter from permutation and marked it un-used
            path.pop();
            visited[i] = false;
        }
    }
    dfs(nums,[]);
    return result;  
};