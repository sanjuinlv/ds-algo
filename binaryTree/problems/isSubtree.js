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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  let isSubtreeFound = false;
  const dfs = (node1, node2) => {
    if (isSymmetric(node1, node2)) {
      isSubtreeFound = true;
      return;
    }
    if (node1.left) dfs(node1.left, node2);
    if (node1.right) dfs(node1.right, node2);
  };
  dfs(root, subRoot);
  return isSubtreeFound;
};

//Cleaner code
/* 
Approach: Recursive (DFS)
Runtime: 108 ms, faster than 58.69% of JavaScript online submissions for Subtree of Another Tree.
Memory Usage: 49.3 MB, less than 58.28% of JavaScript online submissions for Subtree of Another Tree.
*/
var isSubtree = function (root, subRoot) {
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  if (root === null || subRoot === null) return false;
  //if root value matches then check for tree symmetry
  if (root.val === subRoot.val) {
    if (isSymmetric(root, subRoot)) {
      return true;
    }
  }
  //root node is not same as subRoot, check with left and right node of root
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

/*
Approach: Iterative
Runtime: 124 ms, faster than 40.08% of JavaScript online submissions for Subtree of Another Tree.
Memory Usage: 49.2 MB, less than 58.28% of JavaScript online submissions for Subtree of Another Tree.
*/
var isSubtree = function (root, subRoot) {
  //DFS
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  //BFS
  const bfs = (t1, t2) => {
    const Q = [t1];
    while (Q.length) {
      const node = Q.shift();
      //if root value matches then check for tree symmetry
      if (node.val === t2.val) {
        if (isSymmetric(node, t2)) return true;
      }
      if (node.left !== null) Q.push(node.left);
      if (node.right !== null) Q.push(node.right);
    }
    return false;
  };
  return bfs(root, subRoot);
};

/* 
Iterative with inner loop on queue
Runtime: 128 ms, faster than 35.53% of JavaScript online submissions for Subtree of Another Tree.
Memory Usage: 49.6 MB, less than 26.94% of JavaScript online submissions for Subtree of Another Tree.
*/
var isSubtree = function (root, subRoot) {
  //DFS
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  //BFS
  const bfs = (t1, t2) => {
    const Q = [t1];
    while (Q.length) {
      const length = Q.length;
      for (let i = 0; i < length; i++) {
        const node = Q.shift();
        if (node.val === t2.val) {
          if (isSymmetric(node, t2)) return true;
        }
        if (node.left !== null) Q.push(node.left);
        if (node.right !== null) Q.push(node.right);
      }
    }
    return false;
  };
  return bfs(root, subRoot);
};
