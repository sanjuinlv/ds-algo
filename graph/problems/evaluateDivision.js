/* 
399. Evaluate Division
https://leetcode.com/problems/evaluate-division/
Category - Medium

You are given an array of variable pairs equations and an array of real numbers values,
where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i].
Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query
where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not
result in division by zero and that there is no contradiction.

Example 1:

Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Example 2:

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Example 3:

Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]

Constraints:

1 <= equations.length <= 20
equations[i].length == 2
1 <= Ai.length, Bi.length <= 5
values.length == equations.length
0.0 < values[i] <= 20.0
1 <= queries.length <= 20
queries[i].length == 2
1 <= Cj.length, Dj.length <= 5
Ai, Bi, Cj, Dj consist of lower case English letters and digits.
*/

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
/* 
Approach: DFS
Time: O()
Space: O()
Runtime: 71 ms, faster than 78.03% of JavaScript online submissions for Evaluate Division.
Memory Usage: 42 MB, less than 74.22% of JavaScript online submissions for Evaluate Division.

*/
var calcEquation = function (equations, values, queries) {
  //adjacency list
  const adj = new Map();
  for (let i = 0; i < equations.length; i++) {
    const [v, w] = equations[i];
    if (!adj.has(v)) adj.set(v, []);
    adj.get(v).push([w, values[i]]);
    if (!adj.has(w)) adj.set(w, []);
    adj.get(w).push([v, 1 / values[i]]);
  }

  const dfs = (v, target, div) => {
    if (!adj.has(v)) return -1;
    if (v == target) return div;
    visited.set(v, true);
    let result = -1;
    for (const edge of adj.get(v)) {
      const [w, weight] = edge;
      if (visited.get(w)) continue;
      result = dfs(w, target, div * weight);
      if (result !== -1) break;
    }
    visited.set(v, false);
    return result;
  };

  const result = [];
  const visited = new Map();
  for (const query of queries) {
    const [v, w] = query;
    if (!adj.has(v)) result.push(-1);
    else {
      result.push(dfs(v, w, 1));
    }
  }
  return result;
};

/*
DFS II: Cleaner than above? 
Runttime: 0 ms Beats 100.00%
Memory: 48.48 MB Beats 95.65%
 */
var calcEquation = function (equations, values, queries) {
  const N = equations.length;
  const adjacencyList = new Map();
  const addVertex = (v) => {
    if (!adjacencyList.has(v)) adjacencyList.set(v, []);
  };
  const addEdge = (v, w, value) => {
    addVertex(v);
    addVertex(w);
    adjacencyList.get(v).push([w, value]);
    adjacencyList.get(w).push([v, 1 / value]);
  };

  //create adjaceny list
  for (let i = 0; i < N; i++) {
    const equation = equations[i];
    const value = values[i];
    addEdge(equation[0], equation[1], value);
  }

  const dfs = (v, t, pathVal, visisted) => {
    if (v == t) return pathVal;
    visisted[v] = true;
    for (let adj of adjacencyList.get(v)) {
      const [w, val] = adj;
      if (!visisted[w]) {
        const result = dfs(w, t, pathVal * val, visisted);
        if (result != -1) return result;
      }
    }
    return -1;
  };

  const result = [];
  for (let query of queries) {
    const [source, target] = query;
    if (adjacencyList.has(source)) {
      result.push(dfs(source, target, 1, new Set()));
    } else result.push(-1);
  }
  return result;
};
