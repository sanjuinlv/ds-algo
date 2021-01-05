/* 
Type: Easy/Medium
Given a singly linked list, determine if it is a palindrome.

Example 1:
Input: 1->2
Output: false

Example 2:
Input: 1->2->2->1
Output: true

Could you do it in O(n) time and O(1) space?
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
/* 
Time complexity: O(N)
Space complexit: O(1)
Runtime: 76 ms, faster than 97.09% of JavaScript online submissions for Palindrome Linked List.
Memory Usage: 41.6 MB, less than 83.53% of JavaScript online submissions for Palindrome Linked List.
*/
//Ideally we should re-store the second part which was reversed
var isPalindrome = function(head) {
    if (!head) return true;
    let slow = head, fast = head;
    while (fast != null && fast.next != null){
        slow = slow.next;
        fast = fast.next.next;
    }
    // revser the second part
    let prev= null, curr = slow, temp;
    while(curr != null){
        temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }
    //compare the first and second part
    let first = head, second = prev;
    while(second != null){
        if (first.val != second.val) return false;
        first = first.next;
        second = second.next;
    }
    return true;
};

//Solution reference
//recursive approach

/* 
2nd try (2-Jan-21)
Could you do it in O(n) time and O(1) space?
Time complexity: O(N)
Space complexity: O(1)
Runtime: 100 ms, faster than 18.82% of JavaScript online submissions for Palindrome Linked List.
Memory Usage: 41.5 MB, less than 81.23% of JavaScript online submissions for Palindrome Linked List.
*/
var isPalindrome = function(head) {
  const reverseList = (head) => {
    let reversedHead = null;
    while(head != null){
        let newHead = head;
        head = head.next;
        newHead.next = reversedHead;
        reversedHead = newHead;
    }        
    return reversedHead;
  }  
  //1. find the middle of the linked list
  let first = head; // fast pointer
  let second = head; // slow pointer (middle of list)
  while(first != null && first.next != null){
    second = second.next;
    first = first.next.next;
  }
  //2: reverse the other half of the linked list
  second = reverseList(second);
  let reversedHead = second;
  //3. compare the two part
  first = head;
  let palindrome = true;
  while(second != null){
    if (first.val != second.val) {
        palindrome = false;
        break;
    }
    first = first.next;
    second = second.next;
  }
  //4. restore the reversed part  
  reverseList(reversedHead);
  console.log(head);
  return palindrome;
};

