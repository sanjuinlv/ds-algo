/* 
Given a string IP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address 
or "Neither" if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain 
leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses but "192.168.01.1",
 while "192.168.1.00" and "192.168@1.1" are invalid IPv4 addresses.

A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:
1 <= xi.length <= 4; xi is a hexadecimal string which may contain digits, lower-case English letter ('a' to 'f') and 
upper-case English letters ('A' to 'F').
Leading zeros are allowed in xi.

For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid
 IPv6 addresses, while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" 
 are invalid IPv6 addresses.

Input: IP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".

Input: IP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".

Input: IP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.

Input: IP = "2001:0db8:85a3:0:0:8A2E:0370:7334:"
Output: "Neither"

Input: IP = "1e1.4.5.6"
Output: "Neither"
// "20EE:FGb8:85a3:0:0:8A2E:0370:7334"
*/
/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function(IP) {
    let validIP = "Neither";
    const isHexaDecimal = char => {
        return ('a' <= char && char <= 'f')
            || ('0'.codePointAt(0) <= char.codePointAt(0) && char.codePointAt(0) <= '9'.codePointAt(0));
    }
    const isNumeric = char => {
        return ('0'.codePointAt(0) <= char.codePointAt(0) && char.codePointAt(0) <= '9'.codePointAt(0))
    }
    const isValidIPv4 = (IP) => {
        if (IP.length < 7 || IP.length > 15) return false;
        const ipParts = IP.split(".");
        if (ipParts.length != 4) return false;
        for (let i = 0; i < ipParts.length; i++) {
            //handle leading zeros check
            if (ipParts[i].length > 1 && ipParts[i][0] === '0') return false;
            //handle non-digits char
            const isNumericStr = [...ipParts[i]].every(char => isNumeric(char));
            console.log(`is ${ipParts[i]} numeric string: ${isNumericStr}`);
            if (!isNumericStr) return false;
            //handle the value range
            if (!(parseInt(ipParts[i]) >= 0 && parseInt(ipParts[i]) <= 255)) {
                return false;
            }
        }
        return true;
    }
    //handle IPV6
    const isValidIPv6 = (IP) => {
        if (IP.length < 15 || IP.length > 39) return false;
        const ipParts = IP.split(":");
        if (ipParts.length != 8) return false;
        for (let i = 0; i < ipParts.length; i++) {
            // handle the each part length
            if (!(ipParts[i].length >= 1 && ipParts[i].length <= 4)) return false;
            //handle alphanumeric
            const isAlphaNumericStr = [...ipParts[i]].every(char => isHexaDecimal(char.toLowerCase()));
            console.log(`is ${ipParts[i]} numeric string: ${isAlphaNumericStr}`);
            if (!isAlphaNumericStr) return false;
        }
        return true;

    }
    //valid IPv4 is: min length 4(num) + 3(dots) and must contains "."
    if (IP.indexOf(".") > 0) {
        console.log(`IPV4 address`);
        if (isValidIPv4(IP)) validIP = "IPv4";
    } else if (IP.indexOf(":") > 0) {
        console.log(`IPV6 address`)
        if (isValidIPv6(IP)) validIP = "IPv6";
    }
    console.log(`validIP: ${validIP}`);
    return validIP;
};

// for submission
/*
Time complexity: O(N)
Space Complexity: O(1)
Runtime: 80 ms
Memory Usage: 38.4 MB
Your runtime beats 43.44 % of javascript submissions.
Your memory usage beats 74.66 % of javascript submissions.
 */
var validIPAddress = function(IP) {
    let validIP = "Neither";

    const isHexaDecimal = char => {
        return ('a' <= char && char <= 'f')
            || ('0'.codePointAt(0) <= char.codePointAt(0) && char.codePointAt(0) <= '9'.codePointAt(0));
    }

    const isNumeric = char => {
        return ('0'.codePointAt(0) <= char.codePointAt(0) && char.codePointAt(0) <= '9'.codePointAt(0))
    }

    const isValidIPv4 = (IP) => {
        if (IP.length < 7 || IP.length > 15) return false;
        const ipParts = IP.split(".");
        if (ipParts.length != 4) return false;
        for (let i = 0; i < ipParts.length; i++) {
            if (ipParts[i].length > 1 && ipParts[i][0] === '0') return false;
            const isNumericStr = [...ipParts[i]].every(char => isNumeric(char));
            if (!isNumericStr) return false;
            if (!(parseInt(ipParts[i]) >= 0 && parseInt(ipParts[i]) <= 255)) {
                return false;
            }
        }
        return true;
    }

    const isValidIPv6 = (IP) => {
        if (IP.length < 15 || IP.length > 39) return false;
        const ipParts = IP.split(":");
        if (ipParts.length != 8) return false;
        for (let i = 0; i < ipParts.length; i++) {
            if (!(ipParts[i].length >= 1 && ipParts[i].length <= 4)) return false;
            const isAlphaNumericStr = [...ipParts[i]].every(char => isHexaDecimal(char.toLowerCase()));
            if (!isAlphaNumericStr) return false;
        }
        return true;
    }

    if (IP.indexOf(".") > 0) {
        if (isValidIPv4(IP)) validIP = "IPv4";
    } else if (IP.indexOf(":") > 0) {
        if (isValidIPv6(IP)) validIP = "IPv6";
    }
    return validIP;
};
