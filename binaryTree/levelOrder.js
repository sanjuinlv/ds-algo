/* 
Type: Easy

Given a binary tree, return the level order traversal of its nodes' values. 
(ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7

Level Order traversal:   
[
  [3],
  [9,20],
  [15,7]
]
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
 * @return {number[][]}
 */
/*
BFS: 
Time Complexity: O(N)
Space Complexity: O(N)
Runtime: 84 ms, faster than 66.06% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 40.3 MB, less than 36.50% of JavaScript online submissions for Binary Tree Level Order Traversal.
 */
var levelOrder = function(root) {
    if (root == null) return [];
    result = [];
    let level = 0;
    const queue = [];
    queue.push(root);
    queue.push(null);
    while (queue.length) {
        const node = queue.shift();
        if (node == null) {
            level++;
            if (queue.length) queue.push(null);
        } else {
            if (!result[level]) result[level] = [];
            result[level].push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
};

/* 
DFS: Recursive

Runtime: 80 ms, faster than 85.22% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 40.3 MB, less than 25.09% of JavaScript online submissions for Binary Tree Level Order Traversal.
*/
var levelOrder = function(root) {
    if (root == null) return [];
    result = [];
    const helper = (node, level) => {
        if (node == null) return;
        if (!result[level]) result[level] = [];
        result[level].push(node.val);
        helper(node.left, level + 1);
        helper(node.right, level + 1);
    }
    helper(root, 0);
    return result;
}

/*leetcode iterative solution

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
      List<List<Integer>> levels = new ArrayList<List<Integer>>();
      if (root == null) return levels;
  
      Queue<TreeNode> queue = new LinkedList<TreeNode>();
      queue.add(root);
      int level = 0;
      while ( !queue.isEmpty() ) {
        // start the current level
        levels.add(new ArrayList<Integer>());
  
        // number of elements in the current level
        int level_length = queue.size();
        for(int i = 0; i < level_length; ++i) {
          TreeNode node = queue.remove();
  
          // fulfill the current level
          levels.get(level).add(node.val);
  
          // add child nodes of the current level
          // in the queue for the next level
          if (node.left != null) queue.add(node.left);
          if (node.right != null) queue.add(node.right);
        }
        // go to next level
        level++;
      }
      return levels;
    }
  }
  */