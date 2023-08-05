import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* A New Way to Learn */}
      <div className="flex w-full justify-center p-4 pt-24 pb-8 m-auto">
        <div className="absolute h-[850px] w-[150%] -top-[300px] rotate-12 z-10 overflow-hidden bg-gradient-to-bl from-[#222222] to-[#373737]"></div>
        <div className="flex w-11/12 max-w-6xl justify-between items-center text-center z-20">
          <div className="mr-20 ml-4 max-w-md">
            <img src="Tablet.png" alt="tablet" />
          </div>
          <div className="flex flex-col space-y-8 max-w-lg mr-8">
            <h1 className="text-4xl font-semibold pb-2">A New Way to Learn</h1>
            <p className="leading-loose text-stone-400">
              LeetCloned is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
            <button
              onClick={() => signIn("google")}
              className="bg-[#1da09c] hover:bg-[#17807D] opacity-90 font-light w-[152px] rounded-full py-2 mx-auto flex items-center justify-center pl-1"
            >
              <div>Create Account</div>
              <ChevronRightIcon className="h-3 ml-1 mt-[3px]" />
            </button>
          </div>
        </div>
      </div>
      {/* Explore */}
      <div
        className="flex w-full justify-center p-4 pb-16 m-auto z-20"
        id="explore"
      >
        <div className="flex w-11/12 max-w-6xl justify-between text-right">
          <div className="flex flex-col space-y-5 max-w-lg mt-10 ml-14">
            <div className="flex items-center">
              <h2 className="text-2xl text-[#1da09c] font-semibold ml-auto mr-8">
                Start Exploring
              </h2>
              <div className="w-16 mr-[-30px]">
                <img src="ExploringIcon.png" alt="" />
              </div>
            </div>
            <p className="leading-loose text-stone-400">
              Explore is a well-organized tool that helps you get the most out
              of LeetCloned by providing structure to guide your progress
              towards the next step in your programming career.
            </p>
            <button className="text-[#0088cc] hover:text-[#53C2FF] rounded-full ml-auto flex items-center justify-center">
              <div>Get Started</div>
              <ChevronRightIcon className="h-3 ml-1 mt-[4px]" />
            </button>
          </div>
          <div className="max-w-md">
            <img src="WebPages.png" alt="web-pages" />
          </div>
        </div>
      </div>
      {/* Product */}
      <div className="flex w-full justify-center p-4 pb-6 m-auto" id="product">
        <div className="absolute h-[800px] w-[150%] top-[950px] -rotate-12 z-0 bg-[#F7F9FC] overflow-hidden"></div>
        <div className="flex w-11/12 max-w-6xl justify-between text-left z-20">
          <div className="flex flex-col space-y-5 max-w-lg mt-5 ml-5">
            <div className="w-[151px] mb-2">
              <img src="QuestionsIcon.png" alt="" />
            </div>
            <h2 className="text-2xl text-[#259AF3] font-semibold mr-auto">
              Questions, Community & Contests
            </h2>
            <p className="leading-loose text-stone-400">
              Over 2900 questions for you to practice. Come and join one of the
              largest tech communities with hundreds of thousands of active
              users and participate in our contests to challenge yourself and
              earn <br></br> rewards.
            </p>
            <button className="text-[#0088cc] hover:text-[#53C2FF] rounded-full mr-auto flex items-center justify-center">
              <div>View Questions</div>
              <ChevronRightIcon className="h-3 ml-1 mt-[4px]" />
            </button>
          </div>
          <div className="border-l-[2px] border-white w-1/2">
            <div className="flex flex-col space-y-5 max-w-lg my-5 ml-14">
              <div className="w-[107px] mb-2">
                <img src="CompaniesIcon.png" alt="" />
              </div>
              <h2 className="text-2xl text-[#B7892B] font-semibold mr-auto">
                Companies & Candidates
              </h2>
              <p className="leading-loose text-stone-400">
                Not only does LeetCloned prepare candidates for technical
                interviews, we also help companies identify top technical
                talent. From sponsoring contests to providing online assessments
                and training, we offer numerous services to businesses.
              </p>
              <button className="text-[#0088cc] hover:text-[#53C2FF] rounded-full mr-auto flex items-center justify-center">
                <div>Business Opportunities</div>
                <ChevronRightIcon className="h-3 ml-1 mt-[4px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Developer */}
      <div
        className="flex w-full justify-center p-4 pt-0 pb-28 m-auto z-20 bg-[#F7F9FC]"
        id="developer"
      >
        <div className="flex w-11/12 max-w-6xl justify-center text-center">
          <div className="flex flex-col space-y-5 max-w-[940px] mt-14">
            <div className="w-16 mb-2 mx-auto">
              <img src="DeveloperIcon.png" alt="" />
            </div>
            <h2 className="text-2xl text-[#1da09c] font-semibold mx-auto">
              Developer
            </h2>
            <p className="leading-loose max-w-xl text-stone-400 mx-auto">
              We now support 14 popular coding languages. At our core,
              LeetCloned is about developers. Our powerful development tools
              such as Playground help you test, debug and even write your own
              projects online.
            </p>
            <div className="w-full">
              <img src="CodeEditor.png" alt="code-editor" />
            </div>
          </div>
        </div>
      </div>
      {/* Made with Love */}
      <div className="flex w-full justify-center p-4 pb-10 m-auto z-20 bg-white">
        <div className="flex flex-col w-11/12 max-w-6xl justify-center text-center items-center mt-[-101px]">
          <div className="flex flex-col space-y-5 max-w-[600px] mt-14">
            <div className="w-16 mb-2 mx-auto">
              <img src="SFIcon.png" alt="" />
            </div>
            <div className="flex mx-auto">
              <h2 className="text-2xl text-[#C62828] font-semibold">
                Made with
              </h2>
              <HeartIcon className="w-6 mx-2 text-[#C62828]" />
              <h2 className="text-2xl text-[#C62828] font-semibold">in SF</h2>
            </div>
            <p className="leading-loose text-stone-400">
              At LeetCloned, our mission is to help you improve yourself and
              land your dream job. We have a sizable repository of interview
              resources for many companies. In the past few years, our users
              have landed jobs at top companies around the world.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center max-w-5xl mt-10">
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/facebook.svg"
                alt=""
                className="h-12 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/leap-motion.svg"
                alt=""
                className="h-10 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/apple.svg"
                alt=""
                className="h-9 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/uber.svg"
                alt=""
                className="h-4 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/squarespace.svg"
                alt=""
                className="h-10 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/jet.svg"
                alt=""
                className="h-6 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/intel.svg"
                alt=""
                className="h-10 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/amazon.svg"
                alt=""
                className="h-7 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/bank-of-america.svg"
                alt=""
                className="h-6 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/pinterest.svg"
                alt=""
                className="h-6 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/cisco.svg"
                alt=""
                className="h-10 opacity-20 brightness-0"
              />
            </div>
            <div className="m-5">
              <img
                src="https://leetcode.com/static/images/landing_page/stripe.svg"
                alt=""
                className="h-7 opacity-20 brightness-0"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Join Our Team */}
      <div className="flex w-full justify-center p-4 pt-0 mx-auto my-0 bg-white z-20">
        <div className="flex w-11/12 max-w-6xl justify-center text-center">
          <div className="flex flex-col space-y-5 max-w-xl mb-12">
            <p className="leading-loose text-stone-400 border-t-[1px] border-[#dddddd] pt-[70px]">
              If you are passionate about tackling some of the most interesting
              problems around, we would love to hear from you.
            </p>
            <button className="text-[#0088cc] hover:text-[#53C2FF] rounded-full mx-auto flex items-center justify-center">
              <div>Join Our Team</div>
              <ChevronRightIcon className="h-3 ml-1 mt-[4px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
