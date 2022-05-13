/*
root node
let bt = new binaryTree();
bt.root = new Node(1);
bt.root.left = new Node(2);
bt.root.right = new Node(3);
bt.root.left.left = new Node(4);
bt.root.left.right = new Node(5);
bt.root.right.left = new Node(6);
bt.root.right.right = new Node(7);
       1         
     /   \
    2     3
   / \   / \
  4   5 6   7 
Inorder output: 4 2 5 1 6 3 7
root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);
 */
function binaryTree() {
  this.root = null;
  //1. Traverse left subtree in Inorder
  //2. Visit the root
  //3. Traverse right subtree in Inorder
  // output: 4 2 5 1 6 3 7
  this.inOrder = (node = this.root) => {
    if (node != null) {
      //left sub-tree traversal
      this.inOrder(node.left);
      //visit the root
      console.log(node.val);
      //right sub-tree traversal
      this.inOrder(node.right);
    }
  };

  this.inOrderIterative = (node = this.root) => {
    if (node == null) return null;
    const stack = new Stack();
    while (true) {
      while (node != null) {
        stack.push(node);
        node = node.left;
      }
      if (stack.isEmpty()) break;
      node = stack.pop();
      console.log(node.val);
      node = node.right;
    }
    return;
  };
}

//recursive
function inOrder(root) {
  if (root != null) {
    //left sub-tree traversal
    inOrder(root.left);
    //visit the root
    console.log(root.val);
    //right sub-tree traversal
    inOrder(root.right);
  }
}

function inorder(root) {
  if (root == null) return;
  const stack = new Stack();
  stack.push(root);
  while (!stack.isEmpty()) {
    root = stack.pop();
    console.log(root.val);
    if (root.right) stack.push(root.right);
    if (root.left) stack.push(root.left);
  }
}

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
