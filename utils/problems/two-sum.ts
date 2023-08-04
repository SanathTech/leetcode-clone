import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeTwoSum = `function twoSum(nums,target){
  // Write your own code or uncomment the sample code below!
  
  // const hashTable = {}
  // for (let i=0; i<nums.length; i++) {
  //   let neededVal = target - nums[i]
  //   if (!(neededVal in hashTable)) {
  //     hashTable[nums[i]] = i
  //   } else {
  //     return [hashTable[neededVal],i]
  //   }
  // }
};`;

// checks if the user has the correct code
const handlerTwoSum = (fn: any) => {
  // fn is the callback that user's code is passed into
  const nums = [
    [2, 7, 11, 15],
    [3, 2, 4],
    [3, 3],
  ];
  const targets = [9, 6, 6];
  const answers = [
    [0, 1],
    [1, 2],
    [0, 1],
  ];

  const results = [];
  const resultsTF = [];
  let success = true;

  // loop all tests to check if the user's code is correct
  for (let i = 0; i < nums.length; i++) {
    // result is the output of the user's function and the answer is the expected output
    const result = fn(nums[i], targets[i]);
    results[i] = result;
    try {
      assert.deepStrictEqual(result, answers[i]);
      resultsTF[i] = true;
    } catch {
      resultsTF[i] = false;
      success = false;
    }
  }
  return [results, resultsTF, success];
};

export const twoSum: Problem = {
  id: "two-sum",
  title: "1. Two Sum",
  problemStatement: `<p class="mt-3">
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class="mt-3">
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use thesame element twice.
</p>
<p class="mt-3">You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0,1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1,2].",
    },
    {
      id: 3,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0,1]",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10<sup>4</sup></code>
</li> <li class='mt-2'>
<code>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></code>
</li> <li class='mt-2'>
<code>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></code>
</li>
<li class='mt-2 text-sm'>
<strong>Only one valid answer exists.</strong>
</li>`,
  handlerFunction: handlerTwoSum,
  starterCode: starterCodeTwoSum,
  order: 1,
  starterFunctionName: "function twoSum(",
};
