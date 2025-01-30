/* 
547. Number of Provinces
https://leetcode.com/problems/number-of-provinces/description/
Type: Medium

There are n cities. Some of them are connected, while some are not. If city a is connected 
directly with city b, and city b is connected directly with city c, then city a is connected
 indirectly with city c.
A province is a group of directly or indirectly connected cities and no other cities outside
 of the group.
You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the
 jth city are directly connected, and isConnected[i][j] = 0 otherwise.
Return the total number of provinces.

Example 1:
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Example 2:
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3

Constraints:
  *  1 <= n <= 200
  *  n == isConnected.length
  *  n == isConnected[i].length
  *  isConnected[i][j] is 1 or 0.
  *  isConnected[i][i] == 1
  *  isConnected[i][j] == isConnected[j][i]

*/
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
/* 
Approach I: Using UnionFind Rank with path compression
Time: O(N^2*logN), N^2 for 2D array loop and logN for union
Space: O(N)

Runtime: 13 ms Beats 18.31%
Memory Usage: 53.20 MB Beats 26.37%
*/
class RankUF {
  constructor(N) {
    this.root = new Array(N);
    this.rank = new Array(N);
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }

  find(p) {
    if (p == this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) return false;
    // make smaller root point to larger one
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.root[qRoot] = pRoot;
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.root[pRoot] = qRoot;
    } else {
      //height of both tree is same
      this.root[qRoot] = pRoot;
      //increase the height by one of pRoot
      this.rank[pRoot] += 1;
    }
    return true;
  }
}

var findCircleNum = function (isConnected) {
  const m = isConnected.length;
  const n = isConnected[0].length;
  const uf = new RankUF(m);
  //disjoint component size
  let componentSize = m;
  //build rank UF
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < n; j++) {
      if (i == j) continue; //we dont need to connect same city
      if (isConnected[i][j] && uf.union(i, j)) componentSize--;
    }
  }
  return count;
};

/* 
Approach II: DFS

Time: O(N^2), The complete matrix of size N^2 is traversed.
Space: O(N). visited array of size N is used.

Runtime: 1 ms Beats 93.16%
Memory Usage: 51.12 MB Beats 79.59%
*/
var findCircleNum = function (isConnected) {
  const N = isConnected.length;
  let componentSize = 0;
  const visited = new Array(N).fill(false);
  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      dfs(i, isConnected, visited);
      componentSize++;
    }
  }
  return componentSize;
};

function dfs(v, arr, visited) {
  visited[v] = true;
  //check all neighbors of v
  for (let w = 0; w < arr.length; w++) {
    if (!visited[w] && arr[v][w] == 1) {
      dfs(w, arr, visited);
    }
  }
}

/* 
Approach III: BFS

Time: O(N^2), The complete matrix of size N^2 is traversed.
Space: O(N). A queue and visited array of size N is used.

Runtime: 3 ms Beats 62.39%
Memory Usage: 52.13 MB Beats 44.46%
*/
var findCircleNum = function (isConnected) {
  const N = isConnected.length;
  let componentSize = 0;
  const visited = new Array(N).fill(false);
  const queue = [];
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    queue.push(i);
    visited[i] = true;
    while (queue.length) {
      const i = queue.shift();
      //check adjacent nodes
      for (let j = 0; j < N; j++) {
        if (!visited[j] && isConnected[i][j] == 1) {
          queue.push(j);
          visited[j] = true;
        }
      }
    }
    componentSize++;
  }
  return componentSize;
};
