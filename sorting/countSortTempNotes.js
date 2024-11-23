//tmp code related to counting sort
//from ChatGPT
function countingSort(arr) {
  // Find the maximum value in the array
  let max = Math.max(...arr);    
  // Create a count array with a size of max+1, initialized to 0
  let count = new Array(max + 1).fill(0);
  // Step 1: Count the occurrences of each element in the input array
  for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
  }
  console.log(`counts array:`, count);    
  // Step 2: Modify the count array by adding the previous counts (cumulative count)
  for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
  }
  console.log(`counts array with insertion position:`, count);
  // Step 3: Create an output array to store the sorted order
  let output = new Array(arr.length).fill(0);
  // Step 4: Place the elements from the input array into the output array
  // for (let i = arr.length - 1; i >= 0; i--) {
  //     output[count[arr[i]] - 1] = arr[i];
  //     count[arr[i]]--;  // Decrement the count for the placed element
  // }
  for (let i = 0; i < arr.length - 1; i++) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]++;  // Decrement the count for the placed element
  }
  console.log(`output array:`, output);
  // Copy the sorted elements back to the original array
  for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
  }
  return arr;
}

// Example usage:
let arr = [4, 2, 2, 8, 3, 3, 1];
console.log("Sorted Array:", countingSort(arr));

let arr = [3,6,9,1];
console.log("Sorted Array:", countingSort(arr));

[3,6,9,1]

//********* from Gemini ***************
function countingSort(array) {
  // Find the maximum value in the array
  let max = Math.max(...array);

  // Create a counting array to store the frequency of each element
  let count = new Array(max + 1).fill(0);

  // Count the frequency of each element
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
  }

  // Modify the count array to store the cumulative frequency
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Create an output array to store the sorted elements
  let output = new Array(array.length);

  // Place each element in the output array based on its count
  // for (let i = array.length - 1; i >= 0; i--) {
  //   output[count[array[i]] - 1] = array[i];
  //   count[array[i]]--;
  // }

  for (let i = 0; i < array.length; i++) {
    output[count[array[i]] - 1] = array[i];
    count[array[i]]++;
  }

  return output;
}

/**************** ***************
var smallestTrimmedNumbers = function (nums, queries) {
  const N = nums.length;
  function Node(value, index) {
    this.value = value;
    this.index = index;
  }
  let unsorted = new Array(N);
  //create node array with number and its index
  for (let i = 0; i < N; i++) {
    unsorted[i] = new Node(nums[i], i);
  }
  const LSDSort = (a, trim) => {
    const W = a[0].value.length;
    const N = a.length;
    const R = 9; //only digits
    const aux = new Array(N);
    // console.log(`trim: ${trim}, W: ${W}`);
    //for one by one for each digits
    for (let d = W - 1; d >= W - trim; d--) {
      console.log(`d: ${d}`);
      const counts = new Array(R + 1).fill(0);
      //1. count array for digit 'd'
      for (let i = 0; i < N; i++) {
        const digit = a[i].value.charAt(d) - "0";
        counts[digit + 1]++;
      }
      //2. Transform count to indices
      for (let r = 0; r < R; r++) {
        counts[r + 1] += counts[r];
      }
      //3. distribute the records
      for (let i = 0; i < N; i++) {
        const digit = a[i].value.charAt(d) - "0";
        aux[counts[digit]++] = a[i];
      }
      for (let i = 0; i < N; i++) {
        a[i] = aux[i];
      }      
      console.log(`Array after sorting by digit ${d}:`, aux);
    }
    return aux;
  };

  const result = new Array(queries.length);
  let sorted = [];
  for (let i = 0; i < queries.length; i++) {
    const [k, d] = queries[i];
    console.log(`k: ${k}, d: ${d}`);
    sorted = LSDSort([...unsorted], d);
    //kth smallest
    result[i] = sorted[k - 1].index;
  }
  return result;
};

//fails for 
input=["9415","5908","1840","5307"]
query=[[3,2],[2,2],[3,3],[1,3]]
k=2, trim=2
after trim = "15","08","40","07"
1st digit sort: "40","15","07","08"
2st digit sort: "07","08","15","40"

input=["64333639502","65953866768","17845691654","87148775908","58954177897","70439926174","48059986638","47548857440","18418180516","06364956881","01866627626","36824890579","14672385151","71207752868"]
query=[[9,4],[6,1],[3,8],[12,9],[11,4],[4,9],[2,7],[10,3],[13,1],[13,1],[6,1],[5,10]]
sorted for k=6
[
  Node { value: '47548857440', index: 7 }, 0
  Node { value: '14672385151', index: 12 }, 1 
  Node { value: '06364956881', index: 9 }, 2
  Node { value: '64333639502', index: 0 }, 3
  Node { value: '70439926174', index: 5 }, 4
  Node { value: '17845691654', index: 2 }, 5
  Node { value: '18418180516', index: 8 },
  Node { value: '01866627626', index: 10 },
  Node { value: '58954177897', index: 4 },
  Node { value: '48059986638', index: 6 },
  Node { value: '65953866768', index: 1 },
  Node { value: '71207752868', index: 13 },
  Node { value: '87148775908', index: 3 },
  Node { value: '36824890579', index: 11 }
] 
  */