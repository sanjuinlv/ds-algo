/* 
138. Copy List with Random Pointer
https://leetcode.com/problems/copy-list-with-random-pointer/
Type: Medium

A linked list is given such that each node contains an additional random pointer which 
could point to any node in the list or null.
Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. 
Each node is represented as a pair of [val, random_index] where:

    val: an integer representing Node.val
    random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.

Example 1:    
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Input: head = []
Output: []
Explanation: Given linked list is empty (null pointer), so return null.
*/
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
/* 
Approach I: One pass with node copy

Runtime: 49 ms Beats 27.88%
Memory Usage: 55.28 MB Beats 69.76%
*/
var copyRandomList = function (head) {
  let current = head;
  let nodeMap = new Map();
  const getFromCache = (key, map) => {
    if (key == null) return null;
    if (!map.has(key)) map.set(key, new Node(key.val));
    return map.get(key);
  };
  while (current != null) {
    const node = getFromCache(current, nodeMap);
    node.next = getFromCache(current.next, nodeMap);
    node.random = getFromCache(current.random, nodeMap);
    current = current.next;
  }
  return nodeMap.get(head);
};

/* 
Approach II: One pass with dummy node
Runtime: 50 ms Beats 23.17%
Memory: 55.36 MB Beats 63.44%
*/
var copyRandomList = function (head) {
  let dummy = new _Node();
  copy = dummy;
  let curr = head;
  const nodeMap = new Map();
  const createOrGetNode = (node) => {
    if (node == null) return null;
    if (!nodeMap.has(node)) nodeMap.set(node, new _Node(node.val));
    return nodeMap.get(node);
  };
  while (curr != null) {
    copy.next = createOrGetNode(curr);
    copy.next.next = createOrGetNode(curr.next);
    copy.next.random = createOrGetNode(curr.random);
    curr = curr.next;
    copy = copy.next;
  }
  return dummy.next;
};

/* 
Approach III: two pass (cleaner code)

Runtime: 42 ms Beats 69.33%
Memory Usage: 55.41 MB Beats 50.92% 
*/
var copyRandomList = function (head) {
  const nodeMap = new Map();
  let curr = head;
  //First pass: create all nodes without connection
  while (curr != null) {
    nodeMap.set(curr, new _Node(curr.val));
    curr = curr.next;
  }

  //Second pass: Connect all nodes properly
  curr = head;
  while (curr != null) {
    const node = nodeMap.get(curr);
    node.next = curr.next ? nodeMap.get(curr.next) : null;
    node.random = curr.random ? nodeMap.get(curr.random) : null;
    curr = curr.next;
  }
  return nodeMap.get(head);
};