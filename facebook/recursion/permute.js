/* 
Given an array nums of distinct integers, return all the possible permutations. 
You can return the answer in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:
Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:
Input: nums = [1]
Output: [[1]]

Constraints:
    -   1 <= nums.length <= 6
    -   -10 <= nums[i] <= 10
    -   All the integers of nums are unique.
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//doesn't perfectly
var permute = function(nums) {
    let result = [];
    //base case
    if (nums.length == 1) return [[nums[0]]];
    const backtrack = (perm, next) => {
        console.log(`perm; ${perm}, next: ${next}`);
        if (next.length == 0){
            result.push(perm);
            return;
        }
        const nextNum = nums[0];
        console.log(`nextNum: ${nextNum}`);
        let perms = [];
        //create new combination with current letter and previous permutation
        for (let combination of perm){
            console.log(`combination; ${combination}`);
            const tempPer  = [...combination, nextNum];
            console.log(`tempPer; ${tempPer}`);
            for (let i = 0; i < tempPer.length; i++){
                temp = [];
                temp[0] = tempPer[i];
                for (let j = 0; j < tempPer.length; j++){
                    if (i == j) continue;
                    temp.push(tempPer[j]);
                }
                perms.push(temp);
                console.log(`temp : ${temp}`);
            }
        }
        console.log(`perms: ${JSON.stringify(perms, null, 2)}`);
        next = next.shift();
        backtrack(perms, next);
    }
    backtrack("", nums);
    return result;
};

/* 
Runtime: 96 ms, faster than 70.08% of JavaScript online submissions for Permutations.
Memory Usage: 41.7 MB, less than 51.07% of JavaScript online submissions for Permutations.
*/
var permute = function(nums) {
    if (!nums) return null;
    let result = [];
    const insertAt = (index, char, arr) => {
        arr.splice(index, 0, char);
    }
    //base case
    if (nums.length == 0){
        result.push([]);
        return result;
    }
    if (nums.length == 1) return [[nums[0]]];
    const first = nums.shift();
    //compute permute recursively
    const permutations = permute(nums);
    for (let permutation of permutations){
        //for each permutation insert the 'first' at each indexes
        for(let i = 0; i <= permutation.length; i++){
            let copy = Array.from(permutation);
            insertAt(i, first, copy);
            result.push(copy);
        }
    }
    return result;
}

/* 
DFS + Backtracking

Runtime: 108 ms, faster than 20.21% of JavaScript online submissions for Permutations.
Memory Usage: 42.6 MB, less than 27.90% of JavaScript online submissions for Permutations.
*/
var permute = function(nums) {
    if (!nums) return null;
    const result = [];
    const visited = new Array(nums.length).fill(false);
    const dfs = (letters, path,) => {
        if (path.length == letters.length){
            //make deep copy of path else we will be updating the same array again & again
            result.push(Array.from(path));
            return;
        }
        for (let i = 0; i < letters.length; i++){
            //skip used letters
            if (visited[i]) continue;
            //add letter to permutation and mark it used
            path.push(letters[i]);
            visited[i] = true;
            dfs(letters, path);
            //remove letter from permutation and marked it un-used
            path.pop();
            visited[i] = false;
        }
    }
    dfs(nums,[])
    return result;
}