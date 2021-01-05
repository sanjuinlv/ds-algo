/*
Given an algorith for inserting an element into binary tree.

Solution: Since the given tree is binary tree, we can insert the element wherever we want.
We can use level order traversal and insert the element wherever we found the node whose left 
or right child NULL.
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

    function Node(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    
    this.insert = (item) => {
        const newNode = new Node(item);
        if (this.root == null){
            this.root = newNode;
            return;
        }
        const Q = new Queue();
        Q.enqueue(this.root);
        while(!Q.isEmpty()){
            const tempNode = Q.dequeue();
            if (tempNode.left == null) {
                tempNode.left = newNode;
                break;
            } else {
                Q.enqueue(tempNode.left);
            }
            if (tempNode.right == null){
                tempNode.right = newNode;
                break;
            } else {
                Q.enqueue(tempNode.right);   
            }
        }
    }
}