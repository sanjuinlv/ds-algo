/* 
Suppose Andy and Doris want to choose a restaurant for dinner, and they both
have a list of favorite restaurants represented by strings.
You need to help them find out their common interest with the least list index
sum. If there is a choice tie between answers, output all of them with no 
order requirement. You could assume there always exists an answer.

Example 1:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], 
list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: The only restaurant they both like is "Shogun".

Example 2:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], 
list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun"]
Explanation: The restaurant they both like and have the least index sum is "Shogun" with index sum 1 (0+1).

Constraint:
    * 1 <= list1.length, list2.length <= 1000
    * 1 <= list1[i].length, list2[i].length <= 30
    * list1[i] and list2[i] consist of spaces ' ' and English letters.
    * All the stings of list1 are unique.
    * All the stings of list2 are unique.
*/

/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
/*
Approach: Using Map
Runtime: 100 ms, faster than 83.96% of JavaScript online submissions for Minimum Index Sum of Two Lists.
Memory Usage: 45.5 MB, less than 71.64% of JavaScript online submissions for Minimum Index Sum of Two Lists.
Time Complexity: O(l1 + l2). Every item of list2 is checked in a map of list1. 
l1 and l2 are the lengths of list1 and list2 respectively. 
Space complexity: O(l1 * x). 
 */
var findRestaurant = function (list1, list2) {
  if (list1.length > list2.length) {
    return findRestaurant(list2, list1);
  }
  const restaurantMap = new Map();
  for (let i = 0; i < list1.length; i++) {
    restaurantMap.set(list1[i], i);
  }
  let restaurantMatch = [];
  let minSum = Number.MAX_VALUE;
  for (let i = 0; i < list2.length; i++) {
    if (!restaurantMap.has(list2[i])) continue;
    let indexSum = i + restaurantMap.get(list2[i]) || 0;
    if (indexSum == minSum) {
      restaurantMatch.push(list2[i]);
    } else if (indexSum < minSum) {
      restaurantMatch = [list2[i]];
      minSum = indexSum;
    }
  }
  return restaurantMatch;
};

// Optimized with min sum
var findRestaurant = function (list1, list2) {
  if (list1.length > list2.length) {
    return findRestaurant(list2, list1);
  }
  const restaurantMap = new Map();
  for (let i = 0; i < list1.length; i++) {
    restaurantMap.set(list1[i], i);
  }
  let restaurantMatch = [];
  let minSum = Number.MAX_VALUE;
  for (let i = 0; i < list2.length && i <= minSum; i++) {
    if (!restaurantMap.has(list2[i])) continue;
    let indexSum = i + restaurantMap.get(list2[i]) || 0;
    if (indexSum == minSum) {
      restaurantMatch.push(list2[i]);
    } else if (indexSum < minSum) {
      restaurantMatch = [list2[i]];
      minSum = indexSum;
    }
  }
  return restaurantMatch;
};
