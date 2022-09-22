/** 
 * Print alll the ancestors of a node in a binary tree. 
 * For the given tree below, for 7 the ancestors are 1 3 7
 *       1         
 *     /   \
 *    2     3
 *   / \   / \
 *  4   5 6   7 
 * 
 */
/*
root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);
 */
//print order: 7 3 1
printAllAncestors = (root, node) => {
    /* base case */
    if (root == null) return false;
    
    if (root.val == node.val) return true;
    //search in left or right node
    if (printAllAncestors(root.left, node) || printAllAncestors(root.right, node)) {
        console.log(root.val);
        return true;
    };        
    return false;
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
