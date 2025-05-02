/* 
295. Find Median from Data Stream
https://leetcode.com/problems/find-median-from-data-stream/
Type: Hard

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 
Example 1:
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:
 - -10^5 <= num <= 10^5
 - There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.
 
Follow up:
 - If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
 - If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
*/
/*
Approach I: Using Priorty Queue
Time: O(5*logn)+O(1) ≈ O(logn).
 - At worst, there are three heap insertions and two heap deletions from the top. Each of these takes about O(logn) time.
 - Finding the median takes constant O(1) time since the tops of heaps are directly accessible.
Space: O(n) linear space to hold input in containers.

Runtime: 150 ms Beats 40.00%
Memory: 93.28 MB Beats 6.29%
 */
var MedianFinder = function () {
  //maxPQ will hold the first half of sorted numbers
  this.maxPQ = new MaxPriorityQueue();
  //maxPQ will hold the second half of sorted numbers
  this.minPQ = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  //add the num to max heap
  this.maxPQ.enqueue(num);
  //add top of max heap to the min heap
  this.minPQ.enqueue(this.maxPQ.front());
  //balancing act: remove the top of max heap
  this.maxPQ.dequeue();
  //ensure that max heap has more element than min heap
  if (this.maxPQ.size() < this.minPQ.size()) {
    //add top of minPQ to maxPQ
    this.maxPQ.enqueue(this.minPQ.front());
    //remove the top of minPQ
    this.minPQ.dequeue();
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  return this.maxPQ.size() > this.minPQ.size()
    ? this.maxPQ.front()
    : parseInt(this.maxPQ.front() + this.minPQ.front()) * 0.5;
};

/* 
Approach : Using buckets

Runtime: 223 ms Beats 19.75%
Memory: 86.14 MB Beats 98.91%
*/
/* 
Solution link: https://leetcode.com/problems/find-median-from-data-stream/solutions/74057/Tired-of-TWO-HEAPSET-solutions-See-this-segment-dividing-solution-(c++)/

The idea of dividing existing numbers into several ranges:
Say we already have 10k numbers in vector, 
each time adding a number requires sorting all 10k numbers, which is slow.

To optimize, we can store 10k numbers in several (say 10) vectors, 
and nums in each vector are sorted.

Then each time we add a number, just need to find one vector with correct range,
insert the number and sort this vector only. Since its size is relatively small, it's fast.

When we have a vector's size greater than a threshold, just split it into two halfs.   
*/

class MedianFinder {
  constructor() {
    // List of sorted arrays (ranges)
    this.raid = [[]];
    this.totalSize = 0;
  }
  addNum(num) {
    let targetIndex = 0;
    let correctRange = null;
    // find the correct range to insert given num
    for (let i = 0; i < this.raid.length; i++) {
      let range = this.raid[i];
      if (
        this.raid.length === 1 ||
        (i === 0 && num <= range[range.length - 1]) ||
        (i === this.raid.length - 1 && num >= range[0]) ||
        (range[0] <= num && num <= range[range.length - 1]) ||
        (num > range[range.length - 1] && num < this.raid[i + 1]?.[0])
      ) {
        correctRange = range;
        targetIndex = i;
        break;
      }
    }

    // Insert number and sort the correct range
    correctRange.push(num);
    correctRange.sort((a, b) => a - b);
    this.totalSize++;
    // If range exceeds threshold, split into two halves and add them back to this.raid
    const maxSize = 30;
    if (correctRange.length > maxSize) {
      const mid = Math.floor(correctRange.length / 2);
      const half1 = correctRange.slice(0, mid);
      const half2 = correctRange.slice(mid);
      this.raid.splice(targetIndex, 1, half1, half2);
    }
  }

  findMedian() {
    if (this.totalSize === 0) return 0;
    const mid1 = Math.floor((this.totalSize - 1) / 2);
    const mid2 = Math.floor(this.totalSize / 2);
    let count = 0;
    let first, second;
    for (const range of this.raid) {
      if (count <= mid1 && mid1 < count + range.length) {
        first = range[mid1 - count];
      }
      if (count <= mid2 && mid2 < count + range.length) {
        second = range[mid2 - count];
        break;
      }
      count += range.length;
    }
    return (first + second) / 2;
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
