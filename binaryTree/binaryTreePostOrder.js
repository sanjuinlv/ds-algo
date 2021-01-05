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
 */
function binaryTree() {
    this.root = null;
    //1. Traverse left subtree in postorder
    //2. Traverse right subtree in postorder
    //3. Visit the root
    // output: 4 5 2 6 7 3 1
    this.postOrder = (node = this.root) => {
        if(node != null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.val);
        }
    }

    //using two stack approach
    this.postOrderRecursive = (root = this.root) => {
        if (root == null) return null;
        const s1 = new Stack();
        const s2 = new Stack();
        s1.push(root);
        while(!s1.isEmpty()){
            root = s1.pop();
            //push current node to second stack
            s2.push(root);
            // if node has left child then add to first stack 
            if (root.left){
                s1.push(root.left);
            }
            // if node has left child then add to first stack 
            if (root.right){
                s1.push(root.right);
            }
        }
        while (!s2.isEmpty()){
            const node = s2.pop();
            console.log(node.val);
        }
    }
    /* Using single stack
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
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

