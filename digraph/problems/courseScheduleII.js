/*
There are a total of n courses you have to take labelled from 0 to n - 1.
Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] 
this means you must take the course bi before the course ai.
Given the total number of courses numCourses and a list of the prerequisite pairs,
return the ordering of courses you should take to finish all courses.
If there are many valid answers, return any of them. If it is impossible to finish
all courses, return an empty array.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should 
have finished course 0. So the correct course order is [0,1].

Example 2:
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

Example 3:
Input: numCourses = 1, prerequisites = []
Output: [0]

Constraints:
    - 1 <= numCourses <= 2000
    - 0 <= prerequisites.length <= numCourses * (numCourses - 1)
    - prerequisites[i].length == 2
    - 0 <= ai, bi < numCourses
    - ai != bi
    - All the pairs [ai, bi] are distinct.
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

/* 
DFS
Using topological order
Fails for 
2
[[0,1],[1,0]]

This is due to cycle in the input. So we need to handle the cycle
*/

/*
Approach: DFS
Time: O(V+E)
Space: O(V+E)

Runtime: 21 ms Beats 16.53%
Memory Usage: 57.81 MB Beats 11.58%
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  //create adjacency list
  const adjacencyList = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    adjacencyList[i] = [];
  }
  //create adjacency list by adding edges, course
  for (const prerequisite of prerequisites) {
    adjacencyList[prerequisite[1]].push(prerequisite[0]);
  }
  //2. check if the graph is DGA, i.e, it has cycle
  if (hasCycle(adjacencyList)) return [];
  //create the reverse post order
  const visisted = new Array(numCourses).fill(false);
  const reverseOrder = [];
  for (let i = 0; i < numCourses; i++) {
    if (!visisted[i])
      reversePostOrder(i, visisted, reverseOrder, adjacencyList);
  }
  return reverseOrder.reverse();
};

function reversePostOrder(v, visited, reverseOrder, adj) {
  visited[v] = true;
  for (const w of adj[v]) {
    if (!visited[w]) reversePostOrder(w, visited, reverseOrder, adj);
  }
  reverseOrder.push(v);
}

function hasCycle(adj) {
  const marked = new Array(adj.length).fill(false);
  const onStack = new Array(adj.length).fill(false);
  const isCycle = (v) => {
    marked[v] = true;
    onStack[v] = true;
    for (const w of adj[v]) {
      if (!marked[w]) {
        if (isCycle(w)) return true;
      } else if (onStack[w]) {
        //if dfs on 'w' is not yet completed and encountered
        //again it means there is cycle
        return true;
      }
    }
    onStack[v] = false;
    return false;
  };

  for (let i = 0; i < adj.length; i++) {
    if (!marked[i] && isCycle(i)) return true;
  }
  return false;
}

/* 
Approach : DFS (Cycle detection and post order creation in same loop)
Time: O(V+E)
Space: O(V+E)

Runtime: 15 ms Beats 32.71%
Memory Usage: 56.72 MB Beats 24.58%
*/
var findOrder = function (numCourses, prerequisites) {
  //create adjacency list
  const adjacencyList = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    adjacencyList[i] = [];
  }
  //create adjacency list by adding edges, course
  for (const prerequisite of prerequisites) {
    adjacencyList[prerequisite[1]].push(prerequisite[0]);
  }
  //2. check if the graph is DGA, i.e, it has cycle
  //create the reverse post order
  return reversePostOrder(adjacencyList).reverse();
};

function reversePostOrder(adj) {
  const reverseOrder = [];
  const visited = new Array(adj.length).fill(false);
  const onStack = new Array(adj.length).fill(false);
  for (let i = 0; i < adj.length; i++) {
    if (!visited[i] && dfs(i, adj, visited, onStack, reverseOrder)) return [];
  }
  return reverseOrder;
}

function dfs(v, adj, visited, onStack, order) {
  visited[v] = true;
  onStack[v] = true;
  for (const w of adj[v]) {
    if (!visited[w] && dfs(w, adj, visited, onStack, order)) return true;
    //if dfs on 'w' is not yet completed and encountered
    //again it means there is cycle
    else if (onStack[w]) return true;
  }
  order.push(v);
  onStack[v] = false;
  return false;
}
