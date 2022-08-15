/* 
Approach: Greedy
Time: O(N^2*LogN)
Space: O(N)

This will timeout on large set
*/
var mincostToHireWorkers = function (quality, wage, K) {
  const N = quality.length;
  let minCost = Infinity;
  for (let captain = 0; captain < N; captain++) {
    const captainRatio = wage[captain] / quality[captain];
    const acceptedOffer = [];
    for (let worker = 0; worker < N; worker++) {
      const offeredWage = captainRatio * quality[worker];
      //if the offered wage is more than min wage the offer can be accepted
      if (offeredWage >= wage[worker]) acceptedOffer.push(offeredWage);
    }
    //not enough offer accepted, continue
    if (acceptedOffer.length < K) continue;
    //enough accepted offer. Calculate the total sum for K worker
    acceptedOffer.sort((a, b) => a - b);
    let cost = 0;
    for (let i = 0; i < K; i++) {
      cost += acceptedOffer[i];
    }
    minCost = Math.min(minCost, cost);
  }
  return minCost;
};

/* 
Approach II: Heap
Time: O(NLogN)
Space: O(N)
Runtime: 234 ms, faster than 47.17% of JavaScript online submissions for Minimum Cost to Hire K Workers.
Memory Usage: 60.2 MB, less than 32.08% of JavaScript online submissions for Minimum Cost to Hire K Workers.
*/
var mincostToHireWorkers = function (quality, wage, K) {
  const N = quality.length;
  let workers = new Array(N);
  //create ratio (wage/quality) of each workers
  for (let i = 0; i < N; i++) {
    workers[i] = [wage[i] / quality[i], quality[i]];
  }
  //sort the ratios, in ascending order
  workers.sort((a, b) => a[0] - b[0]);
  const maxPQ = new MaxPriorityQueue();
  let sumHeap = 0;
  //get sum of quality of k smallest element in accepted offer
  for (let i = 0; i < K; i++) {
    maxPQ.enqueue(workers[i][1]);
    //add quality of this worker
    sumHeap += workers[i][1];
  }
  //the first captain can be worker which has k-1 worker less than his ratio
  let captainRatio = workers[K - 1][0];
  //total cost for this captain ration
  let minCost = captainRatio * sumHeap;
  //now check cost by choosing other captain
  for (let i = K; i < N; i++) {
    captainRatio = workers[i][0];
    //try with other workers with lower quality
    if (maxPQ.size() > 0 && maxPQ.front().element > workers[i][1]) {
      //take out the quality of this worker and remove from heap
      sumHeap -= maxPQ.front().element;
      maxPQ.dequeue();
      //add new work quality to the heap and in sumHeap
      maxPQ.enqueue(workers[i][1]);
      sumHeap += workers[i][1];
    }
    //calculate the cost with this worker ration
    const cost = captainRatio * sumHeap;
    minCost = Math.min(minCost, cost);
  }
  return minCost;
};
