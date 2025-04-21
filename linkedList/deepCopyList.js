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
Approach I: One pass
Create copy node while going through the nodes
Time: O(N)
Space; O(N)

Runtime: 46 ms Beats 47.41%
Memory: 55.12 MB Beats 71.00%
*/
var copyRandomList = function (head) {
  const clone = new _Node();
  let curr = clone;
  const nodeMap = new Map();
  while (head != null) {
    //Node creation
    if (!nodeMap.has(head)) {
      const newNode = new _Node(head.val);
      nodeMap.set(head, newNode);
      curr.next = newNode;
    } else curr.next = nodeMap.get(head);
    //node next pointer
    if (head.next != null) {
      if (!nodeMap.has(head.next)) {
        const newNode = new _Node(head.next.val);
        nodeMap.set(head.next, newNode);
        curr.next.next = newNode;
      } else curr.next.next = nodeMap.get(head.next);
    }
    //node's random pointer
    if (head.random != null) {
      if (!nodeMap.has(head.random)) {
        const newNode = new _Node(head.random.val);
        nodeMap.set(head.random, newNode);
        curr.next.random = newNode;
      } else curr.next.random = nodeMap.get(head.random);
    }
    head = head.next;
    curr = curr.next;
  }
  return clone.next;
};

/* 
Approach II: two pass (cleaner code)

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

/* 
Approach III: 
Runtime: 76 ms, 
faster than 87.25% of JavaScript online submissions for Copy List with Random Pointer.
Memory Usage: 40.2 MB, less than 74.70% of JavaScript online submissions for Copy List with Random Pointer.
*/
var copyRandomList = function (head) {
  console.log(head);
  let current = head;
  let nodeMap = new Map();
  const getFromCache = (key, map) => {
    if (key) {
      if (map.has(key)) return map.get(key);
      const node = new Node(key.val, null, null);
      map.set(key, node);
      return node;
    }
    return null;
  };
  while (current != null) {
    const node = getFromCache(current, nodeMap);
    node.next = getFromCache(current.next, nodeMap);
    node.random = getFromCache(current.random, nodeMap);
    current = current.next;
  }
  return nodeMap.get(head);
};
