/**
Every email consists of a local name and a domain name, separated by the @ sign.
For example, in alice@leetcode.com, alice is the local name, and leetcode.com is the domain name.
Besides lowercase letters, these emails may contain '.'s or '+'s.
If you add periods ('.') between some characters in the local name part of an email address, 
mail sent there will be forwarded to the same address without dots in the local name. 
For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address. 
 (Note that this rule does not apply for domain names.)
If you add a plus ('+') in the local name, everything after the first plus sign will be ignored. 
This allows certain emails to be filtered, for example m.y+name@email.com will be forwarded to
 my@email.com.  (Again, this rule does not apply for domain names.)
It is possible to use both of these rules at the same time.
Given a list of emails, we send one email to each address in the list.  
How many different addresses actually receive mails? 

Input: ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails

1 <= emails[i].length <= 100
1 <= emails.length <= 100
Each emails[i] contains exactly one '@' character.
All local and domain names are non-empty.
Local names do not start with a '+' character.
 * EASY
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
    let uniqueEmails = new Set();
    emails.forEach(email => {
        const emailParts = email.split("@");
        let localName = emailParts[0];
        const domainName = emailParts[1];
        console.log(`localName: ${localName}, domainName: ${domainName}`);
        //replace '.'
        localName = localName.replace(/\./g, "");
        console.log(`localName after trimming: ${localName}`);
        //find index of '+'
        const plusIndex = localName.indexOf("+");
        if (plusIndex > 0) {
            //store text upto only '+, excluding '+'
            localName = localName.substring(0, plusIndex);
            console.log(`localName after excluding +: ${localName}`);
        }
        const uniqueId = `${localName}@${domainName}`;
        console.log(`updated email id: ${uniqueId}`);
        if (!uniqueEmails.has(uniqueId)) {
            uniqueEmails.add(uniqueId);
        }
    });
    return [...uniqueEmails];
};

// better solution?, without vising the charater twice, once for "." and again for '+'
var numUniqueEmails = function(emails) {
    let uniqueEmails = new Set();
    emails.forEach(email => {
        const emailParts = email.split("@");
        let localName = emailParts[0];
        const domainName = emailParts[1];
        console.log(`localName: ${localName}, domainName: ${domainName}`);
        const localNameSize = localName.length;
        const validChars = [];
        for (let i = 0; i < localNameSize; i++) {
            const char = localName.charAt(i);
            if (char === ".") {
                continue;
            }
            if (char === "+") {
                break;
            }
            validChars.push(char);
        }
        localName = validChars.join("");
        console.log(`localName after excluding +: ${localName}`);
        const uniqueId = `${localName}@${domainName}`;
        console.log(`updated email id: ${uniqueId}`);
        if (!uniqueEmails.has(uniqueId)) {
            uniqueEmails.add(uniqueId);
        }
    });
    return [...uniqueEmails];
};

// for submission
// Your runtime beats 64.71 % of javascript submissions.
var numUniqueEmails = function(emails) {
    let uniqueEmails = new Set();
    emails.forEach(email => {
        const emailParts = email.split("@");
        let localName = emailParts[0];
        const domainName = emailParts[1];
        const validChars = [];
        for (let i = 0; i < localName.length; i++) {
            const char = localName.charAt(i);
            if (char === ".") {
                continue;
            }
            if (char === "+") {
                break;
            }
            validChars.push(char);
        }
        localName = validChars.join("");
        const uniqueId = `${localName}@${domainName}`;
        if (!uniqueEmails.has(uniqueId)) {
            uniqueEmails.add(uniqueId);
        }
    });
    // console.log(`uniqueEmails: ${Array.from(uniqueEmails)}`)
    return uniqueEmails.size;
};
