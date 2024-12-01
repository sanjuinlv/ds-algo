/* 
Partitions with Given Difference
https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1
Type: Medium

Given an array arr[], partition it into two subsets(possibly empty) such that each element must belong to only one subset. Let the sum of the elements of these two subsets be sum1 and sum2. Given a difference d, count the number of partitions in which sum1 is greater than or equal to sum2 and the difference between sum1 and sum2 is equal to d. 

Example 1:
  Input: arr[] =  [5, 2, 6, 4], d = 3
  Output: 1
  Explanation: There is only one possible partition of this array. Partition : {6, 4}, {5, 2}. The subset difference between subset sum is: (6 + 4) - (5 + 2) = 3.

Example 2:
  Input: arr[] = [1, 1, 1, 1], d = 0 
  Output: 6 
  Explanation: We can choose two 1's from indices {0,1}, {0,2}, {0,3}, {1,2}, {1,3}, {2,3} and put them in sum1 and remaning two 1's in sum2.
  Thus there are total 6 ways for partition the array arr. 

Example 3:
  Input: arr[] = [1, 2, 1, 0, 1, 3, 3], d = 11
  Output: 2

Constraint:
 - 1 <= arr.size() <= 50
 - 0 <= d  <= 50
 - 0 <= arr[i] <= 6
*/

/* 
s1 - s2 = diff
s1 + s2 = sum (array sum)
if we add both then we get
2 * s1 = diff + sum
s1 = (diff + sum )/ 2
which means we need to find the subset sum equal to (diff+sum)/2 in the given array
*/

/*
Approach: Recursion
 */
class Solution {
  /**
   * @param number d
   * @param number[] arr
   * @returns number
   */
  countPartitions(arr, d) {
    let totalSum = 0;
    const N = arr.length;
    arr.forEach((num) => (totalSum += num));
    //TODO: check for fraction part
    const targetSum = (d + totalSum) / 2;
    const dp = (i, currSum) => {
      //base conditions
      if (currSum == targetSum) {
        subSetCount++;
        return;
      }
      if (i == N) return;
      //include
      dp(i + 1, currSum + arr[i]);
      //exclude
      dp(i + 1, currSum);
    };
    let subSetCount = 0;
    dp(0, 0);
    return subSetCount;
  }
}

/*
Approach: Recursion + Memoization (Top Down)
Fails for 
0 1 2 2 2 3 0 3 0 1
12
 */
class Solution {
  /**
   * @param number d
   * @param number[] arr
   * @returns number
   */
  countPartitions(arr, d) {
    const N = arr.length;
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    //we can not divide array into two subset with non-integer sums
    if ((d + totalSum) % 2 !== 0) return 0;
    const targetSum = (d + totalSum) / 2;
    const memo = Array.from({ length: N + 1 }, () => Array(targetSum + 1));
    const dp = (i, currSum) => {
      //base conditions
      if (currSum == targetSum) return 1;
      if (i == N) return 0;
      if (memo[i][currSum] != null) return memo[i][currSum];
      //include
      const include = dp(i + 1, currSum + arr[i]);
      //exclude
      const exclude = dp(i + 1, currSum);
      return (memo[i][currSum] = include + exclude);
    };
    return dp(0, 0);
  }
}

/* 
III: Using Bottom Up DP
Time Taken: 0.1
*/
class Solution {
  /**
   * @param number d
   * @param number[] arr
   * @returns number
   */
  countPartitions(arr, d) {
    const N = arr.length;
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    //TODO: we can not divide array into two subset with non-integer sums
    if ((d + totalSum) % 2 !== 0) return 0;
    const targetSum = (d + totalSum) / 2;
    const dp = Array.from({ length: N + 1 }, () =>
      Array(targetSum + 1).fill(0)
    );
    //for target sum zero there is alway one solution which is empty subset
    for (let i = 0; i <= N; i++) dp[i][0] = 1;

    for (let i = 1; i <= N; i++) {
      //Note: j = 1 fails, not sure why
      for (let j = 0; j <= targetSum; j++) {
        if (arr[i - 1] <= j) {
          dp[i][j] = dp[i - 1][j - arr[i - 1]] + dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[N][targetSum];
  }
}
