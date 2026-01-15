'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, LogIn, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800 border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-orange-500 font-bold text-xl">
              DANKA STORE
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/profile" 
                    className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  >
                    <LogIn className="w-4 h-4 mr-1" /> Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-orange-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-400 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:bg-slate-700 hover:text-white w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
                
                {/* User profile section */}
                <div className="flex items-center px-3 py-2">
                  <div className="flex-shrink-0">
                    {session.user?.image ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-black" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">
                      {session.user?.name}
                    </div>
                    <div className="text-xs font-medium text-gray-400">
                      {session.user?.email}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-orange-500 text-black px-3 py-2 rounded-md text-base font-medium hover:bg-orange-400 transition-colors w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop user profile section */}
      {session && (
        <div className="hidden md:block absolute right-4 top-3">
          <div className="flex items-center">
            <Link href="/profile" className="flex items-center group">
              <div className="relative">
                {session.user?.image ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-orange-500 group-hover:border-orange-400 transition-colors"
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center border-2 border-orange-500 group-hover:border-orange-400 transition-colors">
                    <User className="h-5 w-5 text-black" />
                  </div>
                )}
              </div>
              <div className="ml-2 hidden group-hover:block absolute mt-12 bg-slate-700 text-white py-1 px-2 rounded-md text-xs whitespace-nowrap z-10">
                {session.user?.name}
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;