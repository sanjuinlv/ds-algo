/* 
Given an array of intervals where intervals[i] = [starti, endi], 
merge all overlapping intervals, and return an array of the non-overlapping intervals 
that cover all the intervals in the input.

Example 1: 
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

Example 2: 
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints: 
    - 1 <= intervals.length <= 104
    - intervals[i].length == 2
    - 0 <= starti <= endi <= 104
*/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
/* 
Approach: Sorting
Time Complexity: O(N Log N) (sorting O(N log N) and linear scan of O(N))
Space complexity: O(log N) or O(N) for sorting

intervals = [[0,2],[0,1],[2,7],[8,10],[15,18]]
intervals = [[0,0],[0,0],[2,7],[8,10],[15,18]]
intervals = [[0,0],[0,0],[2,7],[8,10],[15,18]]

Runtime: 100 ms, faster than 39.62% of JavaScript online submissions for Merge Intervals.
Memory Usage: 41.3 MB, less than 33.09% of JavaScript online submissions for Merge Intervals.
*/
var merge = function (intervals) {
  //sort the input by start
  intervals.sort((int1, int2) => int1[0] - int2[0]);
  const map = new Map();
  map.set(0, Array.from(intervals[0])); //keep copy instead of reference
  for (let i = 1; i < intervals.length; i++) {
    //starti < endi-1
    let prevInterval = map.get(i - 1);
    if (intervals[i][0] <= prevInterval[1]) {
      //if current end is greater than previous end then update it
      if (intervals[i][1] > prevInterval[1]) {
        //change the merged interval's end with this end
        prevInterval[1] = intervals[i][1];
      }
      map.set(i, Array.from(prevInterval));
      map.delete(i - 1);
    } else {
      map.set(i, Array.from(intervals[i]));
    }
  }
  return [...map.values()];
};
//solution reference
var merge = function (intervals) {
  //sort the input
  intervals.sort((int1, int2) => int1[0] - int2[0]);
  const merged = [];
  for (let interval of intervals) {
    // if the list of merged interval is empty or if the current
    // interval does not overlap with previous merge interval, just add it
    if (merged.length == 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      //current inverval overlaps with prev merge interval
      //i.e., curr interval's start is less than prev merge interval's end
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      );
    }
  }
  return Array.from(merged);
};

//03-Apr-2022
/* 
Approach: Sorting
Runtime: 115 ms, faster than 81.34% of JavaScript online submissions for Merge Intervals.
Memory Usage: 48.5 MB, less than 87.07% of JavaScript online submissions for Merge Intervals.
*/
var merge = function (intervals) {
  //sort interval by starting values
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  result.push(intervals[0]);
  let j = 0;
  for (let i = 1; i < intervals.length; i++) {
    if (result[j][1] >= intervals[i][0] && result[j][1] <= intervals[i][1]) {
      result[j][1] = intervals[i][1];
    } else if (result[j][1] < intervals[i][0]) {
      result.push(intervals[i]);
      j++;
    }
  }
  return result;
};

/* 
Little cleaner code
Runtime: 187 ms, faster than 23.59% of JavaScript online submissions for Merge Intervals.
Memory Usage: 48.9 MB, less than 72.99% of JavaScript online submissions for Merge Intervals.
*/
var merge = function (intervals) {
  //sort interval by starting values
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const interval of intervals) {
    const resultSize = result.length;
    //result is empty or if the current interval does not overlap with previous interval
    if (resultSize == 0 || result[resultSize - 1][1] < interval[0]) {
      result.push(interval);
    } else {
      //there is overlap, so merge the curr and prev interval
      result[resultSize - 1][1] = Math.max(
        result[resultSize - 1][1],
        interval[1]
      );
    }
  }
  return result;
};
