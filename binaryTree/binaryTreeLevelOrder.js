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

    //1. Visit the root
    //2. while travesring the level 1, keep all the elements at level 1+1 in group
    //3. Go the next level and visit all the nodes
    // repeate this untill all levels are completed
    this.levelOrder = (root = this.root) => {
        if (root == null) return;
        const queue = new Queue();
        queue.enqueue(root);
        while(!queue.isEmpty()){
            const node = queue.dequeue();
            console.log(node.val);
            if (node.left){
                queue.enqueue(node.left);
            }
            if (node.right){
                queue.enqueue(node.right);
            }
        }
    }   
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

