/* 
Minimum number of deletions to make it palindrome
https://www.geeksforgeeks.org/problems/minimum-number-of-deletions4610/1
Type: Medium

Given a string 'str' of size ‘n’. The task is to remove or delete the minimum number of characters from the string so that the resultant string is a palindrome. Find the minimum number of characters we need to remove.
Note: The order of characters should be maintained.

Example 1:

Input: n = 7, str = "aebcbda"
Output: 2
Explanation: We'll remove 'e' and
'd' and the string become "abcba".
â€‹Example 2:

Input: n = 3, str = "aba"
Output: 0
Explanation: We don't remove any
character.
Your Task:  
You don't need to read input or print anything. Your task is to complete the function minDeletions() which takes the string s and length of s as inputs and returns the answer.

Expected Time Complexity: O(|str|2)
Expected Auxiliary Space: O(|str|2)

Constraints:
1 ≤ |str| ≤ 103
*/

function minDeletions(s) {
    //reverse the string. Let's name it revStr
    //find the LCS of 's' and 'revStr'
    //let N be the lenght of 's'
    //let L be the length of 'revStr'
    //minNuberOfDelete = N - L
}