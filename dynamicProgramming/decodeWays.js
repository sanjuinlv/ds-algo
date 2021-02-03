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

// 2nd try 31-Jan-2021
/* 
Approach I: Recursion & Bcktracking
 */
var numDecodings = function(s) {
    let count = 0;
    const N = s.length;
    function backtrack(start) {
        if (start == N){
            count++;
            return;
        }
        //the digit at position 'start' must be >0. e.g., 02 is not vali while 20 is.
        if (s[start].codePointAt(0) - "0".codePointAt(0) > 0){
            //this digit can be decoded, check for next combination
            backtrack(start + 1);
            //is valid decoding possible for 2 digit?
            //10, 22, 26 are valid while 27, 30 are not valid. 
            // So we need to only check second digit is less than 7 for valid decode
            if (start < N - 1) {
                const lastTwoDigit = parseInt(s[start]+s[start+1]);
                // num >=10 && num <= 26 (we dont need to check for 10 as we already checking single digit to be >0)
                if (lastTwoDigit <= 26){
                    backtrack(start + 2);    
                }
            }        
        }
    }
    backtrack(0);
    return count;
}

/* 
Approach II: Recursion & memoization
Time Complexity: O(N), where N is length of the string. Memoization helps in pruning
the recursion tree and hence decoding for an index only once. Thus this solution is 
linear time complexity.
Space: O(N) - The dictionary used for memoization would take the space equal to the 
length of the string. There would be an entry for each index value. 
The recursion stack would also be equal to the length of the string.

Runtime: 88 ms, faster than 66.94% of JavaScript online submissions for Decode Ways.
Memory Usage: 40.6 MB, less than 31.70% of JavaScript online submissions for Decode Ways.
 */
var numDecodings = function(s) {
    const N = s.length;
    const memo = new Map();
    function backtrack(start) {
        if (memo.has(start)){
            return memo.get(start);
        }
        if (start == N){
            return 1;
        }
        //if the string start with zero '0' then no combination is possible
        if (s[start] == '0'){
            return 0;
        }
        //if we are at last index and its not zero, already passed in prev step, then its valid decod
        if (start == N-1){
            return 1;
        }        
        let ans = backtrack(start + 1);
        if (parseInt(s[start] + s[start + 1]) <= 26){
            ans += backtrack(start + 2);
        }
        memo.set(start, ans);
        return ans;
    }
    return backtrack(0);
}


/* 
Approach III: Using Dynamic Programming
Time Complexity: O(N), where N is length of the string. We iterate the length of dp array 
which is N+1.

Space: O(N) - The length of the DP array.

Runtime: 72 ms, faster than 99.06% of JavaScript online submissions for Decode Ways.
Memory Usage: 39.2 MB, less than 69.24% of JavaScript online submissions for Decode Ways.
 */
var numDecodings = function(s) {
    const N = s.length;
    const dp = new Array(N+1).fill(0);
    dp[0] = 1;
    dp[1] = s[0] == '0' ? 0: 1;
    for (let i = 2; i < N + 1; i++){
        //check if single digit decode is possible
        if (s[i-1] != "0"){
            dp[i] = dp[i-1];
        }
        //check if two digit decode is possible
        const twoDigits = parseInt(s[i - 2] + s[i - 1]);
        if (twoDigits >=10 && twoDigits <=26){
            dp[i] += dp[i-2];
        }
    }
    console.log(dp);
    return dp[N];
}    

