/* 
You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed, the only constraint stopping 
you from robbing each of them is that adjacent houses have security system 
connected and it will automatically contact the police if two adjacent houses 
were broken into on the same night.
Given a list of non-negative integers representing the amount of money of each house, 
determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.

Example 1:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.

Constraint:             
    0 <= nums.length <= 100
    0 <= nums[i] <= 400             
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
   const N = nums.length;
   let i = 0;
   let robbedAmount = 0;
   while (i + 2 < N){
        console.log(`i: ${i}`);
        if (nums[i] + nums[i+2] > nums[i+1]) {
            robbedAmount += nums[i] + nums[i+2];
            i += 4; // i+2 is robbed so we need to skip the neibhgor i+3
        } else {
            robbedAmount += nums[i+1];
            i += 3; // i+1 is robbed so we need to skip the neibhgor i+2
        }
   }
   console.log(`i: ${i}`);
   //copy remaining
   while (i < N) {
     console.log(`i: ${i}`);
     //last two element left
     if (N-i > 1) {
        robbedAmount += Math.max(nums[i], nums[i+1]);
        i+=2;
     } else { //only one element left
        robbedAmount += nums[i++];
     }
   }
   console.log(`robbed amount: ${robbedAmount}`);
   return robbedAmount;
};

//for submission
// Fails for [1,1,1,2]
// Fails [1,7,9,4]
var rob = function(nums) {
    const N = nums.length;
    let i = 0;
    let robbedAmount = 0;
    while(i + 2 < N) {
        if (nums[i] + nums[i+2] > nums[i+1]){
            robbedAmount+= nums[i];
            i += 2; //ith house is robbed move to i+2
        } else {
            robbedAmount+= nums[i+1];
            i += 3; // (i+1)th house robbed, moved to (i+1) + 2 = i+3
        }
    }
    while (i < N) {
        console.log(`i: ${i}`);
        //last two element left
        if (N-i > 1) {
           robbedAmount += Math.max(nums[i], nums[i+1]);
           i+=2;
        } else { //only one element left
           robbedAmount += nums[i++];
        }
    }   
}

var rob = function(nums) {
    const N = nums.length;
    if (!N) return 0;
    if (N == 1) return nums[0];
    let dp = new Array(N);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < N; i++){
        dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1]);
    }
    return dp[N-1];
}


/* 
Runtime: 104 ms, faster than 49.43% of JavaScript online submissions for House Robber.
Memory Usage: 38.4 MB, less than 73.88% of JavaScript online submissions for House Robber.
*/
var rob = function(nums) {
    const N = nums.length;
    let prevMax = 0;
    let currMax = 0;
    for (let i = 0; i < N; i++){
        let temp = currMax;
        currMax = Math.max(prevMax + nums[i], currMax);
        prevMax = temp;
    }
    return currMax;
}

/* 
This particular problem and most of others can be approached using the following sequence:

Find recursive relation
Recursive (top-down)
Recursive + memo (top-down)
Iterative + memo (bottom-up)
Iterative + N variables (bottom-up)

Step 1. Figure out recursive relation.
A robber has 2 options: a) rob current house i; b) don't rob current house.
If an option "a" is selected it means she can't rob previous i-1 house but can safely proceed to the one before previous i-2 and gets all cumulative loot that follows.
If an option "b" is selected the robber gets all the possible loot from robbery of i-1 and all the following buildings.
So it boils down to calculating what is more profitable:

 - robbery of current house + loot from houses before the previous
 - loot from the previous house robbery and any loot captured before that

 rob(i) = Math.max( rob(i - 2) + currentHouseValue, rob(i - 1) )

Step 2. Recursive (top-down)
Converting the recurrent relation from Step 1 shound't be very hard.

*/

/* 
1. Recursive (top-down) 
This will time exceed for input
[114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240]

*/
var rob = function(nums) {
    const robHouse = (i) => {
        if (i < 0) return 0;
        return Math.max(robHouse(i-2) + nums[i], robHouse(i-1));
    }   
    return robHouse(nums.length -1);
}

/*
2. Recursive + memo (top-down)
Works fine with all input test cases, listed below
 */
var rob = function(nums) {
    const memo = new Array(nums.length).fill(-1);
    const robHouse = (i) => {
        if (i < 0) return 0;
        if (memo[i] >= 0) return memo[i];
        return Math.max(robHouse(i-2) + nums[i], robHouse(i-1));
    }   
    return robHouse(nums.length -1);
}

/* 
3. Iterative + memo (bottom-up)
Works fine with all input test cases, listed below
*/
var rob = function(nums) {
    const N = nums.length;
    if (N == 0) return 0;
    const dp = new Array(N + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for (let i = 1; i < N; i++){
        dp[i+1] = Math.max(dp[i-1] + nums[i], dp[i]);
    }
    return dp[N];
}
/* 
4. Iterative + 2 variables (bottom-up)
Already solved above
*/

/*
[]
[1]
[1,1]
[1,1,1]
[1,1,1,2]
[1,2,3,1]
[2,7,9,3,1]
[1,7,9,4]
[114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240]
*/