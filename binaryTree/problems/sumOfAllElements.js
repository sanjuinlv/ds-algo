/**
 * Find the sum of all elements in binary tree
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

    this.sumOfAllElements = (root = this.root) =>{
        if (root == null) return 0;
        return root.val + this.sumOfAllElements(root.left) 
                + this.sumOfAllElements(root.right);                
    }
}