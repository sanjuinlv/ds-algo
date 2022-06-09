/* 
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the 
departure and the arrival airports of one flight. Reconstruct the itinerary in order 
and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must 
begin with "JFK". If there are multiple valid itineraries, you should return the 
itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

Example 1:
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]


Example 2:
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.

*/
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

/* 
Approach: Backtracking + DFS
Runtime: 85 ms, faster than 92.27% of JavaScript online submissions for Reconstruct Itinerary.
Memory Usage: 46.5 MB, less than 78.02% of JavaScript online submissions for Reconstruct Itinerary.

*/
function findItinerary(tickets) {
  const flightMap = new Map();
  const visitMap = new Map();
  let result = [];

  const backtrack = (origin, route) => {
    //no more nodes to explore
    if (route.length === flightCount + 1) {
      result = [...route]; //add copy of path
      return true; //this will help us to terminate early with just one path
    }
    if (!flightMap.has(origin)) return;
    const visitedAirports = visitMap.get(origin);
    let i = 0;
    for (let destination of flightMap.get(origin)) {
      if (!visitedAirports[i]) {
        visitedAirports[i] = true;
        route.push(destination);
        const foundRoute = backtrack(destination, route);
        visitedAirports[i] = false;
        route.pop();
        if (foundRoute) return true;
      }
      i++;
    }
    return false;
  };

  let flightCount = 0;
  //1. create adjacency list
  for (const ticket of tickets) {
    flightCount++;
    if (!flightMap.has(ticket[0])) flightMap.set(ticket[0], []);
    flightMap.get(ticket[0]).push(ticket[1]);
  }
  //airport count will be one more than edges (i.e, two airport connecting ticket)
  //sort the airport in lexical order, i.e, in ascending order (smaller to larger alphabets)
  for (let key of flightMap.keys()) {
    //create visit map for each airport
    visitMap.set(key, new Array(flightMap.get(key).length).fill(false));
    flightMap.get(key).sort();
  }
  //2. perform backtracking with dfs
  backtrack("JFK", ["JFK"]);
  return result;
}
