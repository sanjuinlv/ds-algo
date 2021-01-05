/**
 * @param {string} s
 * @return {number}
 */
// using recursion 
// state to solve
// state(n) = state(n-1) + state (n-2);
var numDecodings2 = function(s) {
    console.log(`s: ${s}`);
    const N = s.length;
    if (N == 1) return Number(s) > 0 ? 1 : 0;
    if (N == 2) {
        const num = Number(s);
        console.log(`num is : ${num}`);
        if (num > 10 && num <= 26) {
            return 2;
        } else {
            return 1;
        }
    }
    const lastTwoDigit = Number(s.slice(N - 2, N));
    console.log(`lastTwoDigit: ${lastTwoDigit}`);
    let noOfWayToDecode;
    // if last two digit is greater than 26 then we can't create any decoded value as a combined value
    // individually they are already counted in N-1 solution
    if (lastTwoDigit <= 26) {
        noOfWayToDecode = numDecodings(s.slice(0, N - 1)) + numDecodings(s.slice(0, N - 2));
    } else {
        noOfWayToDecode = numDecodings(s.slice(0, N - 1));
    }
    console.log(`noOfWayToDecode ${s} is: ${noOfWayToDecode}`);
    return noOfWayToDecode;
};

// for submission (recursive)
var numDecodings = function(s) {
    const N = s.length;
    if (N == 1) return Number(s) > 0 ? 1 : 0;
    if (N == 2) {
        const num = Number(s);
        if (num > 10 && num <= 26) {
            return 2;
        } else {
            return 1;
        }
    }
    const lastTwoDigit = Number(s.slice(N - 2, N));
    let noOfWayToDecode;
    if (lastTwoDigit <= 26) {
        noOfWayToDecode = numDecodings(s.slice(0, N - 1)) + numDecodings(s.slice(0, N - 2));
    } else {
        noOfWayToDecode = numDecodings(s.slice(0, N - 1));
    }
    return noOfWayToDecode;
};


// Handling prefix '0' and in middle
var numDecodings2 = function(s) {
    console.log(`s: ${s}`);
    const N = s.length;
    //base case
    if (N == 0 || N == 1) return 1;

    // for base condition "01123" should return 0 
    if (s.charAt(0) == '0') return 0;

    let noOfWayToDecode = 0;
    // If the last digit is not 0, then last digit must add to 
    // the number of words 
    if (Number(s.charAt(N - 1)) > 0) {
        noOfWayToDecode = numDecodings(s.slice(0, N - 1));
    }

    const lastTwoDigit = Number(s.slice(N - 2, N));
    console.log(`lastTwoDigit: ${lastTwoDigit}`);
    if (lastTwoDigit > 10 || lastTwoDigit <= 26) {
        noOfWayToDecode += numDecodings(s.slice(0, N - 2));
    }
    console.log(`noOfWayToDecode ${s} is: ${noOfWayToDecode}`);
    return noOfWayToDecode;
};


// Using DP
var numDecodings = function(s) {
    let N = s.length;
    if (N.length == 0) return 0;
    if (s.charAt(0) === '0') return 0;
    // DP array to store the sub-problems
    let dp = [N + 1];
    //base case
    dp[0] = 1;

    // '0' doesn't have a single digit decode.
    dp[1] = s.charAt(0) === '0' ? 0 : 1;

    for (let i = 2; i <= N; i++) {
        //set default value
        dp[i] = 0;
        console.log(`i: ${i}, char at ${i - 1} is: ${s.charAt(i - 1)}`);
        if (s.charAt(i - 1) !== '0') {
            dp[i] = dp[i - 1];
            console.log(`dp after update: ${dp}`);
        }
        const lastTwoDigit = Number(s.slice(i - 2, i));
        // const lastTwoDigit = Number(s.slice(i - 2, i));
        console.log(`lastTwoDigit: ${lastTwoDigit}`);
        if (lastTwoDigit >= 10 && lastTwoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
        console.log(`dp after update: ${dp}`);
    }
    console.log(`final dp: ${dp}`);
    return dp[N];
}

// DP using variables
var numDecodings = function(s) {
    let N = s.length;
    if (N.length == 0) return 0;
    if (s.charAt(0) === '0') return 0;
    //base case
    let f1 = 1;
    // '0' doesn't have a single digit decode.
    let f2 = s.charAt(0) === '0' ? 0 : 1;
    let result = f2;
    for (let i = 2; i <= N; i++) {
        //set default value
        result = 0;
        console.log(`i: ${i}, char at ${i - 1} is: ${s.charAt(i - 1)}`);
        if (s.charAt(i - 1) !== '0') {
            result = f2;
            console.log(`result after update: ${result}`);
        }
        const lastTwoDigit = Number(s.slice(i - 2, i));
        // const lastTwoDigit = Number(s.slice(i - 2, i));
        console.log(`lastTwoDigit: ${lastTwoDigit}`);
        if (lastTwoDigit >= 10 && lastTwoDigit <= 26) {
            result += f1;
        }
        f1 = f2;
        f2 = result;
        console.log(`f1: ${f1}, f2: ${f2}, result: ${result}`);
    }
    console.log(`f1: ${f1}, f2: ${f2}, result: ${result}`);
    return result;
}

// for submission
/*  
Runtime: 92 ms, faster than 49.42% of JavaScript online submissions for Decode Ways.
Memory Usage: 39.3 MB, less than 8.99% of JavaScript online submissions for Decode Ways.
*/
var numDecodings = function(s) {
    let N = s.length;
    if (N.length == 0) return 0;
    if (s.charAt(0) === '0') return 0;
    //base case
    let f1 = 1;
    // '0' doesn't have a single digit decode.
    let f2 = s.charAt(0) === '0' ? 0 : 1;
    let result = f2;
    for (let i = 2; i <= N; i++) {
        //set default value
        result = 0;
        if (s.charAt(i - 1) !== '0') {
            result = f2;
        }
        const lastTwoDigit = Number(s.slice(i - 2, i));
        if (lastTwoDigit >= 10 && lastTwoDigit <= 26) {
            result += f1;
        }
        f1 = f2;
        f2 = result;
    }
    return result;
}