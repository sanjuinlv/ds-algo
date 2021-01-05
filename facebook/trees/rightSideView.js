/*
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
BFS: LEVEL ORDER Solution
Time Complexity: O(N)
Space Complexity: O(D), where D is tree diameter. 
Let's use the last level to estimate the queue size. 
This level could contain up to N/2 tree nodes in the case of complete binary tree 
Runtime: 124 ms, faster than 5.39% of JavaScript online submissions for Binary Tree Right Side View.
Memory Usage: 40.4 MB, less than 28.24% of JavaScript online submissions for Binary Tree Right Side View.
*/
var rightSideView = function(root) {
  function Queue(){
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
    }

    this.dequeue = () => {
        if (this.isEmpty()) return null;
        const item = this.first.item;
        this.first = this.first.next;
        if (this.isEmpty()) this.last = null;
        this.N--;
        return item;
    }

    this.top = function() {
        if (this.isEmpty()) return null;
        return this.first.item;
    }

    this.isEmpty = () => {
        return this.N == 0;
    }
  }

  if (root == null) return;
  let resutl = [];
  const Q = new Queue();
  Q.enqueue(root);
  //mark the end of the root level
  Q.enqueue(null);
   while(!Q.isEmpty()){
       root = Q.dequeue();
       //end of the level
       if (root == null){
           //queue is not empty so mark the end of the next level
           if (!Q.isEmpty()){
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
/*
[1,2,3,null,5,null,4,6]
Runtime: 156 ms, faster than 5.40% of JavaScript online submissions for Binary Tree Right Side View.
Memory Usage: 40 MB, less than 85.08% of JavaScript online submissions for Binary Tree Right Side View.
 */
//recusrive (DFS) solution
var rightSideView = function(root) {
    let rightSide = [];
    if (root == null) return rightSide;
    const dfs = (node, level) => {
        if (node == null) return;
        if (!rightSide[level]) rightSide[level] = node.val;
        dfs(node.right, level + 1);
        dfs(node.left, level + 1);
    }
    dfs(root, 0)
    return rightSide;
}

// Using DFS
var rightSideView = function(root) {
    let ans = []
    
    let dfs = (node, level) => {
        if(!node) return;
        
        ans[level] = node.val
        
        dfs(node.left, level+1)
        dfs(node.right, level+1)
    }
    
    dfs(root, 0)
    
    return ans
};

// DFS Java solution
/*
class Solution {
    List<Integer> rightside = new ArrayList();
    
    public void helper(TreeNode node, int level) {
        if (level == rightside.size()) 
            rightside.add(node.val);
        
        if (node.right != null) 
            helper(node.right, level + 1);  
        if (node.left != null) 
            helper(node.left, level + 1);
    }    
    
    public List<Integer> rightSideView(TreeNode root) {
        if (root == null) return rightside;
        
        helper(root, 0);
        return rightside;
    }
}
*/
//another javascript solution
const rightSideView = (root) => {
    // DFS Preorder
    const helper = (node, count, ret) => {
      if (!node) return [];
      
      if (!ret[count]) ret[count] = node.val;
      
      helper(node.right, count + 1, ret);
      helper(node.left, count + 1, ret);
  
      return ret; 
    }
  
    return helper(root, 0, []);
  }