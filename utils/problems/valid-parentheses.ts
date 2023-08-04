import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your own code or uncomment the sample code below!
  
  // // Initialize stack to store the closing brackets expected...
  // let stack = [];
  // // Traverse each charater in input string...
  // for (let idx = 0; idx < s.length; idx++) {
  //   // If open parentheses are present, push it to stack...
  //   if (s[idx] == '{') {
  //     stack.push('}');
  //   } else if (s[idx] == '[') {
  //     stack.push(']');
  //   } else if (s[idx] == '(') {
  //     stack.push(')');
  //   }
  //   // If a close bracket is found, check that it matches the last stored open bracket
  //   else if (stack.pop() !== s[idx]) {
  //     return false;
  //   }
  // }
  // return !stack.length;
};`;

const validParenthesesHandler = (fn: any) => {
  const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
  const answers = [true, true, false, false, true];

  const results = [];
  const resultsTF = [];
  let success = true;

  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    results[i] = result;
    try {
      assert.deepEqual(result, answers[i]);
      resultsTF[i] = true;
    } catch {
      resultsTF[i] = false;
      success = false;
    }
  }
  return [results, resultsTF, success];
};

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "4. Valid Parentheses",
  problemStatement: `<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul> <li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li class='mt-3'>Open brackets must be closed in the correct order.</li>
	<li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
	</ul>`,
  examples: [
    {
      id: 0,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 1,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 3,
      inputText: 's = "([)]"',
      outputText: "false",
    },
  ],
  constraints: `<li><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
  handlerFunction: validParenthesesHandler,
  starterCode: starterCodeValidParenthesesJS,
  starterFunctionName: "function validParentheses(",
  order: 4,
};
