/* 
743. Network Delay Time
https://leetcode.com/problems/network-delay-time/editorial/
Type: Medium

You are given a network of n nodes, labeled from 1 to n. You are also given times,
a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the 
source node, vi is the target node, and wi is the time it takes for a signal to travel
from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the
n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal,
return -1.

Example 1:
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2

Example 2:
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1

Example 3:
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
*/
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
/* 
Approach: Dijkstra Algorithm
Time: O(N + E LogN)
Dijkstra's Algorithm takesO(ElogN). Finding the minimum time required O(N).
The maximum number of vertices that could be added to the priority queue is E. Thus, push and pop operations on the priority queue take O(logE) time. The value of E can be at most N⋅(N−1). Therefore, O(logE) is equivalent to O(logN^2) which in turn equivalent to O(2⋅logN). Hence, the time complexity for priority queue operations equals O(logN).

Although the number of vertices in the priority queue could be equal to E, we will only visit each vertex only once. If we encounter a vertex for the second time, the ncurrNodeTime will be greater than signalReceivedAt[currNode], and we can continue to the next vertex in the priority queue. Hence, in total E edges will be traversed and for each edge, there could be one priority queue insertion operation.

Hence, the time complexity is equal toO(N+ElogN).
Space: O(N+E)
Building the adjacency list will take O(E)space. Dijkstra's algorithm takes O(E)space for priority queue because each vertex could be added to the priority queue N−1 time which makes it N*(N−1) and O(N^2)is equivalent to O(E). signalReceivedAt takes O(N)space.

Rx`untime: 104 ms Beats 81.44%
Memory: 69.95 MB Beats 5.02%
*/
class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.edgeWeight = weight;
  }
  from() {
    return this.v;
  }
  to() {
    return this.w;
  }
  get weight() {
    return this.edgeWeight;
  }
}

class EdgeWeightedGraph {
  constructor(n) {
    this.adj = new Array(n);
    this.V = n;
    this.init();
  }
  init() {
    for (let i = 1; i <= this.V; i++) {
      this.adj[i] = [];
    }
  }
  addEdge(v, w, weight) {
    const e = new Edge(v, w, weight);
    this.adj[v].push(e);
  }
  adjacency(v) {
    return this.adj[v];
  }
}
var networkDelayTime = function (times, n, k) {
  const G = new EdgeWeightedGraph(n);
  //create graph
  for (let time of times) {
    G.addEdge(time[0], time[1], time[2]);
  }
  this.distTo = new Array(n + 1).fill(Infinity);
  this.distTo[k] = 0;
  this.pq = new PriorityQueue((a, b) => {
    return a.dist - b.dist;
  });
  //compute the shortes distance from node k to each nodes
  this.compute = (pq, k) => {
    //add source 'k' to PQ with distance 0
    pq.enqueue({ node: k, dist: 0 });
    while (pq.size() > 0) {
      const entry = pq.dequeue();
      for (let edge of G.adjacency(entry.node)) {
        this.relax(edge, pq);
      }
    }
  };
  //relax edge
  this.relax = (edge, pq) => {
    const v = edge.from();
    const w = edge.to();
    if (this.distTo[w] > this.distTo[v] + edge.weight) {
      this.distTo[w] = this.distTo[v] + edge.weight;
      //there is no way to decrease key so try enqueue
      pq.enqueue({ node: w, dist: this.distTo[w] });
    }
  };
  //compute the shortest path to each node from node k
  this.compute(this.pq, k);
  //find the longest path to reach a node
  let maxTime = -Infinity;
  for (let i = 1; i <= n; i++) {
    maxTime = Math.max(maxTime, this.distTo[i]);
  }
  return maxTime == Infinity ? -1 : maxTime;
};
