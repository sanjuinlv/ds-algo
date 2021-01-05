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
    // recursive solution
    // time complexity: O(N)
    // space complexity: O(N)
    this.size = (root = this.root) => {
        if (root == null) return 0;
        return 1 + this.size(root.left) + this.size(root.right);
    }

    //without recursion (level order traversal)
    // time complexity; O(N)
    // space complexity; O(N)
    this.sizeNonRecursive = (root = this.root) => {
        if (root == null) return 0;
        const Q = new Queue();
        Q.enqueue(root);
        let size = 0;
        while (!Q.isEmpty()){
            root = Q.dequeue();
            size++;
            if (root.left){
                Q.enqueue(root.left);
            }
            if (root.right){
                Q.enqueue(root.right);
            }
        }
        return size;
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
