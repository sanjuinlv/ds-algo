/**
 * Find the LCA (Least Common Ancestor) of the two nodes in a Binary Tree.
 * LCA: Let T be a rooted tree. The lowest common ancestor between two nodes n1
 * and n2 is defined as the lowest node in T that has both n1 and n2 as descendants
 * (where we allow a node to be a descendant of itself).
 * E.g.
 * LCA(4,5) = 2
 * LCA(4,6) = 1
 * LCA(3,4) = 1
 * LCA(2,4) = 2
 *       1
 *     /   \
 *    2     3
 *   / \   / \
 *  4   5 6   7
 *
 */
/*
root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);
 */
/*
Approach 1:
1. Find a path from the root to n1 and store it in a vector or array. 
2. Find a path from the root to n2 and store it in another vector or array
3. Traverse both paths till the values in arrays are the same. Return the common
 element just before the mismatch
*/
LCA = (root, node1, node2) => {
  if (root == null) return;
  const findPath = (root, node, arr) => {
    if (root == null) return false;
    arr.push(root);
    if (root.val == node.val) return true;
    if (findPath(root.left, node, arr) || findPath(root.right, node, arr)) {
      // arr.push(root.val);
      return true;
    }
    //if no match found then remove it
    arr.splice(arr.length - 1, 1);
    return false;
  };
  let path1 = [],
    path2 = [];
  if (!findPath(root, node1, path1) || !findPath(root, node2, path2)) {
    if (path1.length > 0) console.log(`node1 is present`);
    if (path2.length > 0) console.log(`node2 is present`);
    console.log(`no LCA found`);
    return false;
  }
  let i;
  for (i = 0; i < path1.length && i < path2.length; i++) {
    if (path1[i].val !== path2[i].val) break;
  }
  console.log(`i: ${i}`);
  //if we need to return the value we can return path1.[i-1].val
  return path1[i - 1];
};

/*
Approach 2:
The idea is to traverse the tree starting from the root. If any of the given 
keys (n1 and n2) matches with the root, then the root is LCA (assuming that both keys 
are present). 
If the root doesn’t match with any of the keys, we recur for the left and 
right subtree. The node which has one key present in its left subtree and the other key 
present in the right subtree is the LCA. 
If both keys lie in the left subtree, then the left subtree has LCA also, otherwise, LCA lies in the right subtree.
 */
LCA = (root, node1, node2) => {
  if (root == null) return root;
  //if any of the node1 and node2 matches root then, root is LCA
  if (root.val == node1.val || root.val == node2.val) {
    return root;
  }
  //find recursively the left child LCA
  let left = LCA(root.left, node1, node2);
  //find recursively the right child LCA
  let right = LCA(root.right, node1, node2);
  if (left && right) return root;
  //If both keys lie in the left subtree, then the left subtree has LCA also, otherwise, LCA lies in the right subtree.
  return left ? left : right;
};
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  const LCA = (node, p, q) => {
    if (node == null) return null;
    //if any of the p and q matches root then, root is LCA
    if (node == p || node === q) return node;
    //find recursively the left child LCA
    const leftLCA = LCA(node.left, p, q);
    //find recursively the right child LCA
    const rightLCA = LCA(node.right, p, q);
    if (leftLCA && rightLCA) return node;
    return leftLCA ? leftLCA : rightLCA;
  };
  return LCA(root, p, q);
};

var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  //if current node matched any of the p, q then current node is LCA
  if (root === p || root == q) return root;
  const leftLCA = lowestCommonAncestor(root.left, p, q);
  const rightLCA = lowestCommonAncestor(root.left, p, q);
  //if both left and right is under this node then this is LCA
  if (leftLCA && rightLCA) return root;
  return leftLCA ? leftLCA : rightLCA;
};
