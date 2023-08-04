import assert from "assert";
import { Problem } from "../types/problem";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";

export const search2DMatrixHandler = (fn: any) => {
  const tests = [
    {
      matrix: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      target: 3,
    },
    {
      matrix: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      target: 13,
    },
    {
      matrix: [[1]],
      target: 1,
    },
  ];
  const answers = [true, false, true];

  const results = [];
  const resultsTF = [];
  let success = true;

  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i].matrix, tests[i].target);
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
const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your own code or uncomment the sample code below!
  
  // // Create two variable r = 0, c = matrix[0].size() - 1 as index of row and column....
  // let r = 0;
  // let c = matrix[0].length-1;
  // // Run a while loop and traverse all the elements until row is equal to the size of the matrix...
  // while(r < matrix.length && c >= 0) {
  //   // If the element is equal to the target, return true...
  //   if(target == matrix[r][c])
  //     return true;
  //   // Check if the current element is greater than target...
  //   else if(matrix[r][c] > target)
  //     c--;
  //   // If the current element is less than target...
  //   else 
  //     r++;
  // }
  // return false;       // As we didn't get the target, we can directly return false...
};`;

export const search2DMatrix: Problem = {
  id: "search-a-2d-matrix",
  title: "5. Search a 2D Matrix",
  problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <code>matrix</code>, an <code>m x n</code> matrix, and <code>target</code>, return <code>true</code> if <code>target</code> is in the matrix, and <code>false</code> otherwise.</p>
  `,
  examples: [
    {
      id: 0,
      inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
      outputText: `true`,
      img: example1.src,
    },
    {
      id: 1,
      inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
      outputText: `false`,
      img: example2.src,
    },
    {
      id: 2,
      inputText: `matrix = [[1]], target = 1`,
      outputText: `true`,
    },
  ],
  constraints: `
  <li><code>m == matrix.length</code></li>
  <li><code>n == matrix[i].length</code></li>
  <li><code>1 <= m, n <= 100</code></li>
  <li><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
  starterCode: starterCodeSearch2DMatrixJS,
  handlerFunction: search2DMatrixHandler,
  starterFunctionName: "function searchMatrix",
  order: 5,
};
