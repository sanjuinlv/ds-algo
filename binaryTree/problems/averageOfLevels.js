/* 
637. Average of Levels in Binary Tree
https://leetcode.com/problems/average-of-levels-in-binary-tree/
Type: Easy
Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: [3.00000,14.50000,11.00000]
  Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
  Hence return [3, 14.5, 11].


Example 2:
  Input: root = [3,9,20,15,7]
  Output: [3.00000,14.50000,11.00000]
 
Constraints:
 - The number of nodes in the tree is in the range [1, 10^4].
 - -2^31 <= Node.val <= 2^31 - 1

*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
/* 
Approach I: Level Order Traversal (BFS)
Time: O(N)
Space: O(N)

Runtime: 1 ms Beats 98.92%
Memory: 55.13 MB Beats 26.52%
*/
var averageOfLevels = function (root) {
  const queue = [];
  const result = [];
  queue.push(root);
  queue.push(null); //level seperator
  let levelSum = 0;
  let levelNodeCount = 0;
  while (queue.length) {
    const node = queue.shift();
    if (node == null) {
      //add null seperator
      result.push(levelSum / levelNodeCount);
      //reset the level variables
      levelSum = 0;
      levelNodeCount = 0;
      if (queue.length) queue.push(null);
    } else {
      levelSum += node.val;
      levelNodeCount++;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/* 
Approach II: DFS
Time: O(N)
Space: O(N)

Runtime: 4 ms Beats 51.89% 
Memory: 53.86 MB Beats 94.80%
*/
var averageOfLevels = function (root) {
  const sum = [];
  const count = [];
  const dfs = (node, i) => {
    if (sum[i] == undefined) sum[i] = 0;
    if (count[i] == undefined) count[i] = 0;
    sum[i] += node.val; //sum at this level
    count[i]++; //node count
    if (node.left) dfs(node.left, i + 1);
    if (node.right) dfs(node.right, i + 1);
  };
  dfs(root, 0);
  //calculate average
  for (let i = 0; i < sum.length; i++) {
    sum[i] = sum[i] / count[i];
  }
  return sum;
};
