import assert from "assert";
import { Problem } from "../types/problem";

export const jumpGameHandler = (fn: any) => {
  const tests = [
    [2, 3, 1, 1, 4],
    [3, 2, 1, 0, 4],
    [2, 0, 0],
    [2, 5, 0, 0],
  ];
  const answers = [true, false, true, true];

  const results = [];
  const resultsTF = [];
  let success = true;

  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    results[i] = result;
    try {
      assert.equal(result, answers[i]);
      resultsTF[i] = true;
    } catch (error) {
      resultsTF[i] = false;
      success = false;
    }
  }
  return [results, resultsTF, success];
};

const starterCodeJumpGameJS = `function canJump(nums) {
  // Write your own code or uncomment the sample code below!
  
  // // Base condition...
  // if(nums.length <= 1)
  //   return true;
  // // To keep the maximum index that can be reached...
  // let maximum = nums[0];
  // // Traverse all the elements through loop...
  // for(let i = 0; i < nums.length; i++){
  //   //if there is no way to jump to next...
  //   // so we should return false...
  //   if(maximum <= i && nums[i] == 0) 
  //       return false;
  //   //update the maximum jump...    
  //   if(i + nums[i] > maximum){
  //       maximum = i + nums[i];
  //   }
  //   //maximum is enough to reach the end...
  //   if(maximum >= nums.length-1) 
  //       return true;
  // }
  // return false;
}`;

export const jumpGame: Problem = {
  id: "jump-game",
  title: "3. Jump Game",
  problemStatement: `<p class='mt-3'>
  You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
  and each element in the array represents your maximum jump length at that position.
</p>
  <p class='mt-3'>
  Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
  </p>
`,

  examples: [
    {
      id: 0,
      inputText: `nums = [2,3,1,1,4]`,
      outputText: `true`,
      explanation:
        "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
    },
    {
      id: 1,
      inputText: `nums = [3,2,1,0,4]`,
      outputText: `false`,
      explanation:
        "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
    },
  ],
  constraints: `<li><code>1 <= nums.length <= 10<sup>4</sup></code></li>
    <li><code>0 <= nums[i] <= 10<sup>5</sup></code></li>`,
  starterCode: starterCodeJumpGameJS,
  handlerFunction: jumpGameHandler,
  starterFunctionName: "function canJump(",
  order: 3,
};
