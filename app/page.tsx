"use client";
import Footer from "@/components/Footer";
import NavbarSignedIn from "@/components/NavbarSignedIn";
import QuestionsPage from "@/components/QuestionsPage";
import { db } from "@/firebase";
import useHasMounted from "@/hooks/useHasMounted";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  // Use hasMounted code if hydration error occurs
  // const hasMounted = useHasMounted();

  // if (!hasMounted) return null;

  // const [inputs, setInputs] = useState({
  //   id: "",
  //   title: "",
  //   difficulty: "",
  //   category: "",
  //   order: 0,
  //   link: "",
  //   likes: 0,
  //   dislikes: 0,
  // });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // conver inputs.order to integer
  //   const newProblem = {
  //     ...inputs,
  //     order: Number(inputs.order),
  //   };
  //   await setDoc(doc(db, "problems", inputs.id), newProblem);
  //   alert("Saved to db");
  // };
  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col">
      <div className="bg-[#282828] shadow-md h-[52px]">
        <NavbarSignedIn />
      </div>
      <div className="">
        <QuestionsPage />
      </div>
      {/* temp form */}
      {/* <form
        className="p-6 flex flex-col max-w-sm gap-3 text-black"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="problem id"
          name="id"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="title"
          name="title"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="difficulty"
          name="difficulty"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="category"
          name="category"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="order"
          name="order"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="link"
          name="link"
        />
        <button className="bg-white">Save to db</button>
      </form> */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
