/**
 * Find the level that has maximum sum in the binary tree
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

    this.findMaxLevelSum = (root = this.root) => {
        if (!root) return 0;
        let currentSum = 0, sum = 0;
        let level = 0, maxLavel = 0;
        const Q = new Queue();
        Q.enqueue(root);
        //mark the end of fisrt level
        Q.enqueue(null);
        while(!Q.isEmpty()){
            root = Q.dequeue();
            if (root == null){
                level++;
                if (currentSum > sum) {
                    sum = currentSum;
                    maxLavel = level;
                };
                currentSum = 0;
                //mark the end of current level
                if (!Q.isEmpty()) Q.enqueue(null);
            } else {
                currentSum += root.val;
                if (root.left) Q.enqueue(root.left);
                if (root.right) Q.enqueue(root.right) ;
            }
        }  
        return maxLavel;  
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

