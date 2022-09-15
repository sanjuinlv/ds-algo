/* 
https://leetcode.com/problems/smallest-string-with-swaps/
Category - Medium 

You are given a string s, and an array of pairs of indices in the string pairs
where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.
Return the lexicographically smallest string that s can be changed to after using the swaps.

Example 1:

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"

Example 2:

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explanation: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"

Example 3:

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explanation: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
 

Constraints:

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s only contains lower case English letters.
*/
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */

/*
Approach: Union Find
Time: O((E+V)⋅α(V)+VlogV)
The amortized time complexity for each union-find operation is O(α(V)), 
where α is The Inverse Ackermann Function, this is because we have used union by rank
as well as path compression in the DSU implementation.

We iterate over each pair and perform the union, which takes O(E⋅α(V)) time. 
Then iterating over each vertex and performing the find operation will take
O(V⋅α(V)) time.
Additionally, we are sorting the list indices and characters for each component.
In the worst case, we can have a connected graph with a single component, and sorting
two lists of size VV will take O(VlogV) time.

Hence, the total time complexity is O((E+V)⋅α(V)+VlogV).

Space: O(V)
The size of lists root, rank in DSU is V. The HashMap rootToComponent will contain all
the vertices and hence will take O(V) space. In the worst case, the lists indices and
characters can take O(V) space.
Sorting can take LogV space. So space complexity is O(V) 

Runtime: 338 ms, faster than 63.36% of JavaScript online submissions for Smallest String With Swaps.
Memory Usage: 82.4 MB, less than 54.04% of JavaScript online submissions for Smallest String With Swaps.
 */
class UF {
  constructor(N) {
    this.root = new Array(N);
    this.rank = new Array(N).fill(1);
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    if (p === this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return false;
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.root[qRoot] = pRoot;
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.root[pRoot] = qRoot;
    } else {
      this.root[qRoot] = pRoot;
      this.rank[pRoot] += 1;
    }
    return true;
  }
}
var smallestStringWithSwaps = function (s, pairs) {
  const N = s.length;
  const uf = new UF(N);
  //iterate over edges and create the connected component
  for (const pair of pairs) {
    uf.union(pair[0], pair[1]);
  }

  const rootToComponents = new Map();
  // Group the vertices that are in the same component
  for (let vertex = 0; vertex < N; vertex++) {
    const root = uf.find(vertex);
    if (!rootToComponents.has(root)) {
      rootToComponents.set(root, []);
    }
    rootToComponents.get(root).push(vertex);
  }
  //   console.log(rootToComponents);
  const smallestString = new Array(N);
  for (let indices of rootToComponents.values()) {
    // console.log(`indices: ${indices}`);
    const chars = [];
    for (let index of indices) {
      chars.push(s[index]);
    }
    //sort the char array
    chars.sort();
    // console.log(`sorted chars: ${chars}`);
    //store the sorted characters
    for (let i = 0; i < indices.length; i++) {
      smallestString[indices[i]] = chars[i];
    }
  }
  return smallestString.join("");
};

/*
Approach II: DFS

Time: O(E + VLogV)
Space: O(E + V)

Runtime: 591 ms, faster than 39.13% of JavaScript online submissions for Smallest String With Swaps.
Memory Usage: 115.8 MB, less than 15.53% of JavaScript online submissions for Smallest String With Swaps.
 */
var smallestStringWithSwaps = function (s, pairs) {
  const N = s.length;
  //1. create adjacency list
  const adj = [...Array(N)].map(() => []);
  for (const pair of pairs) {
    const [v, w] = pair;
    adj[v].push(w);
    adj[w].push(v);
  }
  const dfs = (v, parent) => {
    visited[v] = true;
    componentMap.get(parent).push(v);
    for (let w of adj[v]) {
      if (!visited[w]) dfs(w, parent);
    }
  };
  //2. perform DFS and create component list
  const componentMap = new Map();
  const visited = new Array(N).fill(false);
  for (let v = 0; v < N; v++) {
    if (!visited[v]) {
      componentMap.set(v, []);
      dfs(v, v);
    }
  }
  const smallestString = new Array(N);
  for (let indices of componentMap.values()) {
    const chars = [];
    for (let index of indices) {
      chars.push(s[index]);
    }
    //sort the char array
    chars.sort();
    indices.sort((a, b) => a - b);
    //store the sorted characters
    for (let i = 0; i < indices.length; i++) {
      smallestString[indices[i]] = chars[i];
    }
  }
  return smallestString.join("");
};

/* 
DFS II:

Runtime: 564 ms, faster than 38.65% of JavaScript online submissions for Smallest String With Swaps.
Memory Usage: 114.7 MB, less than 16.56% of JavaScript online submissions for Smallest String With Swaps.
*/
var smallestStringWithSwaps = function (s, pairs) {
  const N = s.length;
  //1. create adjacency list
  const adj = [...Array(N)].map(() => []);
  for (const pair of pairs) {
    const [v, w] = pair;
    adj[v].push(w);
    adj[w].push(v);
  }
  const dfs = (v, chars, indices) => {
    visited[v] = true;
    chars.push(s[v]);
    indices.push(v);
    for (let w of adj[v]) {
      if (!visited[w]) dfs(w, chars, indices);
    }
  };
  //2. perform DFS and create component list
  const smallestString = new Array(N);
  const visited = new Array(N).fill(false);
  for (let v = 0; v < N; v++) {
    if (!visited[v]) {
      const chars = [];
      const indices = [];
      dfs(v, chars, indices);
      chars.sort();
      indices.sort((a, b) => a - b);
      for (let i = 0; i < indices.length; i++) {
        smallestString[indices[i]] = chars[i];
      }
    }
  }
  return smallestString.join("");
};
