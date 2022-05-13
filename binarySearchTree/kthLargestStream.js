/**
 * @param {number} k
 * @param {number[]} nums
 */

/* 
Approach: Using BST
Runtime: 815 ms, faster than 43.34% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 51 MB, less than 61.39% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
class Node {
  constructor(value, count = 0) {
    this.val = value;
    this.count = count;
    this.left = null;
    this.right = null;
  }
}

var KthLargest = function (k, nums) {
  this.root = null;
  this.k = k;
  for (let num of nums) {
    this.root = this._insert(this.root, num);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  //add to the root
  this.root = this._insert(this.root, val);
  //find rank
  return this._searchKth(this.root, this.k);
};

KthLargest.prototype._insert = function (node, val) {
  if (node === null) return new Node(val, 1);
  if (val < node.val) node.left = this._insert(node.left, val);
  else node.right = this._insert(node.right, val);
  node.count = 1 + this._size(node.left) + this._size(node.right);
  return node;
};

KthLargest.prototype._searchKth = function (node, k) {
  // m = the size of right subtree
  const m = node.right ? this._size(node.right) : 0;
  // root is the m+1 largest node in the BST
  if (k == m + 1) {
    return node.val;
  }
  if (k <= m) {
    return this._searchKth(node.right, k);
  } else {
    return this._searchKth(node.left, k - m - 1);
  }
};

KthLargest.prototype._size = function (node) {
  if (node === null) return 0;
  return node.count;
};
/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
