/*
  {"X" -> "123", "Y" -> "456"}
  
  "%X%_%Y%" -> Program -> "123_456"
  
  My assumption
  
  1. "%%" =>  ""
  2. There can be multiple character key to be replaced
  3. If there is single %, will keep it as it is? For now keep it as is 
  4. If the mapping is not definded for the key then we need to throw the error
  5. We can replace template left to right
  
  Test cases:
  - "%X%_%Y%" => "123_456" 
  - "ABC%X%+123" => "ABC123+123"
  - "ABC%X+123" => "ABC%X+123"
  - "ABC" => "ABC"
  - "ABC%Z%+123" => Throw eror
  - "%A%B%C%" => "%A<value_of_B>C%"
  - "%A%B%C%" => "%A%B<value_of_c>" => "<value_of_A>B<value_of_c>"
  - "%%B%%"
  - { "X" -> "Some value %A%" }
  
 input -  "%A%B%C%"
 countOfTemplateIdentifier = 1
 stack = ["<value_of_A>","B", "<value_of_C>" ]
 key = "C"
 

 input -   "%%B%%"
 countOfTemplateIdentifier = 1
 stack = ["%", ]
 key = ""

*/
//let templateMap = {"X": 123, "Y": 456, "123": "Z", "Z": "W"}
// console.log(`result: ${replaceTemplate("%X%_%Y%", templateMap)}`);
function replaceTemplate(str, templateMap) {
  const stack = [];
  let countOfTemplateIdentifier = 0; // '%'
  const top = (stack) => stack[stack.length - 1];

  for (let i = 0; i < str.lenght; i++) {
    //if we not got yet any replacement character then we keep adding to the stack
    if (str[i] !== "%" || countOfTemplateIdentifier == 0) {
      if (str[i] === "%") countOfTemplateIdentifier++;
      stack.push(str[i]);
    } else {
      //get the key string from stack
      let key = "";
      //remove from the stack until we get "%"
      while (top(stack) !== "%") {
        key = stack.pop() + key;
      }
      //remove the '%' character
      stack.pop();
      //decrease the template identifier count
      countOfTemplateIdentifier--;
      //push the value of the key to the stack
      stack.push(templateMap.get(key));
    }
  }
  //final string
  let result = "";
  while (stack.length > 0) {
    result = stack.pop() + result;
  }
  return result;
}

//handle nested template
//console.log(`result: ${replaceTemplate("%%%X%%%", templateMap)}`);
function replaceTemplate(str, templateMap) {
  const stack = [];
  let countOfTemplateIdentifier = 0; // '%'
  const top = (stack) => stack[stack.length - 1];

  for (let i = 0; i < str.length; i++) {
    console.log(stack);
    // add to the stack when
    //char is non template char OR top of stack is template char OR tempate Char count is zero
    if (
      str[i] !== "%" ||
      top(stack) === "%" ||
      countOfTemplateIdentifier == 0
    ) {
      if (str[i] === "%") countOfTemplateIdentifier++;
      stack.push(str[i]);
    } else {
      //get the key string from stack
      let key = "";
      //remove from the stack until we get "%"
      while (top(stack) !== "%") {
        key = stack.pop() + key;
      }
      //remove the '%' character
      stack.pop();
      //decrease the template identifier count
      countOfTemplateIdentifier--;
      //push the value of the key to the stack
      stack.push(templateMap[key]);
    }
  }
  //final string
  let result = "";
  while (stack.length > 0) {
    result = stack.pop() + result;
  }
  return result;
}
