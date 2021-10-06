//Approach 1:
//TODO: Handle negative number
function decimalToBinary(num){
    if (num == 0) return "0";
    let digits = [];
    while(num > 0){
        const remainder = num % 2;
        num = parseInt(num / 2);
        digits.push(remainder);
    }
    let result = "";
    while (digits.length) {
        result += digits.pop();
    }
    return result;
}

/* 
Approach II: Using bitwise operator
Note: bitwise operators work faster than arithmetic operators used above
*/
function decimalToBinary(num){
    let binary = "";
    // Size of an integer is assumed to be 32 bits
    for (let i = 31; i >= 0;  i--){
        const k = num >> i;
        if (k & 1 > 0) {
            binary += "1";
        } else {
            if (binary.length) binary += "0";
        }
    }
    return binary;
}
