/* 
71. Simplify Path
https://leetcode.com/problems/simplify-path
Type: Medium

You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path.

The rules of a Unix-style file system are as follows:

 - A single period '.' represents the current directory.
 - A double period '..' represents the previous/parent directory.
 - Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
 - Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.

The simplified canonical path should follow these rules:
 - The path must start with a single slash '/'.
 - Directories within the path must be separated by exactly one slash '/'.
 - The path must not end with a slash '/', unless it is the root directory.
 - The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
Return the simplified canonical path.


Example 1:
  Input: path = "/home/"
  Output: "/home"
  Explanation: The trailing slash should be removed.

Example 2:
  Input: path = "/home//foo/"
  Output: "/home/foo"
  Explanation: Multiple consecutive slashes are replaced by a single one.

Example 3:
  Input: path = "/home/user/Documents/../Pictures"
  Output: "/home/user/Pictures"
  Explanation: A double period ".." refers to the directory up a level (the parent directory).

Example 4:
  Input: path = "/../"
  Output: "/"
  Explanation: Going one level up from the root directory is not possible.

Example 5:
  Input: path = "/.../a/../b/c/../d/./"
  Output: "/.../b/d"
  Explanation: "..." is a valid name for a directory in this problem.

Constraints:
 - 1 <= path.length <= 3000
 - path consists of English letters, digits, period '.', slash '/' or '_'.
 - path is a valid absolute Unix path.
*/
/**
 * @param {string} path
 * @return {string}
 */
// '//' and '///' are treated as single as single '/'
// '/'
/* 
  - A single period '.' represents the current directory.
  - A double period '..' represents the previous/parent directory.
  - Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
  - Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.
  */

/* 
Approach: Using Stack
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory: 51.27 MB Beats 42.43%
*/
var simplifyPath = function (path) {
  const stack = [];
  const pathArr = path.split("/");
  for (const str of pathArr) {
    if (str == "") {
      //adding "" to be replaced by "/", when there is nothing on the stack
      if (stack.length == 0) stack.push("");
    } else if (str == "..") {
      //go back to previous dir, only when there is dir other than "/"
      if (stack.length > 1) stack.pop();
    } else if (str == ".") {
      //curr directory. We stay there
      continue;
    } else {
      //valid path string, add it
      stack.push(str);
    }
  }
  let simplifiedPath = stack.join("/");
  if (simplifiedPath.length == 0) simplifiedPath = "/";
  return simplifiedPath;
};

/* 
Cleaner code 
Runtime: 3 ms Beats 58.22%
Memory: 50.94 MB Beats 58.50%
*/
var simplifyPath = function (path) {
  const stack = [];
  const dirs = path.split("/");
  for (const dir of dirs) {
    if (dir == "" || dir == ".") {
      //nothing to do for "." or empty string
      continue;
    } else if (dir == "..") {
      //go back to previous dir, only when there is dir other than "/"
      if (stack.length) stack.pop();
    } else {
      //valid path string, add it
      stack.push(dir);
    }
  }
  return "/" + stack.join("/");
};
