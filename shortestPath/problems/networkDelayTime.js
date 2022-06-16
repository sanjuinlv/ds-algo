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
  this.edgeTo = new Array(n);
  this.distTo = new Array(n).fill(Infinity);
  this.adjacency = [...Array(n)].map(() => []);
  //1.create adjacency list
  for (let i = 0; i < times.length; i++) {
    this.adjacency[times[i][0]].push(
      new DirectedEdge(times[0], times[1], times[2])
    );
  }
  //2. add source 'k' to PQ with distance 0
};
