"use client";

import { FaGoogle, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser, useAuth, UserButton } from "@clerk/clerk-react";

const HeroNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isSignedIn, isLoaded } = useAuth();
    const { user, isLoaded: isUserLoaded } = useUser();

    // Handle navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <Image src="/logo.svg" width={30} height={30} alt="logo" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                                Orbit
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/docs" className="text-slate-600 hover:text-indigo-600 transition-colors">
                                Docs
                            </Link>
                            <Link href="/api" className="text-slate-600 hover:text-indigo-600 transition-colors">
                                API
                            </Link>
                            <Link href="/examples" className="text-slate-600 hover:text-indigo-600 transition-colors">
                                Examples
                            </Link>
                            <Link href="/blog" className="text-slate-600 hover:text-indigo-600 transition-colors">
                                Blog
                            </Link>
                        </div>

                        <div className="flex items-center gap-5">
                            {!isLoaded ? (
                                // Loading state
                                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                            ) : isSignedIn ? (
                                // Signed in state
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="secondary">Dashboard</Button>
                                    </Link>
                                    {isUserLoaded ? (
                                        <UserButton
                                            appearance={{
                                                elements: {
                                                    userButtonAvatarBox: "w-8 h-8",
                                                    userButtonPopoverFooter: "hidden"
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                                    )}
                                </>
                            ) : (
                                // Signed out state
                                <div className="flex items-center space-x-4">
                                    <Link href="/sign-in">
                                        <Button variant="outline">Sign In</Button>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeroNav;