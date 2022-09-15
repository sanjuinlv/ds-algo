/* 
Brute force
Time: O(N * M)
Space: O(1)
*/
var strStr = function (haystack, needle) {
  if (!needle.length) return 0;
  const N = haystack.length;
  const M = needle.length;
  for (let i = 0; i <= N - M; i++) {
    let j = 0;
    while (j < M) {
      if (haystack[i + j] !== needle[j]) break;
      j++;
    }
    //full length match found for `needle`, return start index
    if (j === M) return i;
  }
  return -1;
};

/*
Knuth-Morris-Pratt
Time: O(N * M)
Space: O(1)
*/
