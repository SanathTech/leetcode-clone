"use client";
import NavbarSignedIn from "@/components/NavbarSignedIn";
import Workspace from "@/components/Workspace";
import { problems } from "@/utils/problems";

type Props = {
  params: {
    id: string;
  };
};

function ProblemsPage({ params: { id } }: Props) {
  const problem = problems[id];
  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col">
      <div className="bg-[#282828] shadow-md h-[52px]">
        <NavbarSignedIn problemPage id={id} />
      </div>
      <div className="relative">
        <Workspace problem={problem} id={id} />
      </div>
    </div>
  );
}

export default ProblemsPage;

// fetch the local data
// SSG
// getStaticPaths => it creates the dynamic routes
export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { id: key },
  }));
  return {
    paths,
    fallback: false,
  };
}
