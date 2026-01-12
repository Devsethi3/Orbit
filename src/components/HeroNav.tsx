"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useUser, useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HeroNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-slate-200/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  fill
                  alt="Orbit Logo"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-semibold text-slate-900">
                Orbit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100/80 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                {!isLoaded ? (
                  <div className="w-20 h-9 rounded-lg bg-slate-100 animate-pulse" />
                ) : isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    {isUserLoaded ? (
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox:
                              "w-9 h-9 ring-2 ring-slate-100",
                          },
                        }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="outline">Sign in</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                  {!isLoaded ? (
                    <div className="h-11 w-full bg-slate-100 animate-pulse rounded-lg" />
                  ) : isSignedIn ? (
                    <div className="flex items-center justify-between px-4 py-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-medium text-slate-900"
                      >
                        Go to Dashboard
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <div className="space-y-2 px-2">
                      <Link
                        href="/sign-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-center h-11"
                        >
                          Sign in
                        </Button>
                      </Link>
                      <Link
                        href="/sign-up"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full justify-center h-11 bg-slate-900 hover:bg-slate-800">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default HeroNav;
