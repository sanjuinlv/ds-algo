/* 
https://leetcode.com/explore/interview/card/google/59/array-and-strings/471/

Given a time represented in the format "HH:MM", form the next closest time by reusing
the current digits. There is no limit on how many times a digit can be reused.

You may assume the given input string is always valid. For example, "01:34", "12:09"
are all valid. "1:34", "12:9" are all invalid.

Example 1:
Input: time = "19:34"
Output: "19:39"
Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39,
which occurs 5 minutes later.
It is not 19:33, because this occurs 23 hours and 59 minutes later.

Example 2:
Input: time = "23:59"
Output: "22:22"
Explanation: The next closest time choosing from digits 2, 3, 5, 9, is 22:22.
It may be assumed that the returned time is next day's time since it is smaller than
the input time numerically.

Constraints:

time.length == 5
time is a valid time in the form "HH:MM".
0 <= HH < 24
0 <= MM < 60
*/

var nextClosestTime = function (time) {};

var nextClosestTime2 = function (time) {
  const arr = [
    parseInt(time[0]),
    parseInt(time[1]),
    parseInt(time[3]),
    parseInt(time[4]),
  ];
  const allOptions = new Set();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      allOptions.add(arr[i] * 10 + arr[j]);
    }
  }
  const allOptionsArray = [...allOptions];
  allOptionsArray.sort((a, b) => a - b);
  const allOptionsMin = allOptionsArray.filter((a) => a < 60);
  const allOptionsHour = allOptionsArray.filter((a) => a < 24);

  let [hour, min] = time.split(":");
  min = parseInt(min);
  hour = parseInt(hour);
  let increased = false;
  const indexMin = allOptionsMin.indexOf(min);
  if (indexMin < allOptionsMin.length - 1) {
    min = allOptionsMin[indexMin + 1];
    increased = true;
  } else {
    min = allOptionsMin[0];
  }
  if (increased === false) {
    const indexHour = allOptionsHour.indexOf(hour);
    if (indexHour < allOptionsHour.length - 1) {
      hour = allOptionsHour[indexHour + 1];
      increased = true;
    } else {
      hour = allOptionsHour[0];
    }
  }
  min = min < 10 ? "0" + min : "" + min;
  hour = hour < 10 ? "0" + hour : "" + hour;
  return hour + ":" + min;
};
