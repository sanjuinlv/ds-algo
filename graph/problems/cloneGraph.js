/* 
Given a reference of a node in a connected undirected graph.
Return a deep copy (clone) of the graph.
Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.
class Node {
    public int val;
    public List<Node> neighbors;
}

Test case format:

For simplicity sake, each node's value is the same as the node's index (1-indexed). 
For example, the first node with val = 1, the second node with val = 2, and so on. 
The graph is represented in the test case using an adjacency list.
Adjacency list is a collection of unordered lists used to represent a finite graph. 
Each list describes the set of neighbors of a node in the graph.
The given node will always be the first node with val = 1. 
You must return the copy of the given node as a reference to the cloned graph.

Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

Example 2:
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. 
The graph consists of only one node with val = 1 and it does not have any neighbors.

Example 3:
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.

Example 4:
Input: adjList = [[2],[1]]
Output: [[2],[1]]
*/
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */

/* 
Approach 1: BFS (Using Map for nodes)
Time complexity: O(V + E), where V is no. of vertices and E is no. of Edges
Space Complexity: O(V) (and also space occupied by Queue O(W), where W is width of Graph)

Runtime: 76 ms, faster than 95.92% of JavaScript online submissions for Clone Graph.
Memory Usage: 40.4 MB, less than 30.57% of JavaScript online submissions for Clone Graph.
*/
var cloneGraph = function (node) {
  if (node == null) return node;
  const visited = new Map();
  const queue = [];
  queue.push(node);
  visited.set(node, new Node(node.val));
  while (queue.length) {
    const v = queue.shift();
    for (let w of v.neighbors) {
      if (!visited.has(w)) {
        queue.push(w);
        visited.set(w, new Node(w.val));
      }
      visited.get(v).neighbors.push(visited.get(w));
    }
  }
  return visited.get(node);
};

/* 
Approach 2: DFS (Using Map for nodes)
Time complexity: O(V + E), where V is no. of vertices and E is no. of Edges
Space: O(V), space required by visited map and recursion stack

Runtime: 80 ms, faster than 84.97% of JavaScript online submissions for Clone Graph.
Memory Usage: 40.1 MB, less than 71.85% of JavaScript online submissions for Clone Graph.
*/
var cloneGraph = function (node) {
  if (node == null) return node;
  const visited = new Map();
  const dfs = (v) => {
    visited.set(v, new Node(v.val));
    for (let w of v.neighbors) {
      if (!visited.has(w)) {
        dfs(w);
      }
      visited.get(v).neighbors.push(visited.get(w));
    }
  };
  dfs(node);
  return visited.get(node);
};
