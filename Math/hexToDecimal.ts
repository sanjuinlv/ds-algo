function hexToDecimal(hex) {
  if (typeof hex !== 'string' || hex.length === 0) {
    return 'Invalid input';
  }

  const hexDigits = '0123456789ABCDEF';
  hex = hex.toUpperCase(); // Normalize to uppercase for consistency
  let decimal = 0;

  for (let i = 0; i < hex.length; i++) {
    const currentChar = hex[i];
    const value = hexDigits.indexOf(currentChar);

    if (value === -1) {
      return 'Invalid hex character: ' + currentChar;
    }

    decimal = decimal * 16 + value;
  }

  return decimal;
}

//Test cases
console.log(hexToDecimal("A"));      // Output: 10
console.log(hexToDecimal("FF"));     // Output: 255
console.log(hexToDecimal("0"));      // Output: 0
console.log(hexToDecimal("1000"));   // Output: 4096
console.log(hexToDecimal("1E240"));  // Output: 123456

/* 
Java code
class GFG {
  
    // Method
    // To convert hexadecimal to decimal
    static int hexadecimalToDecimal(String hexVal)
    {
        // Storing the length of the
        int len = hexVal.length();
  
        // Initializing base value to 1, i.e 16^0
        int base = 1;
  
        // Initially declaring and initializing
        // decimal value to zero
        int dec_val = 0;
  
        // Extracting characters as
        // digits from last character
  
        for (int i = len - 1; i >= 0; i--) {
  
            // Condition check
            // Case 1
            // If character lies in '0'-'9', converting
            // it to integral 0-9 by subtracting 48 from
            // ASCII value
            if (hexVal.charAt(i) >= '0'
                && hexVal.charAt(i) <= '9') {
                dec_val += (hexVal.charAt(i) - 48) * base;
  
                // Incrementing base by power
                base = base * 16;
            }
  
            // Case 2
            // if case 1 is bypassed
  
            // Now, if character lies in 'A'-'F' ,
            // converting it to integral 10 - 15 by
            // subtracting 55 from ASCII value
            else if (hexVal.charAt(i) >= 'A'
                     && hexVal.charAt(i) <= 'F') {
                dec_val += (hexVal.charAt(i) - 55) * base;
  
                // Incrementing base by power
                base = base * 16;
            }
        }
  
        // Returning the decimal value
        return dec_val;
    }
  
    // Method 2
    // Main driver method
    public static void main(String[] args)
    {
        // Custom input hexadecimal number to be
        // converted into decimal number
        String hexNum = "1A";
  
        // Calling the above method to convert and
        // alongside printing the hexadecimal number
        System.out.println(hexadecimalToDecimal(hexNum));
    }
}
*/
