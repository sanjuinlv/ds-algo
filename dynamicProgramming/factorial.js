// Using tablulation
function factorial1(n) {
    if (n < 2) return 1;
    const f = [];
    f[1] = 1;
    for (let i = 2; i <= n; i++) {
        f[i] = i * f[i - 1];
    }
    console.log(`f: ${f}`);
    return f[n];
}

// Using Memoization
function factorial(n) {
    if (n < 2) return 1;
    // const f = [];
    // f[1] = 1;
    let prevVal = 1;
    let factorial;
    for (let i = 2; i <= n; i++) {
        factorial = i * prevVal;
        prevVal = factorial;
    }
    return factorial;
}