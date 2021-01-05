/* 

Example: 
File file("abc");
Solution sol;
// Assume buf is allocated and guaranteed to have enough space for storing all characters from the file.
sol.read(buf, 1); // After calling your read method, buf should contain "a". We read a total of 1 character from the file, so return 1.
sol.read(buf, 2); // Now buf should contain "bc". We read a total of 2 characters from the file, so return 2.
sol.read(buf, 1); // We have reached the end of file, no more characters can be read. So return 0.

File file("abc");
Solution sol;
sol.read(buf, 4); // After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3.
sol.read(buf, 1); // We have reached the end of file, no more characters can be read. So return 0.
*/
/**
 * Definition for read4()
 * 
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
var solution = function(read4) {
    /**
     * @param {character[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    let localBuffer = [];
    return function(buf, n) {
        let buf4 = [4];
        charReadCounts = 0;
        //check if local buffer contains the number of items required. If so server it from there 
        if (localBuffer.length >= n) {
            for (let i = 0; i < n && i < localBuffer.length; i++) {
                buf.push(localBuffer[i]);
                charReadCounts++;
            }
            localBuffer = localBuffer.slice(n);
            console.log(`buf: ${buf}`);
            console.log(`charReadCounts: ${charReadCounts}`);
            return charReadCounts;
        }
        console.log(`remainingLocalBufferItems: ${remainingLocalBufferItems}`);
        while (localBuffer.length <= n) {
            let charCount = read4(buf4);
            // charReadCounts += charCount;
            //no more character to read
            if (charCount == 0) break;
            buf4.forEach(char => {
                localBuffer.push(char);
            })
            console.log(`localBuffer: ${localBuffer}`);
            buf4 = []; //reset the buffer 
        }
        // return the no of char required from local buffer
        for (let i = 0; i < n && i < localBuffer.length; i++) {
            buf.push(localBuffer[i]);
            charReadCounts++;
        }
        console.log(`buf: ${buf}`);
        console.log(`charReadCounts: ${charReadCounts}`);
        // remove the read items from local buffer
        localBuffer = localBuffer.slice(n);
        console.log(`remaining char in local buffer: ${localBuffer}`);
        return charReadCounts;
    };
};

// for submission
/* 
Runtime: 80 ms
Memory Usage: 39.3 MB
Your runtime beats 54.20 % of javascript submissions.
*/
var solution = function(read4) {
    /**
     * @param {character[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    let localBuffer = [];
    return function(buf, n) {
        let buf4 = [4];
        charReadCounts = 0;
        //check if local buffer contains the number of items required. If so server it from there 
        if (localBuffer.length >= n) {
            for (let i = 0; i < n && i < localBuffer.length; i++) {
                buf.push(localBuffer[i]);
                charReadCounts++;
            }
            localBuffer = localBuffer.slice(n);
            return charReadCounts;
        }
        while (localBuffer.length <= n) {
            let charCount = read4(buf4);
            //no more character to read
            if (charCount == 0) break;
            buf4.forEach(char => {
                localBuffer.push(char);
            })
            buf4 = []; //reset the buffer 
        }
        // return the no of char required from local buffer
        for (let i = 0; i < n && i < localBuffer.length; i++) {
            buf.push(localBuffer[i]);
            charReadCounts++;
        }
        // remove the read items from local buffer
        localBuffer = localBuffer.slice(n);
        return charReadCounts;
    };
};
