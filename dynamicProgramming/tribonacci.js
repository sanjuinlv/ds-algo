/*
The Tribonacci sequence Tn is defined as follows: 
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.
 */
/**
 * @param {number} n
 * @return {number}
 */
/*
Approach: Dynamic programming using memoization
Time complexity: O(N)
Space Complexity: O(N)
Runtime: 80 ms, faster than 42.26% of JavaScript online submissions for N-th Tribonacci Number.
Memory Usage: 38.3 MB, less than 56.23% of JavaScript online submissions for N-th Tribonacci Number.
 */
var tribonacci = function(n) {
    if (n == 0) return 0;
    if (n <= 2) return 1;
    dp = new Array(n);
    first = 0;
    dp[1] = 1;
    dp[2] = 1;
    for (let i = 3; i <= n; i++){
        dp[i] = dp[i-1] + dp [i-2] + dp[i-3];
    }
    return dp[n];
};

/*
Approach: Dynamic programming using memoization, but without space
Time complexity: O(N)
Space Complexity: O(1)

Runtime: 76 ms, faster than 71.70% of JavaScript online submissions for N-th Tribonacci Number.
Memory Usage: 38.4 MB, less than 56.23% of JavaScript online submissions for N-th Tribonacci Number.
 */
var tribonacci = function(n) {
    if (n == 0) return 0;
    if (n <= 2) return 1;
    let first = 0;
    let second = 1;
    let third = 1;
    for (let i = 3; i <= n; i++){
        let fourth = first + second + third;
        first = second;
        second = third;
        third = fourth;
    }
    return fourth;
};

