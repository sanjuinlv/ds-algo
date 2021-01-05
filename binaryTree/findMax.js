/** 
 * Find max element in binary tree
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
    //recursinve solution
    this.findMax = (root = this.root) => {
        let max = Number.MIN_VALUE;
        if (root != null){
            let leftMax = this.findMax(root.left);
            let rightMax = this.findMax(root.right);
            if (leftMax > rightMax) max = leftMax;
            else max = rightMax;
            if (root.val > max) max = root.val;
        }
        return max;
    }
    // non-recursive solution, using pre-order traversal
    this.findMaxNonrecursive = (root = this.root) => {
        let max = Number.MIN_VALUE;
        const stack = new Stack();
        while(true) {
            while (root != null){
                if (root.val > max) max = root.val;
                stack.push(root);
                root = root.left;
            }
            if (stack.isEmpty()) break;
            root = stack.pop();
            root = root.right;
        }
        return max;
    }

    // non-recursive solution, using level order traversal
    this.findMaxNonrecursiveLevelOrder = (root = this.root) => {
        let max = Number.MIN_VALUE;
        const Q = new Queue();
        Q.enqueue(root);
        while(!Q.isEmpty()){
            root = Q.dequeue();
            if (root.val > max) max = root.val;
            
            if (root.left) Q.enqueue(root.left);
            if (root.right) Q.enqueue(root.right);
        }
        return max;
    }    
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
