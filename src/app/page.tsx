import React from "react";
import { FaGoogle, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineSecurityScan } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CanvasCursor from "@/components/CanvasCursor";
import HeroNav from "@/components/HeroNav";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <HeroNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={
                <BsLightningChargeFill className="text-4xl text-blue-500" />
              }
              title="Lightning Fast"
              description="Experience blazing-fast performance with our optimized platform"
            />
            <FeatureCard
              icon={<FaUsers className="text-4xl text-blue-500" />}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, anywhere in the world"
            />
            <FeatureCard
              icon={
                <AiOutlineSecurityScan className="text-4xl text-blue-500" />
              }
              title="Enterprise Security"
              description="Bank-grade security to keep your documents safe and protected"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
