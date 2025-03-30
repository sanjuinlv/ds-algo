/*
Fractional Knapsack
https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
Type: Medium

Given two arrays, val[] and wt[], representing the values and weights of items, and an integer capacity representing the maximum weight a knapsack can hold, determine the maximum total value that can be achieved by putting items in the knapsack. You are allowed to break items into fractions if necessary.
Return the maximum value as a double, rounded to 6 decimal places.

Example 1:
Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
Output: 240.000000
Explanation: Take the item with value 60 and weight 10, value 100 and weight 20 and split the third item with value 120 and weight 30, to fit it into weight 20. so it becomes (120/30)*20=80, so the total value becomes 60+100+80.0=240.0 Thus, total maximum value of item we can have is 240.00 from the given capacity of sack. 

Example 2:
Input: val[] = [60, 100], wt[] = [10, 20], capacity = 50
Output: 160.000000
Explanation: Take both the items completely, without breaking. Total maximum value of item we can have is 160.00 from the given capacity of sack.

Example 3:
Input: val[] = [10, 20, 30], wt[] = [5, 10, 15], capacity = 100
Output: 60.000000
Explanation: In this case, the knapsack capacity exceeds the combined weight of all items (5 + 10 + 15 = 30). Therefore, we can take all items completely, yielding a total maximum value of 10 + 20 + 30 = 60.000000.

Constraints:
 - 1 <= val.size=wt.size <= 10^5
 - 1 <= capacity <= 10^9
 - 1 <= val[i], wt[i] <= 10^4
 */
/* 
Approach I: Sorting + greedy
Time: O(NLogN) - for sorting
Space: O(LogN) - for sorting

Time Taken: 0.63
*/
class Solution {
  fractionalknapsack(val, wt, capacity) {
    // code here
    //sort the value by value/weight
    const N = val.length;
    //create array of value and weight comobined
    const arr = new Array(N);
    for (let i = 0; i < N; i++) {
      arr.push([val[i], wt[i]]);
    }
    //sort the value/weight in descending order
    arr.sort((a, b) => b[0] / b[1] - a[0] / a[1]);
    let maxProfit = 0;
    let i = 0;
    while (i < N && capacity > 0) {
      //if we have can take complete weight
      if (capacity - arr[i][1] >= 0) {
        maxProfit += arr[i][0];
        capacity -= arr[i][1];
      } else {
        //take the partial value left
        let partialValue = arr[i][0] / arr[i][1];
        maxProfit += capacity * partialValue;
        capacity -= capacity;
      }
      i++;
    }
    return maxProfit;
  }
}
