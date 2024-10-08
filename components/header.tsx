"use client";
import React, { useEffect, useState } from "react";
import { clearUserSession, getUserSession } from "../app/hooks/session";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

type session = {
  id: string;
  role: string;
  email: string;
};
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [session, setSession] = useState<session>({
    id: "",
    role: "",
    email: "",
  }); // State to store session data

  const logout = () => {
    clearUserSession();
    setIsLoggedIn(false); // Update login status
    setSession({ id: "", role: "", email: "" }); // Clear session data
    console.log("User logged out successfully");
  };

  useEffect(() => {
    getUser(); // Check user session on component mount
  }, []);

  const getUser = () => {
    const userSession = getUserSession(); // Fetch user session
    if (userSession) {
      setIsLoggedIn(true); // Update login status
      setSession(userSession); // Store session data
    }
  };

  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="bg-gray-800 text-white py-4 px-8 rounded-lg mt-4 w-[95%] mx-auto shadow-lg flex items-center justify-between">
  <div className="flex items-center space-x-6">
    <p className="text-2xl font-bold tracking-wider text-green-400">
      Face Recognition System
    </p>
    <nav className="hidden md:flex space-x-4">
      <Link href="/addUser" className="text-sm px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300">
        Add Student
      </Link>
      
      <Link href="/admin" className="text-sm px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300">
        Verify
      </Link>
    </nav>
  </div>
  
  <div className="flex items-center space-x-6">
    {session ? (
      <h2 className="text-lg flex items-center gap-2 font-semibold">
        <User />
        {session.email}
      </h2>
    ) : null}
    
    {!isHome ? (
      <Link href="/" className="text-sm px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition duration-300">
        Home
      </Link>
    ) : (
      <>
        {!isLoggedIn ? (
          <Link href="/login" className="text-sm px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition duration-300">
            Login
          </Link>
        ) : (
          <button onClick={logout} className="text-sm px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition duration-300">
            Logout
          </button>
        )}
      </>
    )}
  </div>

  {/* Mobile Navigation */}
  <div className="md:hidden">
    <button className="text-sm px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300">
      Menu
    </button>
  </div>
</div>

  );
}
