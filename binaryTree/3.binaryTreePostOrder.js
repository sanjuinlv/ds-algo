//1. Traverse left subtree in postorder
//2. Traverse right subtree in postorder
//3. Visit the root
/*
let bt = new binaryTree();
bt.root = new Node(1);
bt.root.left = new Node(2);
bt.root.right = new Node(3);
bt.root.left.left = new Node(4);
bt.root.left.right = new Node(5);
bt.root.right.left = new Node(6);
bt.root.right.right = new Node(7);
// output: 4 5 2 6 7 3 1
*/
function binaryTree() {
  this.root = null;
  this.postOrder = (node = this.root) => {
    if (node != null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.val);
    }
  };
  //Iterative:  using two stack approach
  this.postOrderIterative = (root = this.root) => {
    if (root == null) return null;
    const s1 = [];
    const s2 = [];
    s1.push(root);
    while (s1.length) {
      root = s1.pop();
      //push current node to second stack
      s2.push(root);
      // if node has left child then add to first stack
      if (root.left) s1.push(root.left);
      // if node has left child then add to first stack
      if (root.right) s1.push(root.right);
    }
    const postOrder = [];
    while (s2.length) {
      const node = s2.pop();
      postOrder.push(node.val);
    }
    return postOrder.join(",");
  };
}
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function runTests() {
  let bt = new binaryTree();
  bt.root = new Node(1);
  bt.root.left = new Node(2);
  bt.root.right = new Node(3);
  bt.root.left.left = new Node(4);
  bt.root.left.right = new Node(5);
  bt.root.right.left = new Node(6);
  bt.root.right.right = new Node(7);
  const postOrder = bt.postOrderIterative();
  console.log(`is postOrder`,  postOrder == "4,5,2,6,7,3,1");
}
/* Using single stac
k
    1.1 Create an empty stack
        2.1 Do following while root is not NULL
        a) Push root's right child and then root to stack.
        b) Set root as root's left child.
    2.2 Pop an item from stack and set it as root.
        a) If the popped item has a right child and the right child 
        is at top of stack, then remove the right child from stack,
        push the root back and set root as root's right child.
        b) Else print root's data and set root as NULL.
    2.3 Repeat steps 2.1 and 2.2 while stack is not empty.    
    */
