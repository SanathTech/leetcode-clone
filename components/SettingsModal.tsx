import { doc, updateDoc } from "firebase/firestore";
import { ISettings } from "./Workspace";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/firebase";

const EDITOR_FONT_SIZES = [
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
  "19px",
  "20px",
  "21px",
];

export type Props = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
  email: string | null | undefined;
};

function SettingsModal({ setSettings, settings, email }: Props) {
  const userRef = doc(db, "users", email!);
  const handleFontSize = async (fontSize: string) => {
    setSettings({ ...settings, fontSize: fontSize });
    await updateDoc(userRef, { fontSize: fontSize });
  };
  return (
    <div className="absolute w-full h-full z-40">
      <div className="bg-[#262626] bg-opacity-60 w-full h-full flex justify-center items-center">
        <div className="w-[600px] h-[322px] bg-[#303030] z-50 shadow-2xl rounded-xl mb-14 border-[#181818] border-[1px]">
          <div className="flex py-4 px-5 justify-between border-b-[1px] border-[#3d3d3d]">
            <div className="text-lg font-medium">Settings</div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  settingsModalIsOpen: false,
                  dropdownIsOpen: false,
                })
              }
              className="text-gray-400"
            >
              <XMarkIcon className="h-6" />
            </button>
          </div>
          <div className="flex py-4 px-[22px] justify-between">
            <div>
              <div className="font-medium">Font Size</div>
              <div className="text-sm text-[#eff2f699] mt-[6px] mr-10">
                Choose your preferred font size for the code editor.
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    dropdownIsOpen: !settings.dropdownIsOpen,
                  })
                }
                className="flex w-40 justify-between bg-[#ffffff1a] px-3 py-[6px] items-center rounded-md"
              >
                <div className="text-sm">{settings.fontSize}</div>
                <div>
                  <ChevronDownIcon className="h-4" />
                </div>
              </button>
              {settings.dropdownIsOpen && (
                <ul className="absolute w-40 h-56 overflow-y-auto mt-1 p-2 bg-[#303030] rounded-md shadow-lg border-[#181818] border-[1px]">
                  {EDITOR_FONT_SIZES.map((fontSize, idx) => {
                    return (
                      <li
                        className={`flex justify-between text-[#eff1f6bf] items-center p-[6px] text-sm hover:bg-[#3F3F3F] rounded-md cursor-pointer ${
                          settings.fontSize === fontSize &&
                          "font-medium text-white"
                        }`}
                        key={idx}
                        onClick={() => handleFontSize(fontSize)}
                      >
                        <div>{fontSize}</div>
                        <div>
                          {settings.fontSize === fontSize && (
                            <CheckIcon className="h-4 text-[#0a84ff]" />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="flex py-2 px-[22px] justify-between">
            <div>
              <div className="font-medium">Key binding</div>
              <div className="text-sm text-[#eff2f699] mt-[6px] mr-10">
                Want to practice Vim or Emacs? We have these key binding options
                available for you.
              </div>
            </div>
            <div>
              <div className="flex w-40 justify-between bg-[#ffffff1a] px-3 py-[6px] items-center rounded-md">
                <div className="text-sm">Standard</div>
                <div>
                  <ChevronDownIcon className="h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex py-4 px-[22px] justify-between">
            <div>
              <div className="font-medium">Tab size</div>
              <div className="text-sm text-[#eff2f699] mt-[6px] mr-10">
                Choose the width of a tab character.
              </div>
            </div>
            <div>
              <div className="flex w-40 justify-between bg-[#ffffff1a] px-3 py-[6px] items-center rounded-md">
                <div className="text-sm">4 spaces</div>
                <div>
                  <ChevronDownIcon className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
