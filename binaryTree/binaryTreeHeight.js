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
    this.height = (root = this.root) => {
        if (root == null) return 0;
        let leftTreeHeight = this.height(root.left);
        let rightTreeHeight = this.height(root.left);
        if (leftTreeHeight > rightTreeHeight) {
            return leftTreeHeight + 1;
        } else {
            return rightTreeHeight + 1;
        }
        // height of root node and max of left and right node height
        // return 1 + Math.max(leftTreeHeight, rightTreeHeight);
    }

    // Non recursive (Using level order)
    this.heightNonRecursive = (root = this.root) => {
         if (root == null) return 0;
         const Q = new Queue();
         let height = 0;
         Q.enqueue(root);
         //End of first level
         Q.enqueue(null);
         while(!Q.isEmpty()){
             root = Q.dequeue();
             //completion of current level
             if (root == null){
                 //put another marker for next level
                 if (!Q.isEmpty()) Q.enqueue(null);
                 height++;
             } else {
                if (root.left) {
                    Q.enqueue(root.left);
                }
                if (root.right){
                    Q.enqueue(root.right);
                }
            }
         }
         return height;
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
