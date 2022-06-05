/*
There are n people in a social group labeled from 0 to n - 1. You are given an array logs where logs[i] = [timestampi, xi, yi] indicates that xi and yi will be friends at the time timestampi.

Friendship is symmetric. That means if a is friends with b, then b is friends with a. Also, person a is acquainted with a person b if a is friends with b, or a is a friend of someone acquainted with b.

Return the earliest time for which every person became acquainted with every other person. If there is no such earliest time, return -1.

 

Example 1:

Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6
Output: 20190301
Explanation: 
The first event occurs at timestamp = 20190101 and after 0 and 1 become friends we have the following friendship groups [0,1], [2], [3], [4], [5].
The second event occurs at timestamp = 20190104 and after 3 and 4 become friends we have the following friendship groups [0,1], [2], [3,4], [5].
The third event occurs at timestamp = 20190107 and after 2 and 3 become friends we have the following friendship groups [0,1], [2,3,4], [5].
The fourth event occurs at timestamp = 20190211 and after 1 and 5 become friends we have the following friendship groups [0,1,5], [2,3,4].
The fifth event occurs at timestamp = 20190224 and as 2 and 4 are already friends anything happens.
The sixth event occurs at timestamp = 20190301 and after 0 and 3 become friends we have that all become friends.
Example 2:

Input: logs = [[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]], n = 4
Output: 3
 

Constraints:

2 <= n <= 100
1 <= logs.length <= 104
logs[i].length == 3
0 <= timestampi <= 109
0 <= xi, yi <= n - 1
xi != yi
All the values timestampi are unique.
All the pairs (xi, yi) occur at most one time in the input.
 */
/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
/* 
Approach I: Union find
Let N be number of people and M be the number of log
Time: O(M Log M + N + M * α(N)) - Sorting: O(M Log M), O(N) to initialize the Union Find, M * α(N) for union (with find())
Space: O(N + N) or O(N + Log M) base on sort implementation

Runtime: 97 ms, faster than 50.67% of JavaScript online submissions for The Earliest Moment When Everyone Become Friends.
Memory Usage: 44.3 MB, less than 90.00% of JavaScript online submissions for The Earliest Moment When Everyone Become Friends.
*/
class UnionFind {
  constructor(n) {
    this.root = new Array(n);
    this.rank = new Array(n);

    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = i;
    }
  }

  find(x) {
    if (x == this.root[x]) return x;
    return (this.root[x] = this.find(this.root[x]));
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }

  union(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);
    if (xRoot === yRoot) return false;
    if (this.rank[xRoot] > this.rank[yRoot]) {
      this.root[yRoot] = xRoot;
    } else if (this.rank[xRoot] < this.rank[yRoot]) {
      this.root[xRoot] = yRoot;
    } else {
      //height of both tree is same
      this.root[yRoot] = xRoot;
      //increase the xRoot node height by one
      this.rank[xRoot] += 1;
    }
    return true;
  }
}

var earliestAcq = function (logs, n) {
  logs.sort((a, b) => a[0] - b[0]);
  // Initially, we treat each individual as a separate group.
  let connectedComponents = n;
  const uf = new UnionFind(n);
  for (const log of logs) {
    if (uf.union(log[1], log[2])) connectedComponents--;
    // Everyone is now connected to each other
    if (connectedComponents == 1) return log[0];
  }
  return -1;
};
