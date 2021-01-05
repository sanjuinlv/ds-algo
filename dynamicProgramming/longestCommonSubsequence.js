// Time complexity: 2^(M*N) (due to recusion)
function longestCommonSubsequence(a, b) {
    const LCS = (i, j) => {
        // if we reached till end of the array then return 0
        if (i >= a.length || j >= b.length) {
            return 0;
        } else if (a[i] == b[j]) {
            // if equal then add 1 and look further for other match
            return 1 + LCS(i + 1, j + 1);
        } else {
            // look up from next element in a and b respectively
            return Math.max(LCS(i + 1, j), LCS(i, j + 1));
        }
    }
    return LCS(0, 0);
}

// Using DP memoization
// a = "stone", b = "longest" => 3      - PASS
// a = "abcdefghi", b = "cdgi"  => 3    - PASS
// a = "abdace", b = "babce"  => 4      - PASS
function longestCommonSubsequence(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [...Array(m + 1)].map(x => Array(n + 1).fill(0));
    let max = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            console.log(`i: ${i}, j:${j}`);
            if (a[i - 1] == b[j - 1]) {
                // 1+ diagonal up
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                //max of (prev_row,col), (row,prev_col)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
            console.log(`dp[${i}][${j}]: ${dp[i][j]}`);
            if (dp[i][j] > max) max = dp[i][j];
        }
    }
    console.log(dp)
    return max;
}

//find the LCS
function findCommonSubsequence(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [...Array(m + 1)].map(x => Array(n + 1).fill(0));
    let max = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            console.log(`i: ${i}, j:${j}`);
            if (a[i - 1] == b[j - 1]) {
                // 1+ diagonal up
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                //max of (prev_row,col), (row,prev_col)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
            console.log(`dp[${i}][${j}]: ${dp[i][j]}`);
            if (dp[i][j] > max) max = dp[i][j];
        }
    }
    console.log(dp)
    let lcs = "";
    let i = m, j = n;
    while (i >= 1 && j >= 1) {
        if (dp[i][j] == Math.max(dp[i - 1][j], dp[i][j - 1])) {
            j--;
        } else {
            console.log(`match at i:${i}, j: ${j}`);
            console.log(`a[${i - 1}]: ${a[i - 1]}, b[${j - 1}]: ${b[j - 1]}`);
            lcs = a[i - 1] + lcs;
            i--;
            j--;
        }
    }
    console.log(`lcs: ${lcs}`);
    return lcs;
}