/* 
https://leetcode.com/problems/find-the-celebrity/

Suppose you are at a party with n people labeled from 0 to n - 1 and among them, 
there may exist one celebrity. The definition of a celebrity is that all the other
n - 1 people know the celebrity, but the celebrity does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. 
The only thing you are allowed to do is ask questions like: "Hi, A. Do you know B?" 
to get information about whether A knows B. You need to find out the celebrity
 (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function bool knows(a, b) that tells you whether A knows B. 
Implement a function int findCelebrity(n). There will be exactly one celebrity if 
they are at the party.

Return the celebrity's label if there is a celebrity at the party. If there is no celebrity, return -1.
     (0)
     /  \
   (1)--(2)  
Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means
person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j.
The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.

Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
Output: -1
Explanation: There is no celebrity. 
*/
/**
 * Definition for knows()
 *
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
/* 
Approach I: Brute Force
Time: O(N^2)
For each of the n people, we need to check whether or not they are a celebrity.
Checking whether or not somebody is a celebrity requires making 2 API calls for each of
the n−1 other people, for a total of 2*(n−2) calls which is O(N)

So each of the n celebrity checks will cost O(n), giving a total of O(n^2).

Space: O(1)
*/
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    const isCelebrity = (i, n) => {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        //If 'i' knows 'j' or 'j' doesn't know 'i' then 'i' is not celebrity
        if (knows(i, j) || !knows(j, i)) {
          return false;
        }
      }
      return true;
    };

    //check for each person if they are celebrity
    for (let i = 0; i < n; i++) {
      if (isCelebrity(i, n)) return i;
    }
    return -1;
  };
};

/* 
Approach II: Logical deduction
Time: O(N)
Space: O(1)

Runtime: 127 ms, faster than 68.05% of JavaScript online submissions for Find the Celebrity.
Memory Usage: 44.3 MB, less than 88.28% of JavaScript online submissions for Find the Celebrity.
*/
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    const isCelebrity = (i, n) => {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        //If 'i' knows 'j' or 'j' doesn't know 'i' then 'i' is not celebrity
        if (knows(i, j) || !knows(j, i)) {
          return false;
        }
      }
      return true;
    };

    //check for each person if they are celebrity
    let celebrityCandidate = 0;
    for (let i = 0; i < n; i++) {
      //if 'celebrityCandidate' knows 'i' then 'celebrityCandidate' can not be celebrity.
      // So next possible candidate can be 'i'
      if (knows(celebrityCandidate, i)) {
        celebrityCandidate = i;
      }
    }
    if (isCelebrity(celebrityCandidate, n)) return celebrityCandidate;
    return -1;
  };
};

/* 
Approach II: Logical deduction with Caching
Time: O(N)
Space: O(N)

Runtime: 147 ms, faster than 54.71% of JavaScript online submissions for Find the Celebrity.
Memory Usage: 45.3 MB, less than 22.76% of JavaScript online submissions for Find the Celebrity.
*/
function cached(f) {
  const cache = new Map();
  return function (...args) {
    const cacheKey = args.join(",");
    if (!cache.has(cacheKey)) {
      const result = f(...args);
      cache.set(cacheKey, result);
    }
    return cache.get(cacheKey);
  };
}
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  knows = cached(knows);
  return function (n) {
    const isCelebrity = (i, n) => {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        //If 'i' knows 'j' or 'j' doesn't know 'i' then 'i' is not celebrity
        if (knows(i, j) || !knows(j, i)) {
          return false;
        }
      }
      return true;
    };

    //check for each person if they are celebrity
    let celebrityCandidate = 0;
    for (let i = 0; i < n; i++) {
      //if 'celebrityCandidate' knows 'i' then 'celebrityCandidate' can not be celebrity.
      // So next possible candidate can be 'i'
      if (knows(celebrityCandidate, i)) {
        celebrityCandidate = i;
      }
    }
    if (isCelebrity(celebrityCandidate, n)) return celebrityCandidate;
    return -1;
  };
};
