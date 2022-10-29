/* 
  For each character in the input stream {
      if (t is an operand) output t
      else if (t is right parentheses)
        Pop and output tokens until a left parentheses is popped (but not output)
      else //t is an operator or left parentheses
        pop and output tokens until one of lower priority than t is encountered or a left 
        parentheses is encountered or the stack is empty
        push t  
  }
  */
/* 
infixToPostfix("A*B-(C+D)+E") => "AB*CD+-E+"
infixToPostfix("(A+B)*C-D") => "AB+C*D-"
infixToPostfix("A+B-C") => "AB+C-"
*/
var infixToPostfix = (expression) => {
  let postfix = "";
  precedenceMap = { "(": 1, ")": 1, "+": 2, "-": 2, "*": 3, "/": 3 };
  const stack = [];
  for (let char of expression) {
    console.log(`char: ${char}, stack: ${stack}, postfix: ${postfix}`);
    //char is operand
    if (!precedenceMap[char]) {
      postfix += char;
    } else if (char === ")") {
      //until we find "(" remove items from stack
      while (stack[stack.length - 1] !== "(") {
        postfix += stack.pop();
      }
      //finally remove "("
      stack.pop();
    } else {
      //char is operator or "("
      //pop and output tokens until one of the lower priority than char is encountered
      // or a left parenthesis is encountered or stack is empty
      while (true) {
        if (
          stack.length == 0 ||
          precedenceMap[char] > precedenceMap[stack[stack.length - 1]] ||
          char == "("
        ) {
          stack.push(char);
          break;
        }
        postfix += stack.pop();
      }
    }
  }
  while (stack.length) {
    postfix += stack.pop();
  }
  return postfix;
};

var infixToPostfix = (expression) => {
  const stack = [];
  const postfix = [];
  const top = (A) => A[A.length - 1];
  precedenceMap = { "(": 1, ")": 1, "+": 2, "-": 2, "*": 3, "/": 3 };
  for (let char of expression) {
    console.log(`char: ${char}, stack: ${stack}, postfix: ${postfix}`);
    //char is operand
    if (!precedenceMap[char]) {
      postfix.push(char);
    } else {
      if (char === "(") {
        stack.push(char);
      } else {
        if (char === ")") {
          //remove items from stack until we find "("
          while (top(stack) !== "(") {
            postfix.push(stack.pop());
          }
          //finally remove "("
          stack.pop();
        } else {
          //char is operator or "("
          //pop and output tokens until one of the lower priority than char is encountered
          // or a left parenthesis is encountered or stack is empty
          if (precedenceMap[char] > precedenceMap[top(stack)]) {
            stack.push(char);
          } else {
            while (precedenceMap[char] <= precedenceMap[top(stack)]) {
              postfix.push(stack.pop());
            }
            stack.push(char);
          }
        }
      }
    }
  }
  while (stack.length) {
    postfix.push(stack.pop());
  }
  return postfix;
};

//final code
//"A*B-(C+D)+E" => "AB*CD+-E+"
var infixToPostfix = (expression) => {
  const stack = [];
  const postfix = [];
  const top = (A) => A[A.length - 1];
  precedenceMap = { "(": 1, ")": 1, "+": 2, "-": 2, "*": 3, "/": 3 };
  let currNum = 0;
  for (let char of expression) {
    console.log(`char: ${char}, stack: ${stack}, postfix: ${postfix}`);
    //char is operand
    if (!precedenceMap[char]) {
      currNum = currNum * 10 + parseInt(precedenceMap[char]);
      postfix.push(char);
    } else {
      currNum = 0;
      if (char === "(") {
        stack.push(char);
      } else {
        if (char === ")") {
          //remove items from stack until we find "("
          while (top(stack) !== "(") {
            postfix.push(stack.pop());
          }
          //finally remove "("
          stack.pop();
        } else {
          //char is operator or "("
          //pop and output tokens until one of the lower priority than 'char' is encountered
          // or a left parenthesis is encountered or stack is empty
          if (precedenceMap[char] > precedenceMap[top(stack)]) {
            stack.push(char);
          } else {
            while (precedenceMap[char] <= precedenceMap[top(stack)]) {
              postfix.push(stack.pop());
            }
            stack.push(char);
          }
        }
      }
    }
  }
  while (stack.length) {
    postfix.push(stack.pop());
  }
  return postfix.join("");
};

//Postfix evaluation
/* 
1. Scan the postfix string from left to right
2. initialize an empty stack
3. Repeat steps 4 and 5 till all the characters are scanned.
4. if the scanned character is operand, push it to the stack.
5. If the scanned character is operator, and if the operator is unary operator then  
   pop an element from the stack. If the operator is binary then pop two elements.
   Apply the operator to the popped elements. Store the result of this operator on stack.
6. return top of the stack, once all characters are processed
*/
