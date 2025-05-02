/*
199. Binary Tree Right Side View
https://leetcode.com/problems/binary-tree-right-side-view/
Type: Medium 

Given a binary tree, imagine yourself standing on the right side of it, 
return the values of the nodes you can see ordered from top to bottom.

Example:
   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
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
Approach I: BFS (Level order traversal)

Runtime: 0 ms Beats 100.00%
Memory: 54.37 MB Beats 91.95%
*/
var rightSideView = function (root) {
  if (root == null) return [];
  const Q = [];
  const result = [];
  result.push(root.val);
  Q.push(root);
  Q.push(null);
  while (Q.length) {
    const node = Q.shift();
    //level separator
    if (node == null) {
      //if we still have element in Q then add new level separator
      // and record the top of element as right most node
      if (Q.length) {
        //top of the Q is right side element
        result.push(Q[Q.length - 1].val);
        Q.push(null); //separator
      }
    } else {
      if (node.left) Q.push(node.left);
      if (node.right) Q.push(node.right);
    }
  }
  return result;
};
/* 
BFS: without null separator
Runtime: 0 ms Beats 100.00%
Memory: 55.15 MB Beats 59.15%
*/
var rightSideView = function (root) {
  if (root == null) return [];
  const Q = [];
  const result = [];
  Q.push(root);
  while (Q.length) {
    const size = Q.length;
    for (let i = 0; i < size; i++) {
      const node = Q.shift();
      //check if this is the last element at this level
      if (i == size - 1) result.push(node.val);
      if (node.left) Q.push(node.left);
      if (node.right) Q.push(node.right);
    }
  }
  return result;
};

/*
Approach II: Recursive

Runtime: 156 ms, faster than 5.40% of JavaScript online submissions for Binary Tree Right Side View.
Memory Usage: 40 MB, less than 85.08% of JavaScript online submissions for Binary Tree Right Side View.
*/
const rightSideView = (root) => {
  // DFS Preorder
  const helper = (node, level, result) => {
    if (!node) return [];
    if (!result[level]) result[level] = node.val;
    helper(node.right, level + 1, result);
    helper(node.left, level + 1, result);
    return result;
  };
  return helper(root, 0, []);
};

//Not sure how below code is working :(
/* 
BFS: LEVEL ORDER Solution
Time Complexity: O(N)
Space Complexity: O(D), where D is tree diameter. 
Let's use the last level to estimate the queue size. 
This level could contain up to N/2 tree nodes in the case of complete binary tree 
Runtime: 124 ms, faster than 5.39% of JavaScript online submissions for Binary Tree Right Side View.
Memory Usage: 40.4 MB, less than 28.24% of JavaScript online submissions for Binary Tree Right Side View.
*/
var rightSideView = function (root) {
  function Queue() {
    this.N = 0;
    //link to the least recently added node
    this.first = null;
    //link to the most recently added node
    this.last = null;

    function Node(item) {
      this.item = item;
      this.next = null;
    }
    this.enqueue = (item) => {
      const oldLast = this.last;
      const newNode = new Node(item);
      this.last = newNode;
      if (this.isEmpty()) {
        this.first = this.last;
      } else {
        oldLast.next = this.last;
      }
      this.N++;
    };

    this.dequeue = () => {
      if (this.isEmpty()) return null;
      const item = this.first.item;
      this.first = this.first.next;
      if (this.isEmpty()) this.last = null;
      this.N--;
      return item;
    };

    this.top = function () {
      if (this.isEmpty()) return null;
      return this.first.item;
    };

    this.isEmpty = () => {
      return this.N == 0;
    };
  }

  if (root == null) return;
  let resutl = [];
  const Q = new Queue();
  Q.enqueue(root);
  //mark the end of the root level
  Q.enqueue(null);
  while (!Q.isEmpty()) {
    root = Q.dequeue();
    //end of the level
    if (root == null) {
      //queue is not empty so mark the end of the next level
      if (!Q.isEmpty()) {
        Q.enqueue(null);
      }
    } else {
      if (Q.top() == null) {
        resutl.push(root.val);
      }
      if (root.left) Q.enqueue(root.left);
      if (root.right) Q.enqueue(root.right);
    }
  }
  return resutl;
};
