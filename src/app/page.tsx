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
