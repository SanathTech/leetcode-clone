"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProblemDescription from "./ProblemDescription";
import Split from "react-split";
import PlayGround from "./PlayGround";
import { Problem } from "@/utils/types/problem";
import SettingsModal from "./SettingsModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
  problem: Problem;
  id: string;
};

export interface ISettings {
  fontSize: string | undefined;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

function Workspace({ problem, id }: Props) {
  const { data: session } = useSession();
  const [solved, setSolved] = useState(false);
  const [settings, setSettings] = useState<ISettings>({
    fontSize: undefined,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  useEffect(() => {
    const getUserFontSize = async () => {
      const userRef = doc(db, "users", session?.user?.email!);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const { fontSize } = data;
        setSettings({
          ...settings,
          fontSize: fontSize,
        });
      }
    };
    if (session?.user?.email) getUserFontSize();
    return () => setSettings({ ...settings, fontSize: undefined });
  }, [session]);

  return (
    <div>
      {settings.settingsModalIsOpen && (
        <SettingsModal
          setSettings={setSettings}
          settings={settings}
          email={session?.user?.email}
        />
      )}
      {!session || !settings.fontSize ? (
        <div className="animate-pulse">
          <LoadingSkeleton />
        </div>
      ) : (
        <Split className="split p-2" minSize={354}>
          <div className="">
            <ProblemDescription
              problem={problem}
              email={session?.user?.email}
              _solved={solved}
            />
          </div>
          <div className="">
            <PlayGround
              problem={problem}
              email={session?.user?.email}
              id={id}
              setSolved={setSolved}
              setSettings={setSettings}
              settings={settings}
            />
          </div>
        </Split>
      )}
    </div>
  );
}

export default Workspace;

const LoadingSkeleton = () => {
  return (
    <div className="flex w-full h-[calc(100vh-52px)]">
      <div className="flex bg-[#1A1A1A] w-1/2 h-full">
        <div className="bg-[#282828] w-full m-2 mr-[5px] rounded-lg"></div>
      </div>
      <div className="flex bg-[#1A1A1A] w-1/2 h-full">
        <div className="flex flex-col justify-between w-full m-2 ml-[5px] rounded-lg">
          <div className="bg-[#282828] w-full h-[calc(60%-5px)] rounded-lg"></div>
          <div className="bg-[#282828] w-full h-[calc(40%-5px)] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
