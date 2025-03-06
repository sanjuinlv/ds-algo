/* 
44. Wildcard Matching
https://leetcode.com/problems/wildcard-matching
Type: Hard

Time: O(S*P*(S+P))
 - Removing duplicate stars requires us to traverse the stringponce, this requires O(P) time.
 - Regarding the helper function, every non-memoized recursive call we will:

    Check ifhelper(s, p)has already been calculated. This takesO(S+P)time to create a hash of the tuple(s, p)the first time andO(1)time to check if the result has already been cached.

    Go through our if statements. If(s, p)is one of the base cases, this will takeO(min(S,P))time for the string equality check or justO(1)time for other checks, otherwise, it will takeO(S+P)time to create a substrings[1:]and a substringp[1:]. Here, let's assume the worst-case scenario where most of the non-memoized recursive calls requireO(S+P)time.

    Then we will cache our result, which takesO(1)time since the hash for tuple(s, p)was already created when we checked if the result for(s, p)is already cached.

So in total, we spendO(2⋅(S+P))=O(S+P)time on every non-memoized call (S+Pfor creating a hash andS+Pfor creating substrings). We can only have as many non-memoized calls as there are combinations ofsandp. Therefore, in the worst case, we can haveS⋅Pnon-memoized calls. This gives us a total time spent on non-memoized calls ofO(S⋅P⋅(S+P)).

As for the memoized calls, for each non-memoized call, we can make at most 2 additional calls tohelper. This means that there will be at mostS⋅Pmemoized calls. Each memoized call takesO(S+P)time to create the hash for(s, p)andO(1)time to get the cached result. So the total time spent on memoized calls isO(S⋅P⋅(S+P))which is a loose upper bound.

Adding all 3 time complexities together we get:O(P+2⋅S⋅P⋅(S+P))=O(S⋅P⋅(S+P)).

Space: O(S*P)
Creating a new stringprequiresO(P)space. The recursion call stack may exceedmax(S, P)in cases such as(s, p)=(aaab, *a*b), however, it is bounded byO(S+P). Lastly, the hashmap requiresO(S⋅P)space to memoize the result of each call tohelper.

Runtime: 36 ms Beats 76.39%
Memory: 68.26 MB Beats 26.04%
*/
var isMatch = function (s, p) {
  const removeDuplicateStar = (p) => {
    let newStr = "";
    for (const c of p) {
      //if new string is empty or curr char is not "*" add to new string
      if (newStr.length == 0 || c != "*") newStr += c;
      //the last character of string is not "*" then add curr string
      else if (newStr[newStr.length - 1] != "*") newStr += c;
    }
    return newStr;
  };
  const helper = (i, j) => {
    if (dp[i][j] != null) return dp[i][j];
    //exhausted the pattern, then check if we are done with input string
    if (j == n) dp[i][j] = i == m;
    //done with input string, then check if last character of p is "*"
    else if (i == m) dp[i][j] = j == n - 1 && p[j] == "*";
    //char of s is same as p or p has "?" at curr index
    else if (s[i] == p[j] || p[j] == "?") {
      dp[i][j] = helper(i + 1, j + 1);
    } else if (p[j] == "*") {
      // "*" can match any char
      //we can ignore "*" or take "*"
      dp[i][j] = helper(i, j + 1) || helper(i + 1, j);
    } else {
      //if we reached time here then no match for i, and j
      dp[i][j] = false;
    }
    return dp[i][j];
  };
  p = removeDuplicateStar(p);
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  return helper(0, 0);
};

/* 
Approach I: Recursive
*/
var isMatch = function (s, p) {
  return helper(s.length - 1, p.length - 1, s, p);
};

function helper(i, j, s, p) {
  //base cases
  //nothing left in pattern and nothing left in string to match, then match found
  if (j < 0 && i < 0) return true;
  //nothing left in pattern but string still has char to match
  if (j < 0 && i >= 0) return false;
  //if nothing left in string s to match
  if (i < 0 && j >= 0) {
    //any character left in pattern should be "*"
    for (let k = 0; k <= j; k++) if (p[k] !== "*") return false;
    //all char in p are "*", so it can match empty string
    return true;
  }
  //char of s and p at 'i' and 'j' matches OR char of p is "?" which can match any single char
  if (s[i] == p[j] || p[j] == "?") return helper(i - 1, j - 1, s, p);
  if (p[j] == "*") {
    //we can ignore the "*" and compare with rest of chars of p and s OR
    //we take "*" as match to s and compare rest of s char and keeping p chars same
    return helper(i, j - 1, s, p) || helper(i - 1, j, s, p);
  }
  return false;
}

/* 
Approach II : Recursion + memo

Runtime: 37 ms Beats 77.45%
Memory: 69.50 MB Beats 22.18%
*/
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(null));
  return helper(m - 1, n - 1, s, p, dp);
};

function helper(i, j, s, p, dp) {
  //base cases
  //nothing left in pattern and nothing left in string to match, then match found
  if (j < 0 && i < 0) return true;
  //nothing left in pattern but string still has char to match
  if (j < 0 && j >= 0) return false;
  //if nothing left in string s to match
  if (i < 0 && j >= 0) {
    //any character left in pattern should be "*"
    for (let k = 0; k <= j; k++) if (p[k] !== "*") return false;
    //all char in p are "*", so it can match empty string
    return true;
  }
  if (dp[i][j] != null) return dp[i][j];
  //char of s and p at 'i' and 'j' matches OR char of p is "?" which can match any single char
  if (s[i] == p[j] || p[j] == "?")
    return (dp[i][j] = helper(i - 1, j - 1, s, p, dp));
  if (p[j] == "*") {
    //we can ignore the "*" and compare with rest of chars of p and s OR
    //we take "*" as match to s and compare rest of s char and keeping p chars same
    return (dp[i][j] =
      helper(i, j - 1, s, p, dp) || helper(i - 1, j, s, p, dp));
  }
  return (dp[i][j] = false);
}

//1 index based
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  return helper(m, n, s, p, dp);
};

function helper(i, j, s, p, dp) {
  //base cases
  //nothing left in pattern and nothing left in string to match, then match found
  if (j == 0 && i == 0) return true;
  //nothing left in pattern but string still has char to match
  if (j == 0 && i > 0) return false;
  //if nothing left in string s to match
  if (i == 0 && j > 0) {
    //any character left in pattern should be "*"
    for (let k = 1; k <= j; k++) if (p[k - 1] !== "*") return false;
    //all char in p are "*", so it can match empty string
    return true;
  }
  if (dp[i][j] != null) return dp[i][j];
  //char of s and p at 'i' and 'j' matches OR char of p is "?" which can match any single char
  if (s[i - 1] == p[j - 1] || p[j - 1] == "?")
    return (dp[i][j] = helper(i - 1, j - 1, s, p, dp));
  if (p[j - 1] == "*") {
    //we can ignore the "*" and compare with rest of chars of p and s OR
    //we take "*" as match to s and compare rest of s char and keeping p chars same
    return (dp[i][j] =
      helper(i, j - 1, s, p, dp) || helper(i - 1, j, s, p, dp));
  }
  return (dp[i][j] = false);
}
/* 
Approach III : Bottom Up DP

Runtime: 28 ms Beats 82.18%
Memory: 68.73 MB Beats 23.27%
*/
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  //base case
  dp[0][0] = true;
  for (i = 1; i <= m; i++) {
    dp[i][0] = false;
  }
  for (let j = 1; j <= n; j++) {
    let flag = true;
    for (let k = 1; k <= j; k++) {
      if (p[k - 1] != "*") {
        flag = false;
        break;
      }
    }
    dp[0][j] = flag;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] == p[j - 1] || p[j - 1] == "?") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else {
        dp[i][j] = false;
      }
    }
  }
  return dp[m][n];
};
