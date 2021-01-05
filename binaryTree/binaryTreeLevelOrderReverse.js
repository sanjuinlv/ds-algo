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
/**
 * Print the level order data in reverse, i.e.,
 * it should be: 4 5 6 7 2 3 1
 */
function binaryTree() {
    this.root = null;

    //1. Visit the root
    //2. while travesring the lebel 1, keep all the elements at level 1+1 in group
    //3. Go the next level and visit all the nodes
    // repeate this untill all levels are completed
    this.levelOrderReverse = (root = this.root) => {
        if (root == null) return;
        const queue = new Queue();
        const stack = new Stack();
        queue.enqueue(root);
        while(!queue.isEmpty()){
            const node = queue.dequeue();
            if (node.right){
                queue.enqueue(node.right);
            }
            if (node.left){
                queue.enqueue(node.left);
            }
            stack.push(node.val);
        }
        while(!stack.isEmpty()){
            console.log(stack.pop());
        }
    }   
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

