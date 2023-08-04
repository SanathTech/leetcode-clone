"use client";
import { signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { useRouter } from "next/navigation";

type Props = {
  problemPage?: boolean;
  id?: string;
};

function NavbarSignedIn({ problemPage, id }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[id!] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );
    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };
  return (
    <div className="flex w-full h-full justify-center py-1 z-10">
      <div
        className={`flex items-center ${
          problemPage ? "w-full mx-5" : "w-11/12 max-w-6xl"
        } justify-between`}
      >
        {/* Logo & Site Name */}
        <a href="/" className="flex items-center">
          <div>
            <img
              className={`mr-4 ${problemPage ? "h-5" : "h-7"}`}
              src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
            />
          </div>
          {!problemPage && <div className="text-xl mr-6">LeetCloned</div>}
        </a>
        {problemPage && (
          <div className="flex items-center mr-auto space-x-2">
            <a
              href="/"
              className="flex items-center gap-2 text-[#777777] hover:text-white hover:bg-[#393939] px-2 py-1 rounded mr-2"
            >
              <div>
                <Bars4Icon className="h-5" />
              </div>
              <div className="mb-[1px] mr-[2px] text-[#f5f5f5bf] font-medium text-sm hover:text-white">
                Problem List
              </div>
            </a>
            <div
              onClick={() => handleProblemChange(false)}
              className="text-gray-400 border-[#f7faff1f] border-[1.4px] hover:text-white hover:border-[#505051] rounded px-1 py-1 cursor-pointer hover:bg-[#393939]"
            >
              <ChevronLeftIcon className="h-3" />
            </div>
            <div
              onClick={() => handleProblemChange(true)}
              className="text-gray-400 border-[#f7faff1f] border-[1.4px] hover:text-white hover:border-[#505051] rounded px-1 py-1 cursor-pointer hover:bg-[#393939]"
            >
              <ChevronRightIcon className="h-3" />
            </div>
          </div>
        )}
        {/* Menu Items */}
        <div className="flex items-center space-x-6">
          <div className="hover:bg-[#464646] text-sm rounded-md px-3 py-1 cursor-pointer text-[#fea116] bg-[#ffffff1a]">
            Buy Me A Coffee
          </div>
          {!session ? (
            <div className="animate-pulse">
              <LoadingAvatar />
            </div>
          ) : (
            <div className="relative group">
              <img
                src={session.user?.image!}
                alt="Profile Picture"
                className="h-7 w-7 rounded-full cursor-pointer hover:opacity-80"
              />
              <div className="absolute font-medium group-hover:scale-100 min-w-max top-[33px] -right-[81px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
                {session.user?.email!}
              </div>
            </div>
          )}
          <div className="relative group">
            <button
              onClick={() => signOut()}
              className="text-[#fea116] hover:bg-[#464646] rounded-md px-1 py-1 cursor-pointer bg-[#ffffff1a]"
            >
              <ArrowRightOnRectangleIcon className="h-[19px] ml-[2px]" />
            </button>
            <div className="absolute font-medium group-hover:scale-100 min-w-max top-8 -right-[28px] text-black text-sm shadow-md m-2 scale-0 z-10 bg-gray-200 pt-[6px] pb-2 px-3 rounded-md origin-center transition-all duration-100 ease-linear">
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarSignedIn;

const LoadingAvatar = () => {
  return (
    <div className="">
      <div className="h-7 w-7 rounded-full cursor-pointer hover:opacity-80 bg-gray-400"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
