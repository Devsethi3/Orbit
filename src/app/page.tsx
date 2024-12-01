import React from "react";
import { FaGoogle, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineSecurityScan } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaGoogle className="text-2xl text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-800">Docs</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Get Started
            </button>
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create, Edit, Collaborate
            <br />
            <span className="text-blue-500">All in One Place</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Experience seamless document creation and real-time collaboration
            with our powerful document management solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors text-lg">
                Try it Free
              </button>
            </Link>
            <button className="bg-white text-gray-800 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors text-lg border">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

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
