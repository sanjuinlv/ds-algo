/**
 * Print the level order data in reverse, i.e.,
 * it should be: 4 5 6 7 2 3 1
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

    this.deepestNode = (root = this.root) => {
        if (root == null) return null;
        const Q = new Queue();
        Q.enqueue(root);
        while(!Q.isEmpty()){
            temp = Q.dequeue();
            if (temp.left) Q.enqueue(temp.left);
            if (temp.right) Q.enqueue(temp.right);
        }
        return temp;
    }
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
