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
    //char is operand
    if (!precedenceMap[char]) {
      postfix += char;
    } else if (char === ")") {
      while (stack[stack.length - 1] !== "(") {
        postfix += stack.pop();
      }
      stack.pop();
    } else {
      //char is operator or "("
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
