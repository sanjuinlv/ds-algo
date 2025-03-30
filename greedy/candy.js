/* 
135. Candy
https://leetcode.com/problems/candy/description/
Type: Hard

There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.
 
Example 1:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

Example 2:
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
 
Constraints:
 - n == ratings.length
 - 1 <= n <= 2 * 10^4
 - 0 <= ratings[i] <= 2 * 10^4
*/

/**
 * @param {number[]} ratings
 * @return {number}
 */
/* 
Approach: Greedy
Runtime: 10 ms Beats 39.30%
Memory: 61.50 MB Beats 5.37%
*/
var candy = function (ratings) {
  const N = ratings.length;
  let candies = new Array(N).fill(0);
  const findCandy = (i) => {
    // if (i==N-1) return 1;
    //curr rating is more than next rating
    if (candies[i]) return candies[i];
    if (i < N - 1 && ratings[i] > ratings[i + 1]) {
      const nextCandies = findCandy(i + 1);
      let prevCandies = 0;
      if (i > 0 && ratings[i] > ratings[i - 1]) {
        prevCandies = candies[i - 1];
      }
      candies[i] = 1 + Math.max(prevCandies, nextCandies);
    } else {
      //curr rating is more than prev rating
      if (i > 0 && ratings[i] > ratings[i - 1]) {
        candies[i] = 1 + candies[i - 1];
      } else {
        //both neighbor has higer ratings
        candies[i] = 1;
      }
    }
    return candies[i];
  };
  for (let i = 0; i < N; i++) {
    findCandy(i);
  }
  //   console.log(`candies`, candies);
  let totalCandies = 0;
  for (let i = 0; i < N; i++) {
    totalCandies += candies[i];
  }
  return totalCandies;
};

/* 
Approach II: Using two array
Time: O(N)
Space: O(N)

Runtime: 12 ms Beats 25.49%
Memory: 60.37 MB Beats 8.69%
*/
var candy = function (ratings) {
  const N = ratings.length;
  const left = new Array(N).fill(1);
  const right = new Array(N).fill(1);
  left[0] = 1;
  //find max candies required only considering left neighbors
  for (let i = 1; i < N; i++) {
    if (ratings[i] > ratings[i - 1]) left[i] = 1 + left[i - 1];
  }
  right[N - 1] = 1;
  //find max candies required only considering right neighbors
  for (let i = N - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) right[i] = 1 + right[i + 1];
  }
  //max candies required considering left and right neighbors
  let totalCandies = 0;
  for (let i = 0; i < N; i++) {
    totalCandies += Math.max(left[i], right[i]);
  }
  return totalCandies;
};

/*
Approach II: Space optimized of previous

Runtime: 4 ms Beats 87.07%
Memory: 57.44 MB Beats 47.00%
*/
var candy = function (ratings) {
  const N = ratings.length;
  const candies = new Array(N).fill(1);
  candies[0] = 1;
  //find max candies required only considering left neighbors
  for (let i = 1; i < N; i++) {
    if (ratings[i] > ratings[i - 1]) candies[i] = 1 + candies[i - 1];
  }
  //find max candies required only considering right neighbors
  for (let i = N - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      //max of curr candies from left or 1 more candies required at i + 1
      candies[i] = Math.max(candies[i], 1 + candies[i + 1]);
    }
  }
  let totalCandies = 0;
  for (let i = 0; i < N; i++) {
    totalCandies += candies[i];
  }
  return totalCandies;
};

var candy = function (ratings) {
  const N = ratings.length;
  const left = new Array(N).fill(0);
  left[0] = 1;
  //find max candies required only considering left neighbors
  for (let i = 1; i < N; i++) {
    if (ratings[i] > ratings[i - 1]) left[i] = 1 + left[i - 1];
    else left[i] = 1;
  }
  let curr = 1;
  let right = 1;
  let totalCandies = Math.max(1, left[N - 1]);
  //find max candies required only considering right neighbors
  for (let i = N - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) curr = 1 + right;
    else curr = 1;
    right = curr;
    totalCandies += Math.max(curr, left[i]);
  }
  return totalCandies;
};

/*
Approach III: Slope Approach with constant space

Runtime: 1 ms Beats 99.15%
Memory: 58.15 MB Beats 42.86%
*/
var candy = function (ratings) {
  let N = ratings.length;
  let i = 1;
  let sum = 1;
  while (i < N) {
    //if curr and pre ratings are same then we just give one candy
    if (ratings[i] == ratings[i - 1]) {
      sum++;
      i++;
      continue;
    }
    //start with peak as 1, i.e, one candy
    let peak = 1;
    //increasing slope
    while (i < N && ratings[i] > ratings[i - 1]) {
      peak++;
      i++;
      sum += peak;
    }
    //decreasing slope
    let down = 0;
    while (i < N && ratings[i] < ratings[i - 1]) {
      down++;
      i++;
      sum += down;
    }
    down++;
    // once we are done with down slope and down is more then
    // we need to add diff of down and peak
    if (down > peak) sum += down - peak;
  }
  return sum;
};
