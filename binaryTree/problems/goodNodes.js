/* 
1448. Count Good Nodes in Binary Tree
https://leetcode.com/problems/count-good-nodes-in-binary-tree/
Type: Medium

Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

Example 1:
      3
    /   \   
   1     4 
  /    /   \
 3    1     5
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.
Root Node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.

Example 2:
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

Example 3:
Input: root = [1]
Output: 1
Explanation: Root is considered as good.
 
Constraints:
 - The number of nodes in the binary tree is in the range [1, 10^5].
 - Each node's value is between [-10^4, 10^4].
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
 * @return {number}
 */
/* 
Approach I: Top down 
Runtime: 120 ms Beats 35.93%
Memory: 79.25 MB Beats 8.22%
*/
var goodNodes = function (root) {
  if (root == null) return 0;
  let count = 0;
  const countGoodPath = (node, currMax) => {
    if (node == null) return;
    if (node.val >= currMax) count++;
    const localMax = Math.max(node.val, currMax);
    if (node.left) countGoodPath(node.left, localMax);
    if (node.right) countGoodPath(node.right, localMax);
  };
  countGoodPath(root, root.val);
  return count;
};

/* 
Approach II: Bottom Up

Runtime: 96 ms Beats 96.07%
Memory: 76.30 MB Beats 92.07%
*/
var goodNodes = function (root) {
  if (root == null) return 0;
  const countGoodPath = (node, currMax) => {
    if (node == null) return 0;
    const good = node.val >= currMax ? 1 : 0;
    currMax = Math.max(currMax, node.val);
    const leftCount = countGoodPath(node.left, currMax);
    const rightCount = countGoodPath(node.right, currMax);
    return good + leftCount + rightCount;
  };
  return countGoodPath(root, -Infinity);
};

/* 
Approach III: Iterative 

Runtime: 114 ms Beats 53.78%
Memory: 77.99 MB Beats 53.56%
*/
var goodNodes = function (root) {
  const stack = [];
  stack.push([root, -Infinity]);
  let count = 0;
  while (stack.length) {
    let [node, currMax] = stack.pop();
    if (node.val >= currMax) {
      currMax = node.val;
      count++;
    }
    if (node.left) stack.push([node.left, currMax]);
    if (node.right) stack.push([node.right, currMax]);
  }
  return count;
};
