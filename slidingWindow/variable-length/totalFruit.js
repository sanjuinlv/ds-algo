/*
904. Fruit Into Baskets
https://leetcode.com/problems/fruit-into-baskets/
Type - Medium

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.

Example 1:
  Input: fruits = [1,2,1]
  Output: 3
  Explanation: We can pick from all 3 trees.

Example 2:
  Input: fruits = [0,1,2,2]
  Output: 3
  Explanation: We can pick from trees [1,2,2].
  If we had started at the first tree, we would only pick from trees [0,1].

Example 3:
  Input: fruits = [1,2,3,2,2]
  Output: 4
  Explanation: We can pick from trees [2,3,2,2].
  If we had started at the first tree, we would only pick from trees [1,2].

Constraints:
 - 1 <= fruits.length <= 10^5
 - 0 <= fruits[i] < fruits.length
*/

/**
 * @param {number[]} fruits
 * @return {number}
 */
/* 
Approach : Sliding Window
Time: O(N)
Space: O(1) - we store max 2 entry

Runtime: 34 ms Beats 56.55% 
Memory: 65.74 MB Beats 78.37%
*/
var totalFruit = function (fruits) {
  const N = fruits.length;
  let i = 0;
  let j = 0;
  const k = 2;
  let fruitMap = new Map();
  let maxFruits = 0;
  while (j < N) {
    //update fruit count
    fruitMap.set(fruits[j], (fruitMap.get(fruits[j]) || 0) + 1);
    //until fruit map is greater than basket size, reduce the elements from map
    while (fruitMap.size > k) {
      //remove from left
      const outFruit = fruits[i];
      if (fruitMap.has(outFruit)) {
        fruitMap.set(outFruit, fruitMap.get(outFruit) - 1);
        if (fruitMap.get(outFruit) == 0) fruitMap.delete(outFruit);
      }
      i++; //move the left pointer
    }
    maxFruits = Math.max(maxFruits, j - i + 1);
    j++;
  }
  return maxFruits;
};
