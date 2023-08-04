"use client";
import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import Split from "react-split";
import { Problem } from "@/utils/types/problem";
import { problems } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import { ISettings } from "./Workspace";

type Props = {
  problem: Problem;
  email: string | null | undefined;
  id: string;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

interface EditorConfiguration {
  /** Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll). */
  lineWrapping?: boolean;
}

function PlayGround({
  problem,
  email,
  id,
  setSolved,
  setSettings,
  settings,
}: Props) {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [actual, setActual] = useState<any | undefined>(undefined);
  const [actualTF, setActualTF] = useState<boolean[] | undefined>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [testcaseActive, setTestcaseActive] = useState<boolean>(true);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);

  const handleSubmit = async () => {
    // try {
    userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
    const cb = new Function(`return ${userCode}`)();
    const [results, resultsTF, success] = problems[id].handlerFunction(cb);
    console.log(results);
    console.log(resultsTF);
    setActual(results);
    setActualTF(resultsTF);
    setSuccess(success);
    setTestcaseActive(false);
    if (success) {
      toast.success("Accepted", {
        style: {
          background: "#333",
          color: "#fff",
          marginRight: "70px",
          marginTop: "40px",
        },
      });
      const userRef = doc(db, "users", email!);
      await updateDoc(userRef, { solvedProblems: arrayUnion(id) });
      setSolved(true);
    } else {
      toast.error("One or more test cases failed.", {
        style: {
          background: "#333",
          color: "#fff",
          marginRight: "70px",
          marginTop: "40px",
        },
      });
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${id}`);
    setUserCode(code ? JSON.parse(code) : problem.starterCode);
  }, [id, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${id}`, JSON.stringify(value));
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div>
      {!isConsoleOpen ? (
        <div className="bg-[#282828] h-[calc(100vh-69px)] rounded-lg flex flex-col min-w-[354px]">
          {/* TABS */}
          <div className="flex w-full justify-between gap-8 px-5 h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
            <div className="flex items-center h-full hover:text-white cursor-pointer">
              <div className="mr-2">Javascript</div>
              <div>
                <ChevronDownIcon className="h-3 mt-[2px]" />
              </div>
            </div>
            <div className="flex items-center space-x-5 text-[#8A8A8A]">
              <button className="relative group">
                <div className="hover:text-[#eff1f6bf] cursor-pointer">
                  <BookmarkIcon className="h-4" />
                </div>
                <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[70px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  Submission Notes
                </div>
              </button>
              <button className="relative group">
                <div className="text-base mb-1 tracking-tight hover:text-[#eff1f6bf] cursor-pointer">
                  {"{ }"}
                </div>
                <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[112px] text-black text-sm m-4 shadow-md scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  Retrieve last submitted code
                </div>
              </button>
              <button className="relative group">
                <div className="-scale-x-100 hover:text-[#eff1f6bf] cursor-pointer">
                  <ArrowPathIcon className="h-4" />
                </div>
                <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[114px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  Reset to default code definition
                </div>
              </button>
              <button className="relative group">
                <div className="hover:text-[#eff1f6bf] cursor-pointer">
                  <Squares2X2Icon className="h-4" />
                </div>
                <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[64px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  Editor Shortcuts
                </div>
              </button>
              <button
                onClick={() => {
                  setSettings({ ...settings, settingsModalIsOpen: true });
                }}
                className="relative group"
              >
                <div className="hover:text-[#eff1f6bf] cursor-pointer">
                  <Cog6ToothIcon className="h-4" />
                </div>
                <div className="absolute group-hover:scale-100 top-5 -right-[38px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  Settings
                </div>
              </button>
              <button className="relative group" onClick={handleFullScreen}>
                <div className="hover:text-[#eff1f6bf] cursor-pointer">
                  {!isFullScreen ? (
                    <ArrowsPointingOutIcon className="h-4" />
                  ) : (
                    <ArrowsPointingInIcon className="h-4" />
                  )}
                </div>
                <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[34px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                  {!isFullScreen ? "Full screen" : "Exit Full Screen"}
                </div>
              </button>
            </div>
          </div>
          {/* CodeEditor */}
          <div className="w-full overflow-auto">
            <CodeMirror
              value={userCode}
              theme={vscodeDark}
              onChange={onChange}
              extensions={[javascript()]}
              style={{ fontSize: settings.fontSize }}
            />
          </div>
          {/* Console TAB */}
          <div className="flex w-full mt-auto justify-between gap-8 px-5 h-11 rounded-b-lg bg-[#303030] items-center text-xs border-t-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
            <button
              className="flex items-center h-full hover:text-white"
              onClick={() => setIsConsoleOpen(true)}
            >
              <div className="mr-2">Console</div>
              <div>
                <ChevronUpIcon className="h-3 mt-[2px]" />
              </div>
            </button>
            <div className="flex items-center space-x-5 text-white">
              <button
                onClick={handleSubmit}
                className="text-sm rounded-[4px] bg-[#ffffff1a] hover:bg-[#4D4D4D] px-5 py-1"
              >
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="text-sm rounded-[4px] bg-[#2cbb5d] hover:bg-[#4CC575] px-5 py-1"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Split
          className="h-[calc(100vh-69px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="bg-[#282828] rounded-lg flex flex-col min-w-[354px]">
            {/* TABS */}
            <div className="flex w-full justify-between gap-8 px-5 h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
              <div className="flex items-center h-full hover:text-white cursor-pointer">
                <div className="mr-2">Javascript</div>
                <div>
                  <ChevronDownIcon className="h-3 mt-[2px]" />
                </div>
              </div>
              <div className="flex items-center space-x-5 text-[#8A8A8A]">
                <button className="relative group">
                  <div className="hover:text-[#eff1f6bf] cursor-pointer">
                    <BookmarkIcon className="h-4" />
                  </div>
                  <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[70px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    Submission Notes
                  </div>
                </button>
                <button className="relative group">
                  <div className="text-base mb-1 tracking-tight hover:text-[#eff1f6bf] cursor-pointer">
                    {"{ }"}
                  </div>
                  <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[112px] text-black text-sm m-4 shadow-md scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    Retrieve last submitted code
                  </div>
                </button>
                <button className="relative group">
                  <div className="-scale-x-100 hover:text-[#eff1f6bf] cursor-pointer">
                    <ArrowPathIcon className="h-4" />
                  </div>
                  <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[114px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    Reset to default code definition
                  </div>
                </button>
                <button className="relative group">
                  <div className="hover:text-[#eff1f6bf] cursor-pointer">
                    <Squares2X2Icon className="h-4" />
                  </div>
                  <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[64px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    Editor Shortcuts
                  </div>
                </button>
                <button
                  onClick={() => {
                    setSettings({ ...settings, settingsModalIsOpen: true });
                  }}
                  className="relative group"
                >
                  <div className="hover:text-[#eff1f6bf] cursor-pointer">
                    <Cog6ToothIcon className="h-4" />
                  </div>
                  <div className="absolute group-hover:scale-100 top-5 -right-[38px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    Settings
                  </div>
                </button>
                <button className="relative group" onClick={handleFullScreen}>
                  <div className="hover:text-[#eff1f6bf] cursor-pointer">
                    {!isFullScreen ? (
                      <ArrowsPointingOutIcon className="h-4" />
                    ) : (
                      <ArrowsPointingInIcon className="h-4" />
                    )}
                  </div>
                  <div className="absolute group-hover:scale-100 min-w-max top-5 -right-[34px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                    {!isFullScreen ? "Full screen" : "Exit Full Screen"}
                  </div>
                </button>
              </div>
            </div>
            {/* CodeEditor */}
            <div className="w-full overflow-auto">
              <CodeMirror
                value={userCode}
                theme={vscodeDark}
                onChange={onChange}
                extensions={[javascript()]}
                style={{ fontSize: settings.fontSize }}
              />
            </div>
          </div>
          <div className="bg-[#282828] rounded-lg flex flex-col min-w-[354px]">
            {/* TABS */}
            <div className="flex w-full gap-8 px-5 min-h-[36px] h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
              <button
                onClick={() => setTestcaseActive(true)}
                className={`flex items-center ${
                  testcaseActive && "border-b-[2px] text-white pt-[2px]"
                } border-white h-full hover:text-white cursor-pointer`}
              >
                Testcase
              </button>
              <button
                onClick={() => setTestcaseActive(false)}
                className={`flex items-center ${
                  !testcaseActive && "border-b-[2px] text-white pt-[2px]"
                } border-white h-full hover:text-white cursor-pointer`}
              >
                Result
              </button>
            </div>
            {/* Console */}
            <div
              className={`flex flex-col w-full overflow-y-auto bg-[#282828] rounded-b-lg p-5 ${
                !actual &&
                !testcaseActive &&
                "items-center justify-center h-full"
              }`}
            >
              {success != undefined && !testcaseActive && (
                <div
                  className={`text-xl ${
                    success ? "text-green-500" : "text-red-500"
                  }  font-medium mb-4 -mt-1`}
                >
                  {success ? "Accepted" : "Wrong Answer"}
                </div>
              )}
              {/* Cases */}
              {!actual && !testcaseActive ? (
                <div className="text-sm text-[#ebebf54d]">
                  You must run your code first
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-3 text-sm tracking-tight items-center text-[#eff1f6bf]">
                    {problem.examples.map((example, index) => (
                      <button
                        onClick={() => setActiveTestCaseId(index)}
                        key={example.id}
                      >
                        <div
                          className={`${
                            index == activeTestCaseId &&
                            "bg-[#3E3E3E] text-white"
                          } hover:bg-[#464646] rounded-lg hover:text-white py-1 px-3`}
                        >
                          <pre className="flex items-center whitespace-pre-wrap">
                            {actualTF && !testcaseActive && (
                              <div
                                className={`h-1 w-1 mr-2 rounded-full ${
                                  actualTF[index]
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                            )}

                            <div>Case {index + 1}</div>
                          </pre>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <p className="font-medium text-xs text-[#eff1f6bf]">
                      Input:
                    </p>
                    <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                      <pre className="whitespace-pre-wrap">
                        {problem.examples[activeTestCaseId].inputText}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-xs text-[#eff1f6bf]">
                      Output:
                    </p>
                    <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                      <pre className="whitespace-pre-wrap">
                        {problem.examples[activeTestCaseId].outputText}
                      </pre>
                    </div>
                  </div>
                  {actual && !testcaseActive && (
                    <div>
                      <p className="font-medium text-xs text-[#eff1f6bf]">
                        Actual:
                      </p>
                      <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(actual[activeTestCaseId])}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Console TAB */}
            <div className="flex w-full mt-auto justify-between gap-8 px-5 h-11 rounded-b-lg bg-[#303030] items-center text-xs border-t-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
              <button
                className="flex items-center h-full hover:text-white"
                onClick={() => setIsConsoleOpen(false)}
              >
                <div className="mr-2">Console</div>
                <div>
                  <ChevronDownIcon className="h-3 mt-[2px]" />
                </div>
              </button>
              <div className="flex items-center space-x-5 text-white">
                <button
                  onClick={handleSubmit}
                  className="text-sm rounded-[4px] bg-[#ffffff1a] hover:bg-[#4D4D4D] px-5 py-1"
                >
                  Run
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-sm rounded-[4px] bg-[#2cbb5d] hover:bg-[#4CC575] px-5 py-1"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Split>
      )}
    </div>
  );
}

export default PlayGround;
