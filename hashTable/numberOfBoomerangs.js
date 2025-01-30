/* 
447. Number of Boomerangs
https://leetcode.com/problems/number-of-boomerangs/
Type: Medium

You are given n points in the plane that are all distinct, where points[i] = [xi, yi]. A boomerang is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).

Return the number of boomerangs.

Example 1:
Input: points = [[0,0],[1,0],[2,0]]
Output: 2
Explanation: The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].

Example 2:
Input: points = [[1,1],[2,2],[3,3]]
Output: 2
Example 3:

Input: points = [[1,1]]
Output: 0

Constraints:
 - n == points.length
 - 1 <= n <= 500
 - points[i].length == 2
 - -10^4 <= xi, yi <= 10^4
 - All the points are unique.

*/
/**
 * @param {number[][]} points
 * @return {number}
 */

/* 
Approach: HashTable
Time: O(N^2)
Space: O(N)

Runtime: 94 ms Beats 63.16%    
Memory; 55.44 MB Beats 94.74%
*/
var numberOfBoomerangs = function (points) {
  let count = 0;
  const N = points.length;
  //   if (N < 3) return 0;
  for (let i = 0; i < N; i++) {
    const distanceMap = new Map();
    for (let j = 0; j < N; j++) {
      if (i == j) continue;
      //calculate the distance between points
      const dist = getDistance(points[i], points[j]);
      //count occurence of same distance
      distanceMap.set(dist, (distanceMap.get(dist) || 0) + 1);
    }
    //iterate through the map to find the boomrange
    distanceMap.forEach((val) => {
      //for each match with >=2 we can make N * N-1 combinations
      if (val >= 2) count += val * (val - 1);
    });
  }
  return count;
};

function getDistance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  //Not: we can also use: Math.sqrt(dx * dx + dy * dy);
  return dx * dx + dy * dy;
}
