/* 
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.
Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

Input: num1 = "2", num2 = "3"
Output: "6"

Input: num1 = "123", num2 = "456"
Output: "56088"

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.

*/
/**
 * Medium
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    // add two numbers
    const add = (num1, num2) => {
        console.log(`to add:: num1: ${num1}, num2: ${num2}`);
        let carryOver = 0;
        let sum = "";
        for (let i = num1.length - 1, j = num2.length - 1; i >= 0 || j >= 0; i--, j--) {
            // console.log(`digit1: ${num1.charAt(i)}, digit2: ${num2.charAt(j)}, carryOver: ${carryOver}`);
            const singleDigitSum = +num1.charAt(i) + +num2.charAt(j) + +carryOver;
            // console.log(`singleDigitSum: ${singleDigitSum}`);
            const singleDigitSumStr = "" + singleDigitSum;
            // console.log(`singleDigitSumStr: ${singleDigitSumStr}`);
            if (singleDigitSumStr.length > 1) {
                carryOver = singleDigitSumStr.charAt(0);
                sum = singleDigitSumStr.charAt(1) + sum;
            } else {
                carryOver = 0
                sum = singleDigitSumStr + sum;
            }
            // console.log(`sum: ${sum}`);
        }
        if (carryOver > 0) {
            sum = carryOver + sum;
        }
        console.log(`final sum: ${sum}`);
        return sum;
    }
    let product = "";
    let loopCounter = 0;
    //trim the leading zeros
    if (num1.length > 1) {
        i = 0;
        while (num1.charAt(i) == '0' && i < num1.length)
            i++;
        console.log(`i: ${i}`);
        num1 = num1.substring(i, num1.length);
    }
    if (num2.length > 1) {
        i = 0;
        while (num2.charAt(i) == '0' && i < num2.length)
            i++;
        console.log(`i: ${i}`);
        num2 = num2.substring(i, num2.length);
    }
    console.log(`to add:: num1: ${num1}, num2: ${num2}`);
    for (let i = num1.length - 1; i >= 0; i--) {
        const digit1 = +num1.charAt(i);
        let singleDigitProduct = "";
        let carryOver = 0;
        for (let j = num2.length - 1; j >= 0; j--) {
            const digit2 = +num2.charAt(j);
            console.log(`digit2: ${digit2}, digit1: ${digit1}, carryOver: ${carryOver}`);
            // multiply these two
            const product = digit1 * digit2 + carryOver;
            const productStr = "" + product;
            console.log(`productStr: ${productStr}`);
            if (productStr.length > 1) {
                carryOver = +productStr.charAt(0);
                singleDigitProduct = productStr.charAt(1) + singleDigitProduct;
            } else {
                carryOver = 0;
                // console.log(`productStr: ${productStr}, singleDigitProduct: ${singleDigitProduct}, concat: ${productStr + singleDigitProduct}`);
                singleDigitProduct = productStr + singleDigitProduct;
            }
            console.log(`singleDigitProduct: ${singleDigitProduct}`);
        }
        if (carryOver > 0) {
            singleDigitProduct = carryOver + singleDigitProduct;
        }
        // add previous product with this one
        if (i < num1.length - 1) {
            let trailingZeros = "";
            for (let i = 1; i <= loopCounter; i++) {
                trailingZeros += "0";
            }
            product = add(product, singleDigitProduct + trailingZeros);
        } else {
            product = singleDigitProduct;
        }
        console.log(`product: ${product}`);
        loopCounter++;
    }
    console.log(`final product: ${product}`);
    return product;
};

// Cleaner code (With reference)
// Intuition of this solution is that product of num1[i] * num2[j] will be placed at indices [i + j, i + j + 1] 
var multiply = function(num1, num2) {
    const m = num1.length, n = num2.length;
    //result character array 
    // a product of two number with size m & n can have max of m+n result length
    const result = new Array(m + n).fill('0');
    console.log(result);
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            // console.log(`i: ${i}, j:${j}`);
            // product of the two digits
            // not using the numeric conversion (prefix +) so subtract the char '0' unicode value to get numeric value of num[i]
            console.log(`digit1: ${num1.charAt(i)}, digit2: ${num2.charAt(j)}`);
            const product = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            // console.log(`product at i+j+1: ${i + j + 1} is ${result[i + j + 1]}`);
            sum = product + (result[i + j + 1] - '0');
            console.log(`product: ${product}, sum: ${sum}`);
            result[i + j + 1] = "" + sum % 10;
            result[i + j] = "" + ((result[i + j] - '0') + parseInt(sum / 10));
            console.log(`result: ${result}`);
        }
    }
    console.log(`final result: ${result}`);
    let resultStr = "";
    result.forEach(char => {
        if (!(resultStr.length == 0 && char == '0')) resultStr += char;
    })
    console.log(`final resultStr: ${resultStr}`);
    return resultStr;
}

// for submission
// Your runtime beats 54.01 % of javascript submissions.
var multiply = function(num1, num2) {
    const m = num1.length, n = num2.length;
    const resultArr = new Array(m + n).fill('0');
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const product = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            sum = product + (resultArr[i + j + 1] - '0');
            resultArr[i + j + 1] = "" + sum % 10;
            resultArr[i + j] = "" + ((resultArr[i + j] - '0') + parseInt(sum / 10));
        }
    }
    let resultStr = "";
    resultArr.forEach(char => {
        if (!(resultStr.length == 0 && char == '0')) resultStr += char;
    })
    return resultStr.length ? resultStr : "0";
}