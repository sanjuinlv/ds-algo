/**
 * @param {number} n
 * @return {string[]}
 */
/* 
Runtime: 128 ms, faster than 5.07% of JavaScript online submissions for Fizz Buzz.
Memory Usage: 40.7 MB, less than 36.53% of JavaScript online submissions for Fizz Buzz.
*/
var fizzBuzz = function(n) {
    const result = new Array(n);
    for (let i = 1; i <= n; i++) {
        if (i % 15 == 0) {
          result[i-1] = "FizzBuzz";
        } else if (i % 3 == 0) {
          result[i-1] = "Fizz";
        } else if (i % 5 == 0) {
          result[i-1] = "Buzz";
        } else {
          result[i-1] = `${i}`;
        }
    }
    return result;
};

/*
Runtime: 88 ms, faster than 45.66% of JavaScript online submissions for Fizz Buzz.
Memory Usage: 40.7 MB, less than 54.12% of JavaScript online submissions for Fizz Buzz.
 */
var fizzBuzz = function(n) {
    const result = new Array(n);
    for (let i = 1; i <= n; i++){
        let str = "";
        if (i % 3 == 0) str+= "Fizz";
        if (i % 5 == 0) str+= "Buzz";
        result[i-1];
    }
    return result;
}

