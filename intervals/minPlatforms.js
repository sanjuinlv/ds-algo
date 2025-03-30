/* 
Minimum Platforms
https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
Type: Medium

You are given the arrival times arr[] and departure times dep[] of all trains that arrive at a railway station on the same day. Your task is to determine the minimum number of platforms required at the station to ensure that no train is kept waiting.

At any given time, the same platform cannot be used for both the arrival of one train and the departure of another. Therefore, when two trains arrive at the same time, or when one arrives before another departs, additional platforms are required to accommodate both trains.

Example 1:
Input: arr[] = [900, 940, 950, 1100, 1500, 1800], dep[] = [910, 1200, 1120, 1130, 1900, 2000]
Output: 3
Explanation: There are three trains during the time 9:40 to 12:00. So we need a minimum of 3 platforms.

Example 2:
Input: arr[] = [900, 1235, 1100], dep[] = [1000, 1240, 1200]
Output: 1
Explanation: All train times are mutually exclusive. So we need only one platform

Example 3:
Input: arr[] = [1000, 935, 1100], dep[] = [1200, 1240, 1130]
Output: 3
Explanation: All 3 trains have to be there from 11:00 to 11:30


Constraints:
 - 1≤ number of trains ≤ 50000
 - 0000 ≤ arr[i] ≤ dep[i] ≤ 2359

Note: Time intervals are in the 24-hour format(HHMM) , where the first two characters represent hour (between 00 to 23 ) and the last two characters represent minutes (this will be <= 59 and >= 0).
*/
/**
 * @param {number[]} arr
 * @param {number[]} dep
 * @returns {number}
 */

/* 
Approach I: Sorting + Using two pointers
Time: O(NLogN)
Space; (LogN) - for sortin

Time Taken: 0.15
*/
class Solution {
  // Function to find the minimum number of platforms required at the
  // railway station such that no train waits.
  findPlatform(arr, dep) {
    let N = arr.length;
    //sort the arival time
    arr.sort((a, b) => a - b);
    //sort the departure time
    dep.sort((a, b) => a - b);
    //we start with first train arrival so we need one platform
    let platformNeeded = 1;
    let maxPlatform = 1;
    //start with first train arrival
    let i = 1; //pointer for arrival
    let j = 0; //pointer for departure
    while (i < N) {
      //if trains arrives before the departure, we need additional platform
      if (arr[i] <= dep[j]) {
        platformNeeded++;
        //update max
        maxPlatform = Math.max(maxPlatform, platformNeeded);
        i++;
      } else {
        platformNeeded--;
        j++;
      }
    }
    return maxPlatform;
  }
}

/* 
Approach II: Sorting
Time: O(NLogN)
Space; (LogN) - for sorting

Time Taken: 0.21
*/
class Solution {
  // Function to find the minimum number of platforms required at the
  // railway station such that no train waits.
  findPlatform(arr, dep) {
    let N = arr.length;
    //create combined array with arrival and departure
    const order = [];
    for (let i = 0; i < N; i++) {
      //for arrival second value is kept as '0' else '1'
      order.push([arr[i], 0]);
      order.push([dep[i], 1]);
    }
    //sort the array by arrival time
    order.sort((a, b) => {
      //if time of two event are same then arrival comes first followed by departure
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });
    //we start with first train arrival so we need one platform
    let maxPlatform = 0;
    let platformNeeded = 0;
    for (let i = 0; i < order.length; i++) {
      //if the event is arrival then we need platform
      if (order[i][1] === 0) platformNeeded++;
      //for departure array we get a platform free 
      else platformNeeded--;
      maxPlatform = Math.max(maxPlatform, platformNeeded);
    }
    return maxPlatform;
  }
}

/* 
646 1812 1953 1859 46 1935 1624 617 1645 628
805 2200 2106 2333 1554 2047 2020 1900 2048 2351

intervals [
    [ 646, 805 ],
    [ 46, 1554 ],
    [ 617, 1900 ],
    [ 1624, 2020 ],
    [ 1935, 2047 ],
    [ 1645, 2048 ],
    [ 1953, 2106 ],
    [ 1812, 2200 ],
    [ 1859, 2333 ],
    [ 628, 2351 ]
  ]

i: 1, currCount: 2
i: 2, currCount: 3
i: 3, currCount: 4
i: 4, currCount: 5
i: 5, currCount: 6
i: 6, currCount: 7
i: 7, currCount: 8
i: 8, currCount: 9
i: 9, currCount: 10    


900 940 950 1100 1500 1800
910 1200 1120 1130 1900 2000

900 1235 1100 
1000 1240 1200

1000 935 1100
1200 1240 1130

failing for:
626 504 256 1133 1232 920 1851 524 1353 1723
1102 1829 638 1853 1853 1128 2138 2241 1609 2048
*/
