"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomePage from "./HomePage";

export default function Login() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="relative z-20">
        <Navbar />
      </div>
      <HomePage />
      <div className="relative z-20 bg-white">
        <Footer />
      </div>
    </div>
  );
}
