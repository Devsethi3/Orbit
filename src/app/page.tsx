import React from "react";
import { FaGoogle, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineSecurityScan } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CanvasCursor from "@/components/CanvasCursor";
import HeroNav from "@/components/HeroNav";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <HeroNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />
    </div>
  );
};

export default HomePage;
