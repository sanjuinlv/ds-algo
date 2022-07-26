/* 
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
*/
class DirectedEdge {
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
  weight() {
    return this.edgeWeight;
  }
}

var networkDelayTime = function (times, n, k) {
  //TODO: why are we using n+1 instead of n?
  const edgeTo = new Array(n + 1);
  const distTo = new Array(n + 1).fill(Infinity);
  const adjacency = [...Array(n + 1)].map(() => []);
  for (const time of times) {
    adjacency[time[0]].push(new DirectedEdge(time[0], time[1], time[2]));
  }
  //2. add source 'k' to PQ with distance 0
  const pq = new MinPriorityQueue({
    compare: (a, b) => {
      return a.dist - b.dist;
    },
  });
  distTo[k] = 0;

  const compute = (pq, k) => {
    pq.enqueue({ node: k, dist: 0 });
    while (pq.size() > 0) {
      const entry = pq.dequeue();
      // console.log(`entry: ${JSON.stringify(entry)}`);
      const v = entry.node;
      for (let e of adjacency[v]) {
        relax(e);
      }
    }
  };

  const relax = (e) => {
    const v = e.from();
    const w = e.to();
    if (distTo[w] > distTo[v] + e.weight()) {
      distTo[w] = distTo[v] + e.weight();
      edgeTo[w] = e;
      //update PQ
      //there is no way to decrease key so try enqueue
      pq.enqueue({ node: w, dist: distTo[w] });
    }
  };

  compute(pq, k);
  //find the max distance
  let maxDistance = -Infinity;
  for (let i = 1; i <= n; i++) {
    maxDistance = Math.max(maxDistance, distTo[i]);
  }
  return maxDistance === Infinity ? -1 : maxDistance;
};
