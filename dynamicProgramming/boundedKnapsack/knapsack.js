/* 
Types of Knapsack:
 - Fractional (we can take fractional part of an item)
 - 0/1 (we can choose only once)
 - unbounded (we can choose same element as much as we want)
*/
//pseudo code for knapsack
function knapsack(wt, val, w, n) {
  //if there is no item to choose or weight to gain then we can only gain 0
  if (n == 0 || w == 0) return 0;
  if (wt[n - 1] <= w) {
    //we have option to choose current weight value or not choose it.
    //so we try to get max of choosing it or not choosing it
    return Math.max(
      //choose this weight
      val[n - 1] + knapsack(wt, val, w - wt[n - 1], n - 1),
      //do not choose this weight, so try with remaining items
      knapsack(val, wt, w, n - 1)
    );
  } else {
    //we try with remaining items
    return knapsack(val, wt, w, n - 1);
  }
}

//Knapsack with meomoization
function solveKnapsack(wtArr, valArr, w) {
  const n = wtArr.length;
  const m = w;
  const memo = [...Array(n + 1)].map((x) => new Array(m + 1).fill(0));
  function knapsack(wt, val, w, n) {
    //if there is no item to choose or weight to gain then we can only gain 0
    if (n == 0 || w == 0) return 0;
    if (memo[m + 1][n + 1] != -1) return memo[m][n];
    if (wt[n - 1] <= w) {
      //we have option to choose current weight value or not choose it.
      //so we try to get max of choosing it or not choosing it
      return (memo[m][n] = Math.max(
        //choose this weight
        val[n - 1] + knapsack(wt, val, w - wt[n - 1], n - 1),
        //do not choose this weight, so try with remaining items
        knapsack(val, wt, w, n - 1)
      ));
    } else {
      //we try with remaining items
      return (memo[m][n] = knapsack(val, wt, w, n - 1));
    }
  }
  return solveKnapsack(wtArr, valArr, w, n);
}
//converting this to bottom-up
function knapsack(wt, val, w, n) {
  //this wieght fits in knapsack
  if (wt[n - 1] <= w) {
    //max of choosign this weight or do not choosing it
    t[n][w] = Math.max(val[n - 1] + t[n - 1][w - wt[n - 1]], t[n - 1][w]);
  } else {
    t[n][w] = t[n - 1][w];
  }
}

function knapsack(wt, val, w, n) {
  const t = [...Array(n + 1)].map((x) => new Array(w + 1).fill(0));
  for (let i = 1; i < n + 1; i++) {
    for (j = 1; j < w + 1; j++) {
      if (wt[i - 1] <= j) {
        t[i][j] = Math.max(val[i - 1] + t[i - 1][j - wt[i - 1]], t[i - 1][j]);
      } else {
        t[i][j] = t[i - 1][j];
      }
    }
  }
}
