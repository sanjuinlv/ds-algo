//Intersection

// R = [a;b] = {a, a+1, ..., b}, a<=b

// 1) R1, R2, find an intersection

//          ----------------------
//                  ---------------------------
//                  ==============

// [2;7], [5;9] => [5;7]

// [7;9], [2;5] =>

// 0123456789
//        ---
//   ----

function findIntersection(range1, range2) {
  //create range array
  const ranges = [range1, range2];
  //sort the ranges
  ranges.sort((a, b) => a[0] - b[0]);
  //check if tthere is any intersection
  //no intersection, if the smallest range doens't overlap with second range
  if (ranges[0][1] < ranges[1][0]) return [];
  //start with range1
  const intersection = ranges[0];
  //the intersection start is always bigger of two ranges
  intersection[0] = Math.max(ranges[0][0], ranges[1][0]);
  //merge the range if there is overlap
  intersection[1] = Math.min(ranges[0][1], ranges[1][1]);
  return intersection;
}

// 2) A = {Ri}, i=1..N, Rq
// Whether Rq intersects any range from A?

// A = { [2;7], [5;9], [14;15] }
// Rq = [4;6] => true
// Rq = [5;9] => true?
// Rq = [10;11] => false

// A = { [2;7], [5;8], [9,12], [14;15] }
// Rq = [4;6] => true
// Rq = [10;11] => true

// A = { [2;7], [5;8], [9,12], [14;15] }
// Rq = [7;11] => true
// Rq = [7;16] => true
// Rq = [1;3] => true

/*
findIntersection([[2,7], [5,9], [14,15]], [4,6])
findIntersection([[2,7], [5,8], [9,12], [14,15] ], [4,6])
findIntersection([[2,7], [5,8], [9,12], [14,15] ], [7,11])
*/

function findIntersection(ranges, rangeQuery) {
  //sort the ranges
  //ranges.sort((a,b) => a[0] - b[0]);
  //check if there is any intersection
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    //either range query start is
    if (
      (rangeQuery[0] >= range[0] && rangeQuery[0] <= range[1]) ||
      (rangeQuery[1] >= range[0] && rangeQuery[1] <= range[1])
    ) {
      return true;
    }
  }
  return false;
}
