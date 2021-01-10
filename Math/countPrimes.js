/* 
Count the number of prime numbers less than a non-negative number, n.

Example 1:

Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

Example 2:

Input: n = 0
Output: 0

Example 3:

Input: n = 1
Output: 0

Constraints: 
    - 0 <= n <= 5 * 10^6

*/
/**
 * @param {number} n
 * @return {number}
 */
/* 
Brute force. Divide by all numbers less than n
A number is prime if it is only divisible by itself and 1 (e.g., 2,3,5,7,9,11 ect)

Time complexity: O(N^2) 
1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
=> 2,3,5,7,11,13,17,19
*/
// return primeNumbers.every(n => num % n!= 0);
var countPrimes = function(n) {
    if (n <= 1) return 0;
    let primeCount = 0;
    const isPrimeNumber = (num) => {
        let i = 2;
        while(i < num) {
            if (num % i == 0) return false;
            i++;
        }
        return true;
    }
    for (let i = 2; i <= n; i++){
        if (isPrimeNumber(i)) primeCount++;
    }
    return primeCount;
};

/* 
Approach 2: Caching + no of comparision reduction.
Can we do better?
As we know the number must not be divisible by any number > n / 2, we can immediately 
cut the total iterations half by dividing only up to n / 2. Could we still do better?
*/
var countPrimes = function(n) {
    if (n <= 1) return 0;
    const primes = new Set();
    let primeCount = 0;
    const isPrimeNumber = (num) => {
        if (primes.has(num)) return true;
        let i = 2;
        const mid = Math.floor(num / 2);
        while(i <= mid) {
            if (num % i == 0) return false;
            i++;
        }
        primes.add(num);
        return true;
    }
    for (let i = 2; i <= n; i++){
        if (isPrimeNumber(i)) primeCount++;
    }
    return primeCount;
};

/* 
Approach 3: 
Let's write down all of 12's factors:
2 × 6 = 12
3 × 4 = 12
4 × 3 = 12
6 × 2 = 12

As you can see, calculations of 4 × 3 and 6 × 2 are not necessary. 
Therefore, we only need to consider factors up to √n because, if n is divisible by
some number p, then n = p × q and since p ≤ q, we could derive that p ≤ √n. 
Our total runtime has now improved to O(n^1.5), which is slightly better. Is there a faster approach?
*/
var countPrimes = function(n) {
    if (n <= 1) return 0;
    let primeCount = 0;
    const isPrimeNumber = (num) => {
        // Loop's ending condition is i * i <= num instead of i <= sqrt(num)
        // to avoid repeatedly calling an expensive function sqrt().
        for (let i = 2; i * i <= num; i++){
            if (num % i == 0) return false;
        }
        return true;
    }
    for (let i = 2; i <= n; i++){
        if (isPrimeNumber(i)) primeCount++;
    }
    return primeCount;
}
/* 
Using Sieve of Eratosthenes implementation

Runtime: 204 ms
Memory Usage: 51.7 MB
Your runtime beats 49.51 % of javascript submissions.
Your memory usage beats 56.86 % of javascript submissions.
*/
var countPrimes = function(n) {
    //mark all number upto n as prime
    const isPrimes = new Array(n).fill(true);
    for (let i = 2; i * i < n; i++){
        if (!isPrimes[i]) continue;
        //start marking the multiple of i as non prime
        // multiple of 2 => 4, 6, 8, 10, 12, 14....
        for (j = i * i; j < n; j += i){
            isPrimes[j] = false;
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++){
        if (isPrimes[i]) count++;
    }
    return count;
}