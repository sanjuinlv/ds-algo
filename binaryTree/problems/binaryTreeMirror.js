/**
 * Convert a tree into its mirror. Mirror of a tree is another tree with left and 
 * right children of all non-leaf nodes interchanged.
 * 
 *       1         
 *     /   \
 *    2     3
 *   / \   / \
 *  4   5 6   7
 * Mirror of above tree
 *       1 
 *     /   \
 *    3     2
 *   / \   / \
 *  7   6 5   4
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

    this.mirror1 = (root = this.root) => {
        if (root == null) return root;
        // Note: if we use temp = root, it won't work as pointer will change
        /* swap the pointer */
        let temp = root.left;
        root.left = this.mirror(root.right);
        root.right = this.mirror(temp);
        return root;        
    }
    //other way of doing it
    this.mirror = (root = this.root) => {
        if (root == null) return root;
        this.mirror(root.left);
        this.mirror(root.right);
        /* swap the pointer */
        // Note: if we use temp = root, it won't work as pointer will change
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        return root;        
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
