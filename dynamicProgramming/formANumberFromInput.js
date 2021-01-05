/*
Given 3 numbers {1, 3, 5}, we need to tell
the total number of ways we can form a number 'N'
using the sum of the given three numbers.
*/

//using recursion
function solve1(N) {
    if (N < 0) return 0;
    if (N == 0) return 1;
    const noOfWaysToFormN = solve(N - 1) + solve(N - 3) + solve(N - 5);
    console.log(`noOfWaysToFormN: ${noOfWaysToFormN}`);
    return noOfWaysToFormN;
}

// Adding tabulation
function solve2(N) {
    const dp = [];
    dp[0] = 1;
    dp[1] = 1;
    console.log(`dp: ${dp}`);
    // we need to have info about 2-3=-1 and 2-5= -3
    for (let i = 2; i <= N; i++) {
        dp[i] = dp[i - 1] + (i - 3 >= 0 ? dp[i - 3] : 0) + (i - 5 >= 0 ? dp[i - 5] : 0);
        console.log(`dp[${i}]: ${dp[i]}`);
    }
    console.log(`noOfWaysToFormN: ${dp[N]}`);
    return dp[N];
}

// tabulation with recursive call
function solve(N, dp = []) {
    if (N < 0) return 0;
    if (N == 0) return 1;
    if (dp[N]) {
        return dp[N];
    }
    dp[N] = solve(N - 1, dp) + solve(N - 3, dp) + solve(N - 5, dp);
    return dp[N];
}


