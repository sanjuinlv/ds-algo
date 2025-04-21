/* 
875. Koko Eating Bananas
https://leetcode.com/problems/koko-eating-bananas
Type: Medium

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.
 
Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23

Constraints:
 - 1 <= piles.length <= 10^4
 - piles.length <= h <= 10^9
 - 1 <= piles[i] <= 10^9

*/
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
/* 
Approach I: Brute Force
Time: O(n*m), where n is size of piles and m is max value in piles
Space: O(1)
*/
var minEatingSpeed = function (piles, h) {
  let speed = 1;
  while (true) {
    //time to to eat with given speed
    let hourSpent = 0;
    for (let pile of piles) {
      hourSpent += Math.ceil(pile / speed);
    }
    //if all piles finished within h hours, then return the curr speed
    if (hourSpent <= h) return speed;
    //try with next speed
    else speed++;
  }
};

/* 
Approach II: Binary Search
Time: O(n * logm)
Space: O(1)

Runtime: 9 ms Beats 66.01%
Memory: 57.54 MB Beats 55.35% 
*/
var minEatingSpeed = function (piles, h) {
  let lo = 1;
  //max piles value
  let hi = Math.max(...piles);
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    let hoursSpent = getTimeToEat(mid, piles);
    //current speed 'mid' is workable speed, then try smaller speed towards left
    if (hoursSpent <= h) hi = mid;
    // try higher speed towards right
    else lo = mid + 1;
  }
  return lo;
};

function getTimeToEat(k, piles) {
  let totalHours = 0;
  for (let pile of piles) {
    totalHours += Math.ceil(pile / k);
  }
  return totalHours;
}