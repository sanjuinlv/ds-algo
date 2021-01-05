/**
 * Find the nth node from the end of the list
 * @param {*} head 
 * @param {*} nthNode 
 */
/* 
Solution: Use two pointer pNthNode & pTemp. 
Initially both pointer points to head. 
pNthNode starts moving once pTemp has made n moves. 
From there both starts moving together until pTemp reaches end of the list. 
As a result pNthNode points to the nth node from end.
 */
function findNthNode(head, nthNode) {
    if (head == null) return null;
    let pTemp = head, pNthNode = head;
    let count = 0;
    while (pTemp != null){
        count++;
        if (nthNode - count < 0) pNthNode = pNthNode.next;
        pTemp = pTemp.next;
    }   
    console.log(`count: ${count}`);
    console.log(pNthNode);
    if (count >= nthNode) return pNthNode;
    return null;
}