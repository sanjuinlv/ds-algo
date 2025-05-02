/*

703. Kth Largest Element in a Stream
https://leetcode.com/problems/kth-largest-element-in-a-stream/
Type: Easy

Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.
Implement KthLargest class:
    - KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
    - int add(int val) Returns the element representing the kth largest element in the stream.
Example:
    Input
    ["KthLargest", "add", "add", "add", "add", "add"]
    [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
    Output
    [null, 4, 5, 5, 8, 8]

    Explanation
    KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    kthLargest.add(3);   // return 4
    kthLargest.add(5);   // return 5
    kthLargest.add(10);  // return 5
    kthLargest.add(9);   // return 8
    kthLargest.add(4);   // return 8

Constraint:
    1 <= k <= 104
    0 <= nums.length <= 104
    -104 <= nums[i] <= 104
    -104 <= val <= 104
    At most 104 calls will be made to add.
*/

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// Using class syntax
/* 
Runtime: 168 ms, faster than 75.07% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 49.1 MB, less than 6.23% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
/**
 * @param {number} k
 * @param {number[]} nums
 */
class KthLargest {
    constructor(k, nums) {
        this.items = [];
        this.n = 0;
        this.maxSize = k;
        // create the heap from the data
        for (let i = 0; i < nums.length; i++) {
            this.add(nums[i]);
        }
    }

    add(val) {
        if (this.n >= this.maxSize && val < this.root()) return this.root();
        // add at the end
        this.items[++this.n] = val;
        // swim it up
        this.swim(this.n);
        // if heap size is greater than allowed size them remove the min item
        if (this.n > this.maxSize) {
            this.deleteMin();
        }
        return this.root();;
    }

    root() {
        return this.items[1];
    }

    // APIs
    swim(k) {
        while (k > 1 && this.greater(parseInt(k / 2), k)) {
            this.swap(k, parseInt(k / 2));
            k = parseInt(k / 2);
        }
    }

    deleteMin() {
        const max = this.items[1];
        // move last item at 1st position
        this.items[1] = this.items[this.n];
        // set the last item reference to null
        // optionally, we can retain the deleted items for sorting the array, if we want
        this.items[this.n] = null;
        this.n--;
        //sink the item
        this.sink(1);
        return max;
    }

    sink(k) {
        while (2 * k <= this.n) {
            let j = 2 * k;
            //find the max of the child
            if (j < this.n && this.greater(j, j + 1)) j++;
            // if the parent is not less than the max of the child node then stop 
            // sinking as heap is ordered now
            if (!this.greater(k, j)) break;
            // swap the parent with max of the child
            this.swap(k, j);
            k = j;
        }
    }

    greater(a, b) {
        return this.items[a] > this.items[b];
    }

    swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
};