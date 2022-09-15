//Data structure we are going to use
class UF {
  find(p) {}
  union(p, q) {}
  connected(p, q) {}
  //optional
  count() {}
}

/*
1. Quick find
Initialization: O(N)
Find: O(1)
Union: O(N)
Connected: O(1)

Data Structure: 
 - Integer array  id[] of length N
 - Interpretation: p and q are connected if they have same id

*/

/*
2. Quick Union
Initialization: O(N)
Find: O(N) (worst case)
Union: O(N) 
Connected: O(N)

Data Structure: 
 - Integer array  id[] of length N
 - Interpretation: id[i] is parent of i
 - Root of i is id[id[id[...id[i]...]]] (keep going until it doesn't change)

Find: Check if p and q have same root
Union: To merge component containing p and q, set the id of p's root to the id of q's root.
*/

/* 
3. RankUF
Initialization: O(N)
Find: O(log N) 
Union: O(Log N) 
Connected: O(log N)
*/
