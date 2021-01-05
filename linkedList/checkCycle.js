/* 
Check whether the the given list either NULL-terminated of ends in a cycle
Approach:  we can solve this problem using Floyd soltion which usage two pointers which walks
at different speed. Slow pointer moevs one step while fast pointer moves two steps at a time. 
If list contains loop the fast pointer will catch up slow pointer.
*/
// Linked List with method to detect loop
// test data:
// list = new LinkedList()
// list.insert(20); list.insert(4); list.insert(15); list.insert(10)
// list.head.next.next.next.next = list.head
function LinkedList(){
    this.head = null;

    function Node(data) {
        this.data = data;
        this.next = null;
    }

    /* Inserts a new Node at front of the list. */
    this.insert = function(data){
        const newNode = new Node(data);
        const temp = this.head;
        newNode.next = temp;
        this.head = newNode;
    }

    this.detectCycle = function() {
        let fastPointer =  this.head, slowPointer = this.head;
        while (fastPointer != null && slowPointer != null
            && fastPointer.next != null){
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next.next;
            if (fastPointer === slowPointer) return true;
        }
        return false;
    }   
}

