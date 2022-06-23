/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {};

//modify below program to fit the answer
// var combinationSum4 = function (nums, target) {
//     const combinations = [];
//     const compute = (target, combination) => {
//       if (target == 0) {
//         //add copy of combination
//         combinations.push([...combination]);
//         //we are done with this path
//         return;
//       }
//       for (const num of nums) {
//         combination.push(num);
//         if (target - num === 0) {
//           combinations.push([...combination]);
//           combination.pop();
//           return;
//         }
//         //terminate when found the target
//         compute(target - num, combination);
//         combination.pop();
//       }
//     };
//     compute(target, []);
//     return combinations;
//   };
