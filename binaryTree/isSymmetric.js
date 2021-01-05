/* 
Type: Easy
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric
    1
   / \
  2   2
 / \ / \
3  4 4  3

But the following [1,2,2,null,3,null,3] is not:
    1
   / \
  2   2
   \   \
   3    3
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
 * @return {boolean}
 */
// [1,2,2,3,4,4,3]
// [1,2,2,4,null,4,3]
// [1,2,2,4,5,6,7]
/* 
//Solution reference
Approach: recursive 
Time Complexity: O(N)
Space Complexity: O(N)

Runtime: 92 ms, faster than 58.56% of JavaScript online submissions for Symmetric Tree.
Memory Usage: 41.1 MB, less than 9.27% of JavaScript online submissions for Symmetric Tree.
*/
var isSymmetric = function(root) {
    const isMirror = (t1, t2) => {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val) 
            && (isMirror(t1.left, t2.right))
            && (isMirror(t1.right, t2.left));
    }
    return  isMirror(root, root);
};

/* 
Approach: BFS (Level order travesral)
Time Complexity: O(N)
Space Complexity: O(N)
Runtime: 88 ms, faster than 78.83% of JavaScript online submissions for Symmetric Tree.
Memory Usage: 40.8 MB, less than 17.86% of JavaScript online submissions for Symmetric Tree.
*/
var isSymmetric = function(root) {
    if (root == null) return true;
    const queue = [];
    queue.push(root);
    queue.push(root);
    while(queue.length) {
        const t1 = queue.shift();
        const t2 = queue.shift();
        if (t1 == null && t2 == null) continue;
        if (t1 == null || t2 == null) return false;
        if (t1.val != t2.val) return false;
        queue.push(t1.left);
        queue.push(t2.right);
        queue.push(t1.right);
        queue.push(t2.left);
    }
    return true;
}