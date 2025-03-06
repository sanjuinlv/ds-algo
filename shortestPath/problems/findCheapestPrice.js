/* 
787. Cheapest Flights Within K Stops
https://leetcode.com/problems/cheapest-flights-within-k-stops/
Type: Medium

There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

Example 1:
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

Example 2:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

Example 3:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation:
The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

Constraints:

    1 <= n <= 100
    0 <= flights.length <= (n * (n - 1) / 2)
    flights[i].length == 3
    0 <= fromi, toi < n
    fromi != toi
    1 <= pricei <= 104
    There will not be any multiple flights between two cities.
    0 <= src, dst, k < n
    src != dst


*/
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
/* 
Approach I: Bellman Ford 
Time: O((N + E) * K)
We are iterating over all the edges K+1 times which takes O(E*K). At the start and end of each iteration, we also swap distance arrays, which take O(N*K) time for all the iterations. This gives us a time complexity of O(E * K + N * K) = O((N + E) * K)

Space: O(N)

Runtime: 24 ms Beats 66.73%  
Memory: 63.60 MB Beats 5.06%
*/
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Distance from source to all other nodes.
  let distTo = new Array(n).fill(Number.MAX_VALUE);
  //set source distance to 0
  distTo[src] = 0;
  //run the loop k+1 times since we want shortest distance in k hops
  for (let i = 0; i <= k; i++) {
    //create copy of dist array
    const temp = Array.from(distTo);
    for (const flight of flights) {
      const [v, u, distance] = flight;
      if (distTo[v] != Number.MAX_VALUE) {
        temp[u] = Math.min(temp[u], distTo[v] + distance);
      }
    }
    //copy the temp array to distance array to use in next round
    distTo = temp;
  }
  return distTo[dst] == Number.MAX_VALUE ? -1 : distTo[dst];
};
