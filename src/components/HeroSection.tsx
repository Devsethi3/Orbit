"use client";

import Link from "next/link";
import React from "react";
import CanvasCursor from "./CanvasCursor";
import { Button } from "./ui/button";
import { FaGithub, FaRocket, FaUsers } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-indigo-50 via-slate-50 to-white overflow-hidden">
      <CanvasCursor />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
      </div>

      <section className="relative pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Orbit Docs
            </motion.h1>

            {/* Description with badges */}
            <motion.div
              className="flex flex-col items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="xl:text-xl lg:text-lg text-slate-600 max-w-2xl">
                Comprehensive documentation and guides for building amazing
                products with Orbit. Get started with our resources and tools.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                  <FaRocket className="mr-2" />
                  Zero Config
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                  <FaUsers className="mr-2" />
                  Easy to Use
                </span>
                <a
                  href="https://github.com/orbit/orbit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
                  <SiTypescript className="mr-2" />
                  TypeScript
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex mb-10 flex-wrap items-center justify-center lg:gap-6 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/DevSethi3" target="_blank" className="hidden md:block">
                <Button variant="outline" size="lg">
                  <FaGithub className="mr-2" />
                  Who made this?
                </Button>
              </Link>
            </motion.div>

            {/* Demo Video */}
            <motion.div
              className="w-full max-w-5xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative">
                  <video
                    className="w-full rounded-lg shadow-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/demo-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
