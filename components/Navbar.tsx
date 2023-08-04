"use client";
import { signIn } from "next-auth/react";

function Navbar() {
  return (
    <div className="flex w-full justify-center p-4 z-10">
      <div className="flex items-center w-11/12 max-w-6xl justify-between">
        {/* Logo & Site Name */}
        <div className="flex items-center">
          <div className="w-10">
            <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" />
          </div>
          <div className="pl-2 text-xl">LeetCloned</div>
        </div>
        {/* Menu Items */}
        <div className="flex font-light space-x-6">
          <div className="menuText text-[#fea116] hover:bg-[#fea116]">
            Premium
          </div>
          <a href="#explore" className="menuText">
            Explore
          </a>
          <a href="#product" className="menuText">
            Product
          </a>
          <a href="#developer" className="menuText">
            Developer
          </a>
          <button onClick={() => signIn("google")} className="menuText">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
