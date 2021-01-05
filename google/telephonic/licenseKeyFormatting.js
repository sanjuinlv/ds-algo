/**
You are given a license key represented as a string S which consists only alphanumeric character 
and dashes. The string is separated into N+1 groups by N dashes.
Given a number K, we would want to reformat the strings such that each group contains 
exactly K characters, except for the first group which could be shorter than K, but still must contain 
at least one character. Furthermore, there must be a dash inserted between two groups and all lowercase 
letters should be converted to uppercase.
Given a non-empty string S and a number K, format the string according to the rules described above.
 
Input: S = "5F3Z-2e-9-w", K = 4
Output: "5F3Z-2E9W"
Explanation: The string S has been split into two parts, each part has 4 characters.
Note that the two extra dashes are not needed and can be removed.

Input: S = "2-5g-3-J", K = 2
Output: "2-5G-3J"
Explanation: The string S has been split into three parts, each part has 2 characters except the 
first part as it could be shorter as mentioned above.

Failed for following:
Input: S="2-4A0r7-4k", k=4
Output:
"2-4A0R74K"
Expected:
"24A0-R74K"
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
    //create two string parts
    const firstHyphenIndex = S.indexOf("-");
    // part1
    const leftStr = S.substring(0, firstHyphenIndex);
    // rest of string
    const rightStr = S.substring(firstHyphenIndex + 1, S.length);
    let updatedRightStr = "";
    console.log(`part1: ${leftStr}, part2: ${rightStr}`);
    let rightStrChars = [];
    for (let i = 0; i < rightStr.length; i++) {
        const char = rightStr.charAt(i);
        if (char === "-") continue;
        rightStrChars.push(char.toLocaleUpperCase());
        if (rightStrChars.length == K) {
            if (updatedRightStr.length > 0) {
                updatedRightStr += "-";
            }
            updatedRightStr += rightStrChars.join("");
            console.log(`otherpart: ${updatedRightStr}`);
            rightStrChars = [];
        }
    }
    updatedRightStr += rightStrChars.join("");
    console.log(`otherpart: ${updatedRightStr}`);
    return `${leftStr}-${updatedRightStr}`;
};

// for submission
var licenseKeyFormatting = function(S, K) {
    const firstHyphenIndex = S.indexOf("-");
    const leftStr = S.substring(0, firstHyphenIndex);
    const rightStr = S.substring(firstHyphenIndex + 1, S.length);
    let updatedRightStr = "";
    let rightStrChars = [];
    for (let i = 0; i < rightStr.length; i++) {
        const char = rightStr.charAt(i);
        if (char === "-") continue;
        rightStrChars.push(char.toLocaleUpperCase());
        if (rightStrChars.length == K) {
            if (updatedRightStr.length > 0) {
                updatedRightStr += "-";
            }
            updatedRightStr += rightStrChars.join("");
            rightStrChars = [];
        }
    }
    updatedRightStr += rightStrChars.join("");
    return `${leftStr}-${updatedRightStr}`;
};
