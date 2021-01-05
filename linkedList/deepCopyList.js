/* 
A linked list is given such that each node contains an additional random pointer which 
could point to any node in the list or null.
Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. 
Each node is represented as a pair of [val, random_index] where:

    val: an integer representing Node.val
    random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.

Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

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
// Reference to correct some logic
// Time complexity: O(N)
// Space complexity: O(N)
/* 
Runtime: 76 ms, 
faster than 87.25% of JavaScript online submissions for Copy List with Random Pointer.
Memory Usage: 40.2 MB, less than 74.70% of JavaScript online submissions for Copy List with Random Pointer.
*/
var copyRandomList = function(head) {
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
    }
    while (current != null) {
        const node = getFromCache(current, nodeMap);
        node.next = getFromCache(current.next, nodeMap);
        node.random = getFromCache(current.random, nodeMap);    
        current = current.next;
    }
    return nodeMap.get(head);
};

// using solution reference
/* 
Runtime: 80 ms
Memory Usage: 40.2 MB
Your runtime beats 66.60 % of javascript submissions.
*/
var copyRandomList = function(head) {
    if (!head) return null;
    let nodeMap = new Map();
    let curr = head;
    //First pass: create node and put it in map
    while (curr != null){
        nodeMap.set(curr, new Node(curr.val));
        curr = curr.next;
    }
    // second pass: create next and random reference
    curr = head;
    while (curr != null){
        const node = nodeMap.get(curr);
        node.next = nodeMap.get(curr.next) || null ;
        node.random = nodeMap.get(curr.random) || null;
        curr = curr.next;
    }
    return nodeMap.get(head);
}