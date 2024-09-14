/* 
*/
var keyIndexCounting = function(a, R) {
    const N = a.length;
    const count = [R + 1].fill(0);
    const aux = [N];
    //compute frequency count
    for (let i = 0; i < N; i++) {
        count[a[i] + 1]++;
    }
    // Transform count to indices
    // we do not update the 0th index and since count size is R+1 we can loop until R
    for (let r = 0; r < R; r++) {
        count[r + 1] += count[r]
    }
    //distribute the records
    for (let i = 0; i < N; i++) {
        aux[count[a[i]]++] = a[i];
    }
    //copy back
    for (let i = 0; i < N; i++) {
        a[i] = aux[i];
    }
}