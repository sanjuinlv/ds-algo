/* 
Given a file and assume that you can only read the file using a given method read4, implement a method to read n characters.
Method read4:
The API read4 reads 4 consecutive characters from the file, then writes those characters into the buffer array buf4.
The return value is the number of actual characters read.
Note that read4() has its own file pointer, much like FILE *fp in C.

Method read:
By using the read4 method, implement the method read that reads n characters from the
file and store it in the buffer array buf. Consider that you cannot manipulate the file directly.
The return value is the number of actual characters read.

Definition of read:
    Parameters:	char[] buf, int n
        Returns:	int

    Note: buf[] is destination not source, you will need to write the results to buf[]

Examples:
--------------------------
Input: file = "abc", n = 4
Output: 3
Explanation: After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3. Note that "abc" is the file's content, not buf. buf is the destination buffer that you will have to write the results to.

Input: file = "abcde", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "abcde". We read a total of 5 characters from the file, so return 5.

Input: file = "abcdABCD1234", n = 12
Output: 12
Explanation: After calling your read method, buf should contain "abcdABCD1234". We read a total of 12 characters from the file, so return 12.

Input: file = "leetcode", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "leetc". We read a total of 5 characters from the file, so return 5.

Note:
Consider that you cannot manipulate the file directly, the file is only accesible for read4 but not for read.
The read function will only be called once for each test case.
You may assume the destination buffer array, buf, is guaranteed to have enough space for storing n characters.

*/
/**
 * Definition for read4()
 *
 * @param {character[]} buf4 Destination buffer
 * @return {number} The number of actual characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

var read4 = function (buf4) {
  console.log(`buf4: ${buf4}`);
};
/**
 * @param {function} read4()
 * @return {function}
 */
// file = "abc", n = 4
// file = "abcde", n = 5
// file = "abcdABCD1234", n = 12
// file = "leetcode", n = 5
var solution = function (read4) {
  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function (buf, n) {
    console.log(`read called with buf: ${buf} and size: ${n}`);
    let charReadCounts = 0;
    let buf4 = [4];
    while (charReadCounts <= n) {
      let charCount = read4(buf4);
      console.log(`char read count from read4: ${charCount}`);
      console.log(`read char : ${buf4}`);
      //no more character to read
      if (charCount == 0) break;
      const remainingReadCount = n - charReadCounts;
      // console.log(`remainingReadCount: ${remainingReadCount}`);
      buf4.forEach((char) => {
        if (charReadCounts < n) {
          buf.push(char);
          charReadCounts++;
        }
      });
      // for (let i = 0; i < remainingReadCount && i < 4; i++) {
      //     buf.push(buf4[i]);
      //     charReadCount++;
      // }
      // charReadCount += charCount;
      // buf4.forEach(char => buf.push(char));
      console.log(`updated buffer : ${buf}`);
      buf4 = []; //reset the buffer
      console.log(`toal character read count : ${charReadCounts}`);
    }
    console.log(`buf: ${buf}`);
    console.log(`final read count: ${charReadCounts}`);
    return charReadCounts;
  };
};

// for submission
// Runtime: 72 ms
// Memory Usage: 38.7 MB
// Your runtime beats 88.40 % of javascript submissions.
var solution = function (read4) {
  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function (buf, n) {
    let charReadCounts = 0;
    let buf4 = new Array(4);
    while (charReadCounts <= n) {
      let charCount = read4(buf4);
      //no more character to read
      if (charCount == 0) break;
      buf4.forEach((char) => {
        if (charReadCounts < n) {
          buf.push(char);
          charReadCounts++;
        }
      });
      buf4 = []; //reset the buffer
    }
    return charReadCounts;
  };
};
