/**
 * Find the height (or depth) of the binary tree
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

    // time complexity: O(N)
    // space complexity: O(N)
    this.diameter = (root = this.root) => {
        let diameter = 0;
        const diameterHelper = (node, diameter) => {
            
        }        
        return diameter;
    }

}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
