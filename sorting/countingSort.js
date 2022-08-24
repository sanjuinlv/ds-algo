/*
Counting sort
key assumption in the below version of counting sort is that the minimum possible
value in the array is 0 (no negative numbers) and the maximum value is some positive
integer K. If this is not the case, it's possible to perform a mapping step at the
beginning and then remap the values to the original array at the end. For example,
an array with values between -5 and 10 can be mapped to values between 0 and 15,
perform counting sort, and then remap to the original -5 to 10 range.

Time Complexity: O(N+K), where N is size of input array and K is max value in the array.
Space: O(K)
 */
/* 
Sorts an array of integers where minimum value is 0 and maximum value is K
let arr = [5,4,5,5,1,1,3]
countingSort(arr);
*/
function countingSort(arr) {
  //1. find the max of the array;
  let K = 0;
  arr.forEach((element) => {
    K = Math.max(K, element);
  });
  //2. create counting array
  const counts = [...Array(K + 1)].fill(0);
  for (let num of arr) counts[num]++;
  console.log(counts);
  //2. create start index
  // we now overwrite our original counts with the starting index
  // of each element in the final sorted array
  let startingIndex = 0;
  for (let i = 0; i < counts.length; i++) {
    const count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }
  const sortedArray = new Array(arr.length);
  for (let num of arr) {
    sortedArray[counts[num]] = num;
    counts[num]++;
  }
  return sortedArray;
}

/* 
Modified version to handle the negative numbers

public class Solution {
    public void countingSort(int[] arr) {
        // Sorts an array of integers (handles shifting of integers to range 0 to K)
        int shift = Arrays.stream(arr).min().getAsInt();
        int K = Arrays.stream(arr).max().getAsInt() - shift;
        int[] counts = new int[K + 1];
        for (int elem : arr) {
            counts[elem - shift] += 1;
        }
        // we now overwrite our original counts with the starting index
        // of each element in the final sorted array
        int startingIndex = 0;
        for (int i = 0; i < K + 1; i++) {
            int count = counts[i];
            counts[i] = startingIndex;
            startingIndex += count;
        }

        int sortedArray[] = new int[arr.length];
        for (int elem : arr) {
            sortedArray[counts[elem - shift]] = elem;
            // since we have placed an item in index counts[elem], we need to
            // increment counts[elem] index by 1 so the next duplicate element
            // is placed in appropriate index
            counts[elem - shift] += 1;
        }

        // common practice to copy over sorted list into original arr
        // it's fine to just return the sortedArray at this point as well
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sortedArray[i];
        }
    }
}
*/
