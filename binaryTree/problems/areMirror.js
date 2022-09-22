/**
 * Given two trees, check whether they are mirrors of each other
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
 *  5   4 7   6
 */
/*

root1 = new Node(1);
root1.left = new Node(2);
root1.right = new Node(3);
root1.left.left = new Node(4);
root1.left.right = new Node(5);
root1.right.left = new Node(6);
root1.right.right = new Node(7);

//mirror root
root2 = new Node(1);
root2.left = new Node(3);
root2.right = new Node(2);
root2.left.left = new Node(7);
root2.left.right = new Node(6);
root2.right.left = new Node(5);
root2.right.right = new Node(4);
 */
areMirrors = (root1, root2) => {
    if (root1 == null && root2 == null) return true;
    if (root1 == null || root2 == null) return false;
    if (root1.val != root2.val) return false;
    return areMirrors(root1.left, root2.right) && areMirrors(root1.right, root2.left);
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
