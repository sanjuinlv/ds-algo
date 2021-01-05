/* 
Tyep: Easy (not so easy though)
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), 
which is then converted into a different digit string.
To determine how you "say" a digit string, split it into the minimal number 
of groups so that each group is a contiguous section all of the same character. 
Then for each group, say the number of characters, then say the character. 
To convert the saying into a digit string, replace the counts with a number and 
concatenate every saying.

For example, the saying and conversion for digit string "3322251":
"'332251"
Two 3's, three 2's, one 5, and one 1
23 + 32 + 15 + 11
"23321511"

Example 1:
Input: n = 1
Output: "1"
Explanation: This is the base case.

Example 2:
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
countAndSay(5) = say "1211" = one 1 + one 2 + two 1's = "111221"
countAndSay(6) = say "111221" = three 1's + two 2 + one 1 = "312211"
countAndSay(7) = say "312211" = one 3 + one 1 + two 2's + two 1's= "13112221"
*/
/**
 * @param {number} n
 * @return {string}
 */
/* 
Runtime: 84 ms, faster than 66.22% of JavaScript online submissions for Count and Say.
Memory Usage: 40.7 MB, less than 56.03% of JavaScript online submissions for Count and Say.
 */
var countAndSay = function(n) {
    if (n == 1) return "1";
    let say = countAndSay(n-1);
    console.log(`n: ${n}, say: ${say}`);
    let result = "";
    let i = 0, count = 0;
    let prev = say[i];
    while (i < say.length) {
        const curr = say[i];
        console.log(`i: ${i}, prev: ${prev}, curr: ${curr}`);
        if (prev == curr) {
            count++;
        } else {
            result += `${count}${prev}`;
            //reset for next sub-sequence
            prev = curr;
            count = 1;    
        }
        console.log(`result: ${result}`);
        i++;
    }
    result += `${count}${prev}`;
    console.log(`final result: ${result}`);
    return result;
  };