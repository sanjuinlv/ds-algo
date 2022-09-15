/* 
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

Runtime: 82 ms, faster than 75.35% of JavaScript online submissions for Number of Provinces.
Memory Usage: 45.1 MB, less than 38.58% of JavaScript online submissions for Number of Provinces.
*/
var findCircleNum = function (isConnected) {
  this.N = isConnected.length;
  this.root = new Array(this.N);
  this.rank = new Array(this.N);
  //disjoint component size
  this.componentSize = this.N;

  for (let i = 0; i < this.N; i++) {
    this.root[i] = i;
    this.rank[i] = 1;
  }

  this.find = (p) => {
    if (p === this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  };

  this.union = (p, q) => {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) return false;
    //two points will be connected so reduce the disjoint component size
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
  };

  //build rank UF
  for (let i = 0; i < this.N; i++) {
    for (let j = 0; j < this.N; j++) {
      if (i === j) continue;
      if (isConnected[i][j] === 1 && this.union(i, j)) this.componentSize--;
    }
  }
  return this.componentSize;
};
/* 
Approach II: DFS

Time: O(N^2), The complete matrix of size N^2 is traversed.
Space: O(N). visited array of size N is used.

Runtime: 78 ms, faster than 81.53% of JavaScript online submissions for Number of Provinces.
Memory Usage: 45 MB, less than 41.96% of JavaScript online submissions for Number of Provinces.
*/
var findCircleNum = function (isConnected) {
  const dfs = (i, M, visited) => {
    for (let j = 0; j < M.length; j++) {
      if (!visited[j] && M[i][j] === 1) {
        visited[j] = true;
        dfs(j, M, visited);
      }
    }
  };

  const visited = new Array(isConnected.length).fill(false);
  let count = 0;
  for (let i = 0; i < isConnected.length; i++) {
    if (!visited[i]) {
      dfs(i, isConnected, visited);
      count++;
    }
  }
  return count;
};

/* 
Approach III: BFS

Time: O(N^2), The complete matrix of size N^2 is traversed.
Space: O(N). A queue and visited array of size N is used.

Runtime: 120 ms, faster than 26.88% of JavaScript online submissions for Number of Provinces.
Memory Usage: 44.7 MB, less than 63.15% of JavaScript online submissions for Number of Provinces.
*/
var findCircleNum = function (isConnected) {
  const N = isConnected.length;
  const visited = new Array(isConnected.length).fill(false);
  let count = 0;
  const Q = [];
  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      Q.push(i);
      while (Q.length) {
        const s = Q.shift();
        visited[s] = true;
        for (let j = 0; j < N; j++) {
          if (M[s][j] == 1 && !visited[j]) {
            Q.push(j);
          }
        }
      }
      count++;
    }
  }
  return count;
};

/* 
Approach III: BFS (With visited correction)

Runtime: 78 ms, faster than 81.53% of JavaScript online submissions for Number of Provinces.
Memory Usage: 44.4 MB, less than 82.77% of JavaScript online submissions for Number of Provinces.
*/
var findCircleNum = function (isConnected) {
  const N = isConnected.length;
  const visited = new Array(isConnected.length).fill(false);
  let count = 0;
  const Q = [];
  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      Q.push(i);
      while (Q.length) {
        const s = Q.shift();
        for (let j = 0; j < N; j++) {
          if (isConnected[s][j] == 1 && !visited[j]) {
            visited[j] = true;
            Q.push(j);
          }
        }
      }
      count++;
    }
  }
  return count;
};
