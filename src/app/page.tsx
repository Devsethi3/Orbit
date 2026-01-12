import HeroNav from "@/components/HeroNav";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 font-sans antialiased">
      <HeroNav />
      <main>
        <HeroSection />
        <Features />
        <HowItWorks />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
