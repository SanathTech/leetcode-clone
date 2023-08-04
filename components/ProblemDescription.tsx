import { Problem } from "@/utils/types/problem";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { DBProblem } from "@/utils/types/problem";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import RectangleSkeleton from "./RectangleSkeleton";
import CircleSkeleton from "./CircleSkeleton";

type Props = {
  problem: Problem;
  email: string | null | undefined;
  _solved: boolean;
};

function ProblemDescription({ problem, email, _solved }: Props) {
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem.id, email);
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction: any) => {
    const userRef = doc(db, "users", email!);
    const problemRef = doc(db, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);
    return { userRef, problemRef, userDoc, problemDoc };
  };

  const handleLike = async () => {
    if (updating) return;
    setUpdating(true);
    // if already liked, if already disliked, neither
    // transactions allows either all updates to happen, or none - enforcing consistency
    await runTransaction(db, async (transaction) => {
      const { userRef, problemRef, problemDoc, userDoc } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          // remove problem id from dislikedProblems and add problem id to likedProblems on user document, increment likes and decrement dislikes on problem document
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? {
                  ...prev,
                  likes: prev.likes + 1,
                  dislikes: prev.dislikes - 1,
                }
              : null
          );
          setData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
    if (updating) return;
    setUpdating(true);
    // if already liked, if already disliked, neither
    // transactions allows either all updates to happen, or none - enforcing consistency
    await runTransaction(db, async (transaction) => {
      const { userRef, problemRef, problemDoc, userDoc } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        if (disliked) {
          // remove problem id from dislikedProblems on user document, decrement dislikes on problem document
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: false }));
        } else if (liked) {
          // remove problem id from likedProblems and add problem id to dislikedProblems on user document, increment dislikes and decrement likes on problem document
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? {
                  ...prev,
                  dislikes: prev.dislikes + 1,
                  likes: prev.likes - 1,
                }
              : null
          );
          setData((prev) => ({ ...prev, disliked: true, liked: false }));
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleStar = async () => {
    if (updating) return;
    setUpdating(true);
    if (!starred) {
      const userRef = doc(db, "users", email!);
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setData((prev) => ({ ...prev, starred: true }));
    } else {
      const useRef = doc(db, "users", email!);
      await updateDoc(useRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setData((prev) => ({ ...prev, starred: false }));
    }
    setUpdating(false);
  };

  return (
    <div className="bg-[#282828] rounded-lg flex flex-col min-w-[354px]">
      {/* TABS */}
      <div className="flex w-full gap-8 px-4 h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
        <button className="flex items-center border-b-[2px] border-[#B3B3B3] h-full text-white">
          Description
        </button>
        <button className="hover:text-white">Editorial</button>
        <button className="hover:text-white">Solutions</button>
        <button className="hover:text-white">Submissions</button>
      </div>
      {/* Details */}
      <div className="flex flex-col w-full h-[calc(100vh-105px)] overflow-y-auto bg-[#282828] rounded-b-lg p-5">
        {/* Title */}
        <div className="flex w-full justify-between">
          <div className="text-lg font-medium">{problem.title}</div>
          <div className="flex items-center text-[#8A8A8A]">
            <button className="mr-5 text-sm hover:text-white hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              Hint
            </button>
            <button className="hover:text-white hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              <EllipsisHorizontalCircleIcon className="h-5" />
            </button>
          </div>
        </div>
        {/* Difficulty */}
        {!loading && currentProblem && (
          <div className="flex gap-5 items-center mt-3 text-[#8A8A8A]">
            <div className={`${problemDifficultyClass} text-sm`}>
              {currentProblem.difficulty}
            </div>
            {(solved || _solved) && (
              <div className="text-[#2CBB5D]">
                <CheckCircleIcon className="h-[18px]" />
              </div>
            )}
            <button
              className="flex items-center hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleLike}
            >
              <div className="mr-1">
                {!updating &&
                  (liked ? (
                    <HandThumbUpIcon className="h-[17px] text-blue-600" />
                  ) : (
                    <HandThumbUpIcon className="h-[17px]" />
                  ))}
                {updating && (
                  <ArrowPathIcon className="h-[17px] animate-spin" />
                )}
              </div>
              <div className="text-xs">{currentProblem.likes}</div>
            </button>
            <button
              className="flex items-center hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleDislike}
            >
              <div className="mr-1">
                {!updating &&
                  (disliked ? (
                    <HandThumbDownIcon className="h-[17px] text-red-600" />
                  ) : (
                    <HandThumbDownIcon className="h-[17px]" />
                  ))}
                {updating && (
                  <ArrowPathIcon className="h-[17px] animate-spin" />
                )}
              </div>
              <div className="text-xs">{currentProblem.dislikes}</div>
            </button>
            <button
              className="hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md"
              onClick={handleStar}
            >
              {!updating &&
                (starred ? (
                  <StarIconSolid className="h-[18px] text-yellow-500" />
                ) : (
                  <StarIconOutline className="h-[18px]" />
                ))}
              {updating && <ArrowPathIcon className="h-[17px] animate-spin" />}
            </button>
            <button className="hover:bg-[#3E3E3E] px-[5px] py-[3px] -mx-[5px] -my-[3px] rounded-md">
              <ArrowTopRightOnSquareIcon className="h-4" />
            </button>
          </div>
        )}

        {loading && (
          <div className="flex gap-[19px] mt-3">
            <RectangleSkeleton />
            {solved && <CircleSkeleton />}
            <RectangleSkeleton />
            <RectangleSkeleton />
            <CircleSkeleton />
            <CircleSkeleton />
          </div>
        )}

        {/* Description */}
        <div className="text-sm">
          <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
        </div>
        {/* Examples */}
        <div className="mt-12 space-y-4">
          {problem.examples.map((example, index) => (
            <div key={example.id}>
              <p className="font-bold text-sm">Example {index + 1}:</p>
              {example.img && (
                <img src={example.img} alt="example-image" className="mt-3" />
              )}
              <div className=" bg-[#373737] text-[#eff1f6bf] rounded-lg py-3 px-4 mt-[18px]">
                <pre className="whitespace-pre-wrap">
                  <strong className="text-white">Input: </strong>
                  {example.inputText}
                  <br />
                  <strong className="text-white">Output: </strong>
                  {example.outputText}
                  <br />
                  {example.explanation && (
                    <>
                      <strong className="text-white">Explanation: </strong>
                      {example.explanation}
                    </>
                  )}
                </pre>
              </div>
            </div>
          ))}
        </div>
        {/* Constraints */}
        <div className="mt-12">
          <div className="text-sm">
            <p className="font-bold text-sm">Constraints:</p>
            <ul className="list-disc ml-5 mt-5">
              <div
                dangerouslySetInnerHTML={{ __html: problem.constraints }}
                className="space-y-[14px]"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(db, "problems", problemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        setProblemDifficultyClass(
          problem.difficulty == "Easy"
            ? "text-[#00AD7C]"
            : problem.difficulty == "Medium"
            ? "text-[#FFA11B]"
            : "text-[#FF3750]"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(
  problemId: string,
  email: string | null | undefined
) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(db, "users", email!);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum, "jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };
    if (email) getUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, email]);

  return { ...data, setData };
}
