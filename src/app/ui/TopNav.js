'use client'
import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const links = [
    { linkName: "Standard Character", href: "/standard" },
    {
      linkName: "Quick Character",
      href: "/quick",
    },
    { linkName: "Custom Character", href: "/custom" },
    
    {linkName: "About This Site", href: "/about"},


    
    
  ];

  function LinkMap() {
    return(
    
    links.map((link) => {
    return (
      <li key={link.linkName}>
      <Link
        
        href={link.href}
        className={clsx(
          'inline-block rounded hover:border-gray-200 text-white hover:bg-gray-500 py-2 px-4 text-center',
          {
            'bg-gray-700 text-white font-semibold': pathname === link.href,
          },
        )}
        >
        <p className="hidden md:block font-bold text-xl mb-2 font-[family-name:var(--font-imFellSC)]">{link.linkName}</p>
      </Link>
      </li>
    )})
    
    )};

  return (
    <nav className=" text-white bg-black pt-5 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-center" >
             <><h2 className="text-4xl font-bold mb-2 font-[family-name:var(--font-imFellSC)]">
             Rolled School</h2><p className="font-bold text-xl mb-2 font-[family-name:var(--font-imFell)]">D&D 3.5 Character Creator</p></>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border-gray-400 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mr-5"
              aria-expanded={isOpen}
            >
              
              {/* Icon */}
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
          <ul className="flex justify-between items-center mx-5 text-base">
                <LinkMap />
                <Link href="https://robotlions.com" className="font-bold text-xl mb-2 font-[family-name:var(--font-imFell)] ml-5">robotlions.com</Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link  href="/" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Home
            </Link>
            <Link  href="/standard" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Standard Character
            </Link>
            <Link  href="/quick" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Quick Character
            </Link>
            <Link  href="/custom" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Custom Character
            </Link>
            <Link  href="/about" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              About
            </Link>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
