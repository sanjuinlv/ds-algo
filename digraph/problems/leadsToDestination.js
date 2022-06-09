/* 
Given the edges of a directed graph where edges[i] = [ai, bi] indicates there 
is an edge between nodes ai and bi, and two nodes source and destination of this graph,
determine whether or not all paths starting from source eventually, end at destination, that is:

At least one path exists from the source node to the destination node
If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
The number of possible paths from source to destination is a finite number.
Return true if and only if all roads from source lead to destination.

 
*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */

/*
Approach: DFS
Time: O(V + E)
Space: O(V + E)

Runtime: 139 ms, faster than 48.81% of JavaScript online submissions for All Paths from Source Lead to Destination.
Memory Usage: 49.2 MB, less than 83.33% of JavaScript online submissions for All Paths from Source Lead to Destination.

 */
function leadsToDestination(n, edges, source, destination) {
  //1. create adjacency list
  const adjacency = [...new Array(n)].map((X) => []);
  for (let edge of edges) {
    adjacency[edge[0]].push(edge[1]);
  }
  //   console.log(adjacency);

  const dfs = (source, destination) => {
    // console.log(`source: ${source}`);
    // If we've visited this nodes, it's a cycle, return false
    if (marked[source]) return false;
    //reached to dead-end
    if (adjacency[source].length == 0) {
      //reached to destination ?
      return source === destination;
    }
    marked[source] = true;
    for (let w of adjacency[source]) {
      if (!dfs(w, destination)) {
        // If any outgoing path doesn't end at destination, return false
        return false;
      }
    }
    marked[source] = false;
    return true;
  };

  const marked = new Array(n).fill(false);
  return dfs(source, destination);
}
