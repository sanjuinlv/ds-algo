/* 
Boolean Parenthesization
https://www.geeksforgeeks.org/problems/boolean-parenthesization5610/1
Type: Medium

Given a boolean expression s of length n with following symbols.
Symbols
    'T' ---> true
    'F' ---> false
and following operators filled between symbols
Operators
    &   ---> boolean AND
    |   ---> boolean OR
    ^   ---> boolean XOR
Count the number of ways we can parenthesize the expression so that the value of expression evaluates to true.

Note: The answer can be large, so return it with modulo 1003

Example 1:
  Input:  n = 7,  s = T|T&F^T
  Output: 4
  Explaination: The expression evaluates to true in 4 ways ((T|T)&(F^T)), (T|(T&(F^T))), (((T|T)&F)^T) and (T|((T&F)^T)).

Example 2:
  Input: n = 5, s = T^F|F
  Output: 2
  Explaination: ((T^F)|F) and (T^(F|F)) are the only ways. 

Your Task:
You do not need to read input or print anything. Your task is to complete the function countWays() which takes n and s as input parameters and returns number of possible ways modulo 1003.

Expected Time Complexity: O(n^3)
Expected Auxiliary Space: O(n^2)

Constraints:
 - 1 ≤ n ≤ 200 
*/
/* 
Recursion
*/
class Solution {
  countWays(S, n) {
    const solve = (s, i, j, isTrue) => {
      //base cases
      if (i > j) return false;
      //single element
      if (i == j) {
        if (isTrue == true) return s[i] == "T";
        else return s[i] == "F";
      }
      let ans = 0;
      for (let k = i + 1; k <= j - 1; k = k + 2) {
        const lT = solve(s, i, k - 1, true);
        const lF = solve(s, i, k - 1, false);
        const rT = solve(s, k + 1, j, true);
        const rF = solve(s, k + 1, j, false);
        if (s[k] == "&") {
          if (isTrue) ans = ans + lT * rT;
          else {
            ans += lF * rT + lF * rF + lT * rF;
          }
        } else if (s[k] == "|") {
          if (isTrue) ans += lT * rT + lT * rF + lF * rT;
          else ans += lF * rF;
        } else if (s[k] == "^") {
          if (isTrue) ans += lT * rF + lF * rT;
          else ans += lT * rT + lF * rF;
        }
      }
      return ans % 1003; //asked in problem to return modulus of 1003 for large answer
    };
    return solve(S, 0, n - 1, true);
  }
}

/* 
Recursion + Memoization
Time: O(N^3)
i can range from 0 to n-1 (total of n possible values).
j can range from 0 to n-1 but must satisfy i <= j, resulting in approximately 𝑛(𝑛+1)/2 possible (i, j) pairs.
isTrue has 2 possible values (true or false).
Total unique states = 2 * (n (n+1) / 2) = O (N^2)

Space: O(N^2)

Time Taken: 1.1
*/
class Solution {
  countWays(S, n) {
    const memo = new Map();
    const solve = (s, i, j, isTrue) => {
      //base cases
      if (i > j) return 0;
      //single element
      if (i == j) {
        if (isTrue == true) return s[i] == "T" ? 1 : 0;
        else return s[i] == "F" ? 1 : 0;
      }
      const key = `${i}${j}${isTrue}`;
      if (memo.has(key)) return memo.get(key);
      let ans = 0;
      for (let k = i + 1; k <= j - 1; k = k + 2) {
        const lT = solve(s, i, k - 1, true);
        const lF = solve(s, i, k - 1, false);
        const rT = solve(s, k + 1, j, true);
        const rF = solve(s, k + 1, j, false);
        if (s[k] == "&") {
          if (isTrue) ans += lT * rT;
          else {
            ans += lF * rT + lF * rF + lT * rF;
          }
        } else if (s[k] == "|") {
          if (isTrue) ans += lT * rT + lT * rF + lF * rT;
          else ans += lF * rF;
        } else if (s[k] == "^") {
          if (isTrue) ans += lT * rF + lF * rT;
          else ans += lT * rT + lF * rF;
        }
      }
      memo.set(key, ans % 1003); //asked in problem to return modulus of 1003 for large answer
      return memo.get(key);
    };
    return solve(S, 0, n - 1, true);
  }
}
