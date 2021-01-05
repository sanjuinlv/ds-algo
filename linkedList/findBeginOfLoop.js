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

    this.findStartNodeOfLoop = function() {
        let fastPointer =  this.head, slowPointer = this.head;
        let isLoopPresent = false;
        //detec cycle
        while (fastPointer != null && slowPointer != null
            && fastPointer.next != null){
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next.next;
            if (fastPointer === slowPointer) {
                isLoopPresent = true;
                break;
            }
        }
        //reset the slow pointer and start over again
        // 
        if (isLoopPresent) {
            slowPointer = this.head;
            while(slowPointer != fastPointer) {
                slowPointer = slowPointer.next;
                fastPointer = fastPointer.next;
            }
            return slowPointer;
        }
        return null;
    }   

}

