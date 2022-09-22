/* 
Given the root of a binary tree, return the number of uni-value subtrees.
A uni-value subtree means all nodes of the subtree have the same value.
             5 
           /   \
          1     5
         / \     \
        5  5      5
Example 1:
Input: root = [5,1,5,5,5,null,5]
Output: 4

Example 2:
Input: root = []
Output: 0

             5 
           /   \
          5     5
         / \     \
        5  5      5
Example 3:
Input: root = [5,5,5,5,5,null,5]
Output: 6
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
Approach: Recursion (DFS)
Time complexity : O(N). Same as the previous approach.
Space complexity : O(H), with H being the height of the tree. Same as the previous approach.

Runtime: 87 ms, faster than 61.46% of JavaScript online submissions for Count Univalue Subtrees.
Memory Usage: 45.1 MB, less than 12.96% of JavaScript online submissions for Count Univalue Subtrees.
*/
var countUnivalSubtrees = function (root) {
  if (root == null) return 0;
  let count = 0;
  const countUniVal = (node) => {
    //leaf node - is univalue subtree
    if (node.left === null && node.right === null) {
      count++;
      return true;
    }
    let isUniVal = true;
    if (node.left != null) {
      isUniVal = countUniVal(node.left) && node.val === node.left.val;
    }
    if (node.right != null) {
      isUniVal =
        countUniVal(node.right) && isUniVal && node.val === node.right.val;
    }
    if (!isUniVal) return false;
    count++;
    return true;
  };
  countUniVal(root);
  return count;
};

/* 
Approach: Depth First Search - Pass Parent Values
Time complexity : O(N). Same as the previous approach.
Space complexity : O(H), with H being the height of the tree. Same as the previous approach.

Runtime: 77 ms, faster than 78.41% of JavaScript online submissions for Count Univalue Subtrees.
Memory Usage: 44.5 MB, less than 67.11% of JavaScript online submissions for Count Univalue Subtrees.
*/
var countUnivalSubtrees = function (root) {
  if (root == null) return 0;
  let count = 0;
  const isUniVal = (node, val) => {
    //null is considered valid subtree
    if (node == null) return true;
    // note that || short circuits but | does not
    // both sides of the or get evaluated with | so we explore all possible routes
    if (!isUniVal(node.left, node.val) | !isUniVal(node.right, node.val)) {
      return false;
    }
    // if it passed the last step then this a valid subtree - increment
    count++;
    //check if it is valid subtree for the parent node
    return node.val === val;
  };

  isUniVal(root, 0);
  return count;
};

function operatorTest() {
  const test1 = (n) => {
    console.log(`test1`);
    return n == 1;
  };
  const test2 = (n) => {
    console.log(`test2`);
    return n == 2;
  };
  if (test1(2) | test2(2)) {
    console.log(`if`);
  } else {
    console.log(`else`);
  }
}
