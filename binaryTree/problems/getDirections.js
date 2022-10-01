/*
You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.

Example 1:
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

Example 2:
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.

Constraints:
 - The number of nodes in the tree is n.
 - 2 <= n <= 105
 - 1 <= Node.val <= n
 - All the values in the tree are unique.
 - 1 <= startValue, destValue <= n
 - startValue != destValue

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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
/*
Approach I: DFS
Runtime: 547 ms, faster than 26.35% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
Memory Usage: 110.5 MB, less than 59.34% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
 */
var getDirections = function (root, startValue, destValue) {
  const LCA = (node, p, q) => {
    if (node === null) return null;
    if (node.val === p || node.val === q) return node;
    const left = LCA(node.left, p, q);
    const right = LCA(node.right, p, q);
    if (left && right) return node;
    return left ? left : right;
  };
  //1. find LCA of both nodes
  const LCANode = LCA(root, startValue, destValue);
  //2. Find path
  const findStartPath = (node, target, path) => {
    if (node == null) return "";
    if (node.val == target) return path;
    //reached leaf node without finding the target
    if (node.left === null && node.right == null) return "";
    const leftPath = findStartPath(node.left, target, path + "U");
    if (leftPath) return leftPath;
    return findStartPath(node.right, target, path + "U");
  };
  //3. find destination path
  const findDestPath = (node, target, path) => {
    //reached leaf node without finding the target
    if (node == null) return "";
    if (node.val == target) return path;
    //reached leaf node without finding the target
    if (node.left === null && node.right == null) return "";
    const leftPath = findDestPath(node.left, target, path + "L");
    if (leftPath) return leftPath;
    return findDestPath(node.right, target, path + "R");
  };

  const startPath = findStartPath(LCANode, startValue, "");
  const destPath = findDestPath(LCANode, destValue, "");
  // console.log(`startPath: ${startPath}, destPath: ${destPath}`);
  return startPath + destPath;
};

/*
II: MOdified version with only one path method
Runtime: 476 ms, faster than 47.58% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
Memory Usage: 110.1 MB, less than 59.48% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
 */
var getDirections = function (root, startValue, destValue) {
  const LCA = (node, p, q) => {
    if (node === null) return null;
    if (node.val === p || node.val === q) return node;
    const left = LCA(node.left, p, q);
    const right = LCA(node.right, p, q);
    if (left && right) return node;
    return left ? left : right;
  };
  //1. find LCA of both nodes
  const LCANode = LCA(root, startValue, destValue);

  const findPath = (node, target, path) => {
    //reached leaf node without finding the target
    if (node == null) return "";
    if (node.val == target) return path;
    //reached leaf node without finding the target
    if (node.left === null && node.right == null) return "";
    const leftPath = findPath(node.left, target, path + "L");
    if (leftPath) return leftPath;
    return findPath(node.right, target, path + "R");
  };

  //2. Find left and right path
  const path = findPath(LCANode, startValue, "");
  let startPath = "";
  for (let i = 0; i < path.length; i++) {
    startPath += "U";
  }
  const destPath = findPath(LCANode, destValue, "");
  return startPath + destPath;
};
