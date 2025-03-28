"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#002366]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-white"
            >
              Ushuari<span className="text-[#D4AF37]">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-[#D4AF37] transition-colors ${
                  pathname === link.href ? "text-[#D4AF37]" : "text-white/90"
                }`}
              >
                {link.title}
              </Link>
            ))}

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <div className="flex space-x-4">
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-[#D4AF37] transition-colors"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-medium rounded-lg transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </SignedOut>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-[#001A4D]/95 backdrop-blur-md rounded-lg overflow-hidden shadow-xl"
            >
              <nav className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-3 text-sm font-medium hover:bg-[#D4AF37]/10 ${
                      pathname === link.href
                        ? "text-[#D4AF37]"
                        : "text-white/90"
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}

                <SignedIn>
                  <div className="px-6 py-3 border-t border-white/10 mt-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>

                <SignedOut>
                  <div className="flex flex-col space-y-2 px-6 py-3 border-t border-white/10 mt-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full py-2 text-white hover:text-[#D4AF37] transition-colors text-center">
                        Sign In
                      </button>
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full py-2 bg-[#D4AF37] hover:bg-[#C09A27] text-[#002366] font-medium rounded-lg transition-colors">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </SignedOut>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
