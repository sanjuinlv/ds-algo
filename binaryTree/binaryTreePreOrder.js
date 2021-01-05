/*
root node
bt = new binaryTree();
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

Pre-order: 1 2 4 5 3 6 7 
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
    //1. visit the root
    //2. Traverse left subtree in Preorder
    //3. Traverse right subtree in Preorder
    this.preOrder = (node = this.root) => {
        if (node != null){
            console.log(node.val);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    // pre-order traversal wihout recusion
    this.preOrderNonRecursive = (node = this.root) => {
        if (node == null) return null;
        const stack = new Stack();
        while(true){
            while (node != null){
                console.log(node.val);
                stack.push(node);
                node = node.left;
            }
            if (stack.isEmpty()) break;
            node = stack.pop();
            node = node.right;
        }
        return;
    }
}

function preOrder(root) {
    if (root == null) return null;
    const stack = new Stack();
    stack.push(root);
    while(!stack.isEmpty()){
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

