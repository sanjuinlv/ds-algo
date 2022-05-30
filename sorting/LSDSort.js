// LSD radix sort
// a = ["4PGC938", "2IYE230", "3CIO720", "1ICK750", "1OHV845"]
// sorted value: ["4PGC938", "2IYE230", "3CIO720", "1ICK750", "1OHV845"]
var LSDSort = function(a, W) {
    const N = a.length;
    const R = 256;
    const aux = [N];
    // d = 6;
    for (let d = W - 1; d >= 0; d--) {
        const count = new Array(R + 1).fill(0);
        //compute frequency count
        for (let i = 0; i < N; i++) {
            //using '+' before the char to treat it as numeric for addition
            count[+a[i].charCodeAt(d) + 1]++;
        }

        // Transform count to indices
        for (let r = 0; r < R; r++) {
            count[r + 1] += count[r];
        }

        //distribute the records
        for (let i = 0; i < N; i++) {
            aux[count[a[i].charCodeAt(d)]++] = a[i];
        }
        // copy back
        for (let i = 0; i < N; i++) {
            a[i] = aux[i];
        }
    }
    console.log(a);
}