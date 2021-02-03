/* 
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).
Find all strobogrammatic numbers that are of length = n.

Example
Input:  n = 2
Output: ["11","69","88","96"]
["101","111","181","609","619","689","808","818","888","906","916","986"]

*/
/**
 * @param {number} n
 * @return {string[]}
 */
/*
for n = 4
output:   ["1111","1691","1881","1961","6119","6699","6889","6969","8118","8698","8888","8968","9116","9696","9886","9966"]
Expected: ["1001","1111","1691","1881","1961","6009","6119","6699","6889","6969","8008","8118","8698","8888","8968","9006","9116","9696","9886","9966"]

So this solution has extra 00 added for some cases
 */
var findStrobogrammatic = function(n) {
    if (n == 0) return [""];
    //the map of mirror of numbers
    const mirror = {"1": "1", "6": "9", "9": "6", "8": "8"};
    let result = [];
    const helper = (n) => {
        console.log(`n: ${n}`);
        if (n <= 0) return [""];
        if (n == 1) return ["0", "1", "8"];
        const result = [];
        const prev = helper(n - 2);
        console.log(`prev: ${prev}`);
        for (const digit in mirror){
            for (const item of prev){
                result.push(`${digit}${item}${mirror[digit]}`);
            }
        }
        console.log(`result: ${result}`);
        return result;
    };
    result = helper(n);
    console.log(`final result: ${result}`);
    return result;
};

/* 
With fix for '00'
n = 4
My Qnswer: ["1001","6009","8008","9006","1111","6119","8118","9116","1691","6699","8698","9696","1881","6889","8888","9886","1961","6969","8968","9966"]
Expected: ["1001","1111","1691","1881","1961","6009","6119","6699","6889","6969","8008","8118","8698","8888","8968","9006","9116","9696","9886","9966"]

n = 6
My Qnswer: ["100001","600009","800008","900006","110011","610019","810018","910016","160091","660099","860098","960096","180081","680089","880088","980086","190061","690069","890068","990066","101101","601109","801108","901106","111111","611119","811118","911116","161191","661199","861198","961196","181181","681189","881188","981186","191161","691169","891168","991166","106901","606909","806908","906906","116911","616919","816918","916916","166991","666999","866998","966996","186981","686989","886988","986986","196961","696969","896968","996966","108801","608809","808808","908806","118811","618819","818818","918816","168891","668899","868898","968896","188881","688889","888888","988886","198861","698869","898868","998866","109601","609609","809608","909606","119611","619619","819618","919616","169691","669699","869698","969696","189681","689689","889688","989686","199661","699669","899668","999666"]
Expected:  ["100001","101101","106901","108801","109601","110011","111111","116911","118811","119611","160091","161191","166991","168891","169691","180081","181181","186981","188881","189681","190061","191161","196961","198861","199661","600009","601109","606909","608809","609609","610019","611119","616919","618819","619619","660099","661199","666999","668899","669699","680089","681189","686989","688889","689689","690069","691169","696969","698869","699669","800008","801108","806908","808808","809608","810018","811118","816918","818818","819618","860098","861198","866998","868898","869698","880088","881188","886988","888888","889688","890068","891168","896968","898868","899668","900006","901106","906906","908806","909606","910016","911116","916916","918816","919616","960096","961196","966996","968896","969696","980086","981186","986986","988886","989686","990066","991166","996966","998866","999666"]

Your runtime beats 39.78 % of javascript submissions.
Your memory usage beats 34.41 % of javascript submissions.
*/
var findStrobogrammatic = function(n) {
    if (n < 0) n = - n + 1;
    //the map of mirror of numbers
    const mirror = {"1": "1", "6": "9", "9": "6", "8": "8"};
    const helper = (n, m) => {
        if (n <= 0) return [""];
        if (n == 1) return ["0", "1", "8"];
        const result = [];
        const prev = helper(n - 2, m);
        for (const item of prev){
            if (n != m) {
                result.push(`0${item}0`);
            }
            for (const digit in mirror){
                result.push(`${digit}${item}${mirror[digit]}`);
            }
        }
        return result;
    };
    return helper(n, n);
};

/* 
Without using digit map
Runtime: 116 ms
Memory Usage: 51.6 MB

Your runtime beats 59.14 % of javascript submissions.
Your memory usage beats 37.63 % of javascript submissions.
*/
var findStrobogrammatic = function(n) {
    if (n < 0) n = - n + 1;
    const helper = (n, m) => {
        if (n <= 0) return [""];
        if (n == 1) return ["0", "1", "8"];
        const result = [];
        const prev = helper(n - 2, m);
        for (const item of prev){
            //add zeros only at non root level
            if (n != m) {
                result.push("0"+item+"0");
            }
            result.push("1"+item+"1");
            result.push("6"+item+"9");
            result.push("9"+item+"6");
            result.push("8"+item+"8");
        }
        return result;
    };
    return helper(n, n);
};

