/* 
1046. Last Stone Weight
https://leetcode.com/problems/last-stone-weight/
Type: Easy

You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.

 

Example 1:

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
Example 2:

Input: stones = [1]
Output: 1
 

Constraints:

1 <= stones.length <= 30
1 <= stones[i] <= 1000
*/
/**
 * @param {number[]} stones
 * @return {number}
 */
/*
Approach I: Sorting the array 
Time: O(N * NlogN) = O(N^2)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory: 54.38 MB Beats 82.94%
*/
var lastStoneWeight = function (stones) {
  if (stones.length == 0) return 0;
  //sort the stones by size in ascending order
  stones.sort((a, b) => a - b);
  while (stones.length > 1) {
    const largest = stones.pop();
    const secondLargest = stones.pop();
    //smash the stone
    const remainWeight = largest - secondLargest;
    //push if the resulting stones weight is not zero
    if (remainWeight > 0) {
      stones.push(remainWeight);
      stones.sort((a, b) => a - b);
    }
  }
  return stones.length ? stones[0] : 0;
};

/*
Approach II: Heap (Max Priority Queue)
Time: O(NLogN)
Space: O(N)

Runtime: 6 ms Beats 33.70%
Memory: 55.73 MB Beats 41.95%
*/
var lastStoneWeight = function (stones) {
  if (stones.length == 0) return 0;
  const minPQ = new MaxPriorityQueue();
  //add all stones to the queue;
  for (const stone of stones) {
    minPQ.enqueue(stone);
  }
  while (minPQ.size() > 1) {
    //remove last two stones
    const largest = minPQ.dequeue();
    const secondLargest = minPQ.dequeue();
    //smash the stone
    const remainWeight = largest - secondLargest;
    //push if the resulting stones weight is not zero
    if (remainWeight > 0) {
      minPQ.enqueue(remainWeight);
    }
  }
  return minPQ.size() > 0 ? minPQ.front() : 0;
};
