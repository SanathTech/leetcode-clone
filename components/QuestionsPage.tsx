import {
  DocumentCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { DBProblem } from "@/utils/types/problem";
import { User } from "@/utils/types/user";

function QuestionsPage() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const problems = useGetProblems(setLoadingProblems);
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>({
    id: session?.user?.email,
    displayName: session?.user?.name,
    email: session?.user?.email,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    likedProblems: [],
    dislikedProblems: [],
    solvedProblems: [],
    starredProblems: [],
    fontSize: "16px",
  });

  useEffect(() => {
    const getUserData = async () => {
      if (session?.user?.email) {
        const docRef = doc(db, "users", session?.user?.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data() as User);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          const data = {
            id: session?.user?.email,
            displayName: session?.user?.name,
            email: session?.user?.email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            likedProblems: [],
            dislikedProblems: [],
            solvedProblems: [],
            starredProblems: [],
            fontSize: "16px",
          };
          await setDoc(doc(db, "users", session?.user?.email), data);
        }
      } else {
        console.log("No email");
      }
    };
    getUserData();
  }, [session]);

  return (
    <div className="flex">
      <div className="flex w-full justify-center p-8">
        <div className="flex flex-col w-11/12 max-w-4xl justify-between z-20">
          <h1 className="mx-auto pb-10">
            Try Solving One Of The Problems Below!
          </h1>
          <div className="flex flex-col">
            <div className="flex w-full border-b-[1px] border-[#3D3D3D] p-4">
              <div className="w-1/12">Status</div>
              <div className="w-5/12">Title</div>
              <div className="w-3/12">Category</div>
              <div className="w-1/12">Solution</div>
              <div className="w-2/12">Difficulty</div>
            </div>
            {loadingProblems && (
              <div className="animate-pulse">
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
            {!loadingProblems &&
              problems.map((problem, index) => {
                return (
                  <div
                    key={index}
                    className={`flex w-full p-4 ${
                      (index + 1) % 2 == 0 && "bg-[#2A2A2A]"
                    }`}
                  >
                    <div className="w-1/12 flex items-center">
                      {userData.solvedProblems.includes(problem.id) && (
                        <CheckCircleIcon className="w-6 ml-1 text-[#3FCA7D]" />
                      )}
                    </div>
                    {problem.link ? (
                      <a
                        href={problem.link}
                        className="w-5/12 hover:text-[#1B84FF] cursor-pointer"
                        target="_blank"
                      >
                        {problem.title}
                      </a>
                    ) : (
                      <a
                        href={`problems/${problem.id}`}
                        className="w-5/12 hover:text-[#1B84FF] cursor-pointer"
                      >
                        {problem.title}
                      </a>
                    )}

                    <div className="w-3/12">{problem.category}</div>
                    <div className="w-1/12 flex">
                      <DocumentCheckIcon className="w-6 ml-1 text-[#0A84FF] cursor-pointer" />
                    </div>
                    <div
                      className={`w-2/12 ${
                        problem.difficulty == "Easy"
                          ? "text-[#00AD7C]"
                          : problem.difficulty == "Medium"
                          ? "text-[#FFA11B]"
                          : "text-[#FF3750]"
                      }`}
                    >
                      {problem.difficulty}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-10 mt-4 mb-8 px-5">
      <div className="w-6 h-6 shrink-0 rounded-full bg-[#2A2A2A]"></div>
      <div className="h-4 w-[318px] rounded-full bg-[#2A2A2A]"></div>
      <div className="h-4 w-[178px] rounded-full bg-[#2A2A2A]"></div>
      <div className="h-4 w-8 rounded-full bg-[#2A2A2A]"></div>
      <div className="h-4 w-11 rounded-full bg-[#2A2A2A]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      // fetching data logic
      setLoadingProblems(true);
      const q = query(collection(db, "problems"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
    };
    getProblems();
  }, [setLoadingProblems]);
  return problems;
}
