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

Runtime: 128 ms, faster than 43.57% of JavaScript online submissions for Course Schedule II.
Memory Usage: 48.4 MB, less than 37.32% of JavaScript online submissions for Course Schedule II.
 */
var findOrder = function (numCourses, prerequisites) {
  //1. create adjacency list
  const adjacency = [...Array(numCourses)].map(() => new Array());
  for (let prerequisite of prerequisites) {
    adjacency[prerequisite[1]].push(prerequisite[0]);
  }
  const hasCycle = (adj) => {
    const marked = new Array(adj.length).fill(false);
    const onStack = new Array(adj.length).fill(false);
    const dfs = (v, adj) => {
      marked[v] = true;
      onStack[v] = true;
      for (let w of adj[v]) {
        if (!marked[w] && dfs(w, adj)) {
          return true;
        } else if (onStack[w]) {
          return true;
        }
      }
      onStack[v] = false;
      return false;
    };
    //check for cycle
    for (let i = 0; i < adj.length; i++) {
      if (!marked[i] && dfs(i, adj)) return true;
    }
    return false;
  };
  //2. check if the graph is DGA, i.e, it has cycle
  if (hasCycle(adjacency)) return [];
  //3. create reverse post order
  const reversePostOrder = (adj) => {
    const marked = new Array(adj.length).fill(false);
    const reversePost = [];
    const dfs = (v, adj) => {
      marked[v] = true;
      for (let w of adj[v]) {
        if (!marked[w]) dfs(w, adj);
      }
      reversePost.push(v);
    };

    for (let i = 0; i < adj.length; i++) {
      if (!marked[i]) dfs(i, adj);
    }
    return reversePost;
  };
  return reversePostOrder(adjacency).reverse();
};

/* 
Approach : DFS (Cycle detection and post order creation in same loop)
Time: O(V+E)
Space: O(V+E)
Runtime: 104 ms, faster than 66.79% of JavaScript online submissions for Course Schedule II.
Memory Usage: 47.8 MB, less than 47.38% of JavaScript online submissions for Course Schedule II.
*/
var findOrder = function (numCourses, prerequisites) {
  //1. create adjacency list
  const adjacency = [...Array(numCourses)].map(() => new Array());
  for (let prerequisite of prerequisites) {
    adjacency[prerequisite[1]].push(prerequisite[0]);
  }
  //2. create reverse post order
  const reversePostOrder = (adj) => {
    const marked = new Array(adj.length).fill(false);
    const onStack = new Array(adj.length).fill(false);
    const reversePost = [];

    const dfs = (v, adj) => {
      marked[v] = true;
      onStack[v] = true;
      for (let w of adj[v]) {
        if (!marked[w] && dfs(w, adj)) {
          return true;
        } else if (onStack[w]) {
          return true;
        }
      }
      reversePost.push(v);
      onStack[v] = false;
      return false;
    };

    for (let i = 0; i < adj.length; i++) {
      if (!marked[i] && dfs(i, adj)) return [];
    }
    return reversePost;
  };
  return reversePostOrder(adjacency).reverse();
};
