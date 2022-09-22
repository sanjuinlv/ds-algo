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
 * @return {number[][]}
 */
/* 
Approach: BFS (Iterative)
Runtime: 98 ms, faster than 28.72% of JavaScript online submissions for Binary Tree Zigzag Level Order Traversal.
Memory Usage: 44.1 MB, less than 55.02% of JavaScript online submissions for Binary Tree Zigzag Level Order Traversal.
*/
var zigzagLevelOrder = function (root) {
  const Q = [];
  const result = [];
  Q.push(root);
  Q.push(null);
  let level = 0;
  //true for adding items in reverse order, i.e, in queue else stack push
  let ltr = true;
  while (Q.length) {
    const node = Q.shift();
    if (node === null) {
      level++;
      ltr = !ltr;
      //add level separator
      if (Q.length) Q.push(null);
    } else {
      if (!result[level]) result[level] = [];
      if (ltr) {
        result[level].push(node.val);
      } else {
        result[level].unshift(node.val);
      }
      if (node.left) Q.push(node.left);
      if (node.right) Q.push(node.right);
    }
  }
  return result;
};

/* 
Approach: DFS (Recursive)
Runtime: 73 ms, faster than 69.41% of JavaScript online submissions for Binary Tree Zigzag Level Order Traversal.
Memory Usage: 43.8 MB, less than 85.25% of JavaScript online submissions for Binary Tree Zigzag Level Order Traversal.
*/
var zigzagLevelOrder = function (root) {
  const result = [];
  if (root == null) return result;
  result[0] = [];
  const dfs = (node, level, ltr) => {
    if (node === null) return;
    if (!result[level]) result[level] = [];
    if (ltr) {
      result[level].push(node.val);
    } else {
      result[level].unshift(node.val);
    }
    if (node.left) dfs(node.left, level + 1, !ltr);
    if (node.right) dfs(node.right, level + 1, !ltr);
  };
  dfs(root, 0, true);
  //true for adding items in reverse order, i.e, in queue else stack push
  return result;
};
