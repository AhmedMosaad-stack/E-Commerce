"use client";
import React, { useContext, useState, useRef, useEffect } from "react";

import Link from "next/link";

import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {

  const { cartNumber } = useContext(CartContext)!;
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <div className="border-b border-gray-300">
        <nav className="flex justify-between mx-auto w-[90%] items-center gap-4 py-3">
          {/* Logo - Left */}
          <div className="left flex-shrink-0">
            <span className="text-2xl font-bold">
              <Link href="/">Exclusive</Link>
            </span>
          </div>

          {/* Desktop Navigation - Middle */}
          <div className="middle hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-10 text-[14px]">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>

              {!session ? (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <li>
                  <span onClick={logOut} className="cursor-pointer">
                    Log Out
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Right Section - Icons & Mobile Menu */}
          <div className="right flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search - Hidden on Mobile */}
              <div className="relative hidden md:block">
                <Input placeholder="What are you looking for?" type="search" className="bg-gray-100 border-0 focus-visible:ring-0 pr-10" />
                <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600" />
              </div>

              {/* Icons - Heart, Cart, Profile */}
              {session && (
                <>
                  <CiHeart className="text-3xl cursor-pointer" />
                  <Link href={"/cart"} className="relative">
                    <PiShoppingCartThin className="text-[28px] cursor-pointer" />
                    {cartNumber > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartNumber}
                      </span>
                    )}
                  </Link>
                  
                  {/* Profile Dropdown - Desktop Only */}
                  <div className="relative hidden lg:block" ref={dropdownRef}>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                        isProfileOpen ? 'bg-[#DB4444]' : ''
                      }`}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <CiUser className={`text-2xl ${isProfileOpen ? 'text-white' : 'text-black'}`} />
                    </div>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gradient-to-b from-[#4A148C] via-[#6A1B9A] to-[#7B1FA2] backdrop-blur-lg z-50">
                        <div className="py-2">
                          <div 
                            onClick={() => {
                              router.push('/settings');
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <RiAccountCircleLine className="text-xl" />
                            <span className="text-sm">Manage My Account</span>
                          </div>
                          
                          <div 
                            onClick={() => {
                              router.push('/allorders');
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <BsHandbag className="text-xl" />
                            <span className="text-sm">My Order</span>
                          </div>
                          
                          <div 
                            className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <MdOutlineCancel className="text-xl" />
                            <span className="text-sm">My Cancellations</span>
                          </div>
                          
                          <div 
                            className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <AiOutlineStar className="text-xl" />
                            <span className="text-sm">My Reviews</span>
                          </div>
                          
                          <div 
                            onClick={() => {
                              logOut();
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <TbLogout className="text-xl" />
                            <span className="text-sm">Logout</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Mobile Menu Button - Far Right */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden text-2xl text-gray-800 hover:text-[#DB4444] transition-colors">
                    <HiMenuAlt3 />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white p-6">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-2xl font-bold text-[#DB4444] text-left">Exclusive</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col gap-6">
                    {/* Search on mobile */}
                    <div className="relative">
                      <Input placeholder="What are you looking for?" type="search" className="bg-gray-100 border-0 focus-visible:ring-0 pr-10 w-full text-gray-800 h-12 rounded-lg" />
                      <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600" />
                    </div>
                    
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                      <Link 
                        href="/" 
                        className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link 
                        href="/about" 
                        className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About
                      </Link>
                      <Link 
                        href="/contact" 
                        className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>

                      {!session ? (
                        <>
                          <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col gap-2">
                            <Link 
                              href="/login" 
                              className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Login
                            </Link>
                            <Link 
                              href="/signup" 
                              className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Sign Up
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col gap-2">
                            <Link 
                              href="/settings" 
                              className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              My Account
                            </Link>
                            <Link 
                              href="/allorders" 
                              className="text-base text-gray-800 hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              My Orders
                            </Link>
                            <span 
                              onClick={() => { 
                                logOut(); 
                                setIsMobileMenuOpen(false); 
                              }} 
                              className="text-base text-gray-800 cursor-pointer hover:text-[#DB4444] hover:bg-gray-50 transition-all py-3 px-4 font-medium rounded-lg block"
                            >
                              Log Out
                            </span>
                          </div>
                        </>
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
