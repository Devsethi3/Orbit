"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, GithubIcon, Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-slate-100 border border-slate-200/80"
          >
            <span className="text-xs font-medium text-slate-600">
              Real-time collaboration, simplified{" "}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Write, collaborate, and
            <br />
            <span className="text-primary">
              ship docs faster
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The modern document editor built for teams. Real-time collaboration,
            version history, and seamless publishing — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16"
          >
            <Link href="/dashboard">
              <Button size="lg">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <GithubIcon className="mr-2 w-4 h-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
              Github
            </Button>
          </motion.div>

          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Browser Frame */}
            <div className="rounded-xl sm:rounded-2xl bg-foreground/10 p-1.5 sm:p-2">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-t-lg sm:rounded-t-xl">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="max-w-xs mx-auto h-5 sm:h-6 bg-foreground/5 rounded-md">
                    <span className="text-sm">Orbit</span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="relative aspect-[16/10] bg-slate-100 rounded-b-lg sm:rounded-b-xl overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/placeholder-poster.png"
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                </video>

                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Decorative blur elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
