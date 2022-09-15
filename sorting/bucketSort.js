/**
 *
 * @param {*} arr - Array to be sorted
 * @param {*} K - bucket size
 */
//bucketSort([22,50,32,28,41,12], 3)
//bucketSort([23, 25, 21,1219,175,7], 5)
function bucketSort(arr, K) {
  const buckets = [...Array(K)].map(() => []);
  //min will be our shift
  const shift = Math.min(...arr);
  const max = Math.max(...arr);
  const maxValue = max - shift;
  console.log(`shift: ${shift}, max: ${max}, maxValue: ${maxValue}`);
  //bucket size
  const bucketSize = parseInt(maxValue / K);
  if (bucketSize < 1) bucketSize = 1;
  console.log(`bucketSize: ${bucketSize}`);
  for (const num of arr) {
    // same as K * arr[i] / max(lst)
    const index = parseInt((num - shift) / bucketSize);
    // put the max value in the last bucket
    if (index === K) buckets[K - 1].push(num);
    else buckets[index].push(num);
  }
  //sort the buckets
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }
  // convert sorted buckets into final output
  const sortedList = [];
  for (const bucket of buckets) {
    sortedList.push(...bucket);
  }
  console.log(sortedList);
  // perfectly fine to just return sortedList here
  // but common practice is to mutate original array with sorted elements
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedList[i];
  }
}
