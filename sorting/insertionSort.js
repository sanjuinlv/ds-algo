function insertionSort(arr) {
    console.log(`input array: ${JSON.stringify(arr)}`)
    if (arr && !arr.length) return arr;
    let i;
    for (let j = 1; j < arr.length; j++) {
        let key = arr[j];
        i = j - 1;
        while (i >= 0 && arr[i] > key) {
            arr[i + 1] = arr[i];
            i = i - 1;
        }
        arr[i + 1] = key;
    }
    console.log(`sorted array: ${JSON.stringify(arr)}`)
}
