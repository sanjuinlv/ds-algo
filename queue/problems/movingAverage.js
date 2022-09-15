/* 
https://leetcode.com/problems/moving-average-from-data-stream/
Category - Easy

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the MovingAverage class:

MovingAverage(int size) Initializes the object with the size of the window size.
double next(int val) Returns the moving average of the last size values of the stream.


Example 1:

Input
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
Output
[null, 1.0, 5.5, 4.66667, 6.0]

Explanation
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1); // return 1.0 = 1 / 1
movingAverage.next(10); // return 5.5 = (1 + 10) / 2
movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

Constraints:

1 <= size <= 1000
-105 <= val <= 105
At most 104 calls will be made to next.

*/
/* 
Approach I:  Using Queue (Array in case of JS)
Time: O(1)
Space: O(N)
Runtime: 114 ms, faster than 90.69% of JavaScript online submissions for Moving Average from Data Stream.
Memory Usage: 48.2 MB, less than 86.99% of JavaScript online submissions for Moving Average from Data Stream.
*/

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */

/* 
Approach I:  Using Queue (Array in case of JS)
Time: O(1)
Space: O(N)
Runtime: 114 ms, faster than 90.69% of JavaScript online submissions for Moving Average from Data Stream.
Memory Usage: 48.2 MB, less than 86.99% of JavaScript online submissions for Moving Average from Data Stream.
*/
class MovingAverage {
  /**
   * @param {number} size
   */
  constructor(size) {
    this.arr = [];
    this.capacity = size;
    this.size = 0;
    this.sum = 0;
  }

  /**
   * @param {number} val
   * @return {number}
   */

  next(val) {
    if (this.size >= this.capacity) {
      console.log(this.arr);
      const removedItem = this.arr.shift();
      this.sum -= removedItem;
      this.size--;
    }
    this.arr.push(val);
    this.sum += val;
    this.size++;
    return this.sum / this.size;
  }
}

/* 
Approach II: Using circular queue
Time: O(1)
Space: O(N)
Runtime: 172 ms, faster than 42.88% of JavaScript online submissions for Moving Average from Data Stream.
Memory Usage: 48.4 MB, less than 75.57% of JavaScript online submissions for Moving Average from Data Stream.
*/
class MovingAverage {
  /**
   * @param {number} size
   */
  constructor(size) {
    this.queue = new Array(size).fill(0);
    this.size = size;
    this.head = 0;
    this.windowSum = 0;
    this.N = 0;
  }

  /**
   * @param {number} val
   * @return {number}
   */

  next(val) {
    //tail is next to the head and item is removed from tail
    const tail = (this.head + 1) % this.size;
    this.windowSum = this.windowSum - this.queue[tail] + val;
    // move on to the next head and store the value
    this.head = (this.head + 1) % this.size;
    this.queue[this.head] = val;
    this.N++;
    return this.windowSum / Math.min(this.N, this.size);
  }
}
