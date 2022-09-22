/**
 * Write an algorithm for searching element in binary tree
 */
/* 
bt = new binaryTree();
bt.root = new Node(1);
bt.root.left = new Node(2);
bt.root.right = new Node(3);
bt.root.left.left = new Node(4);
bt.root.left.right = new Node(5);
bt.root.right.left = new Node(6);
bt.root.right.right = new Node(7);
*/
function binaryTree() {
  this.root = null;
  //recursive solution
  // Time complexity: O(N)
  // Space complexity: O(N)
  this.search = (key, root = this.root) => {
    if (root != null) {
      if (root.val == key) return true;
      return this.search(key, root.left) || this.search(key, root.right);
    }
    return false;
  };
  //non-recursive solution (Level order )
  this.searchNonRecursive = (key, root = this.root) => {
    const Q = new Queue();
    Q.enqueue(root);
    while (!Q.isEmpty()) {
      root = Q.dequeue();
      if (root.val == key) return true;
      if (root.left) Q.enqueue(root.left);
      if (root.right) Q.enqueue(root.right);
    }
    return false;
  };
}

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
