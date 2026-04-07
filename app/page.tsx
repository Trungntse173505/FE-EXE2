"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import AISection from "./components/AISection";
import MembershipSection from "./components/MembershipSection";
import CoursesSection from "./components/CoursesSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function EasyStretchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AISection />
      <MembershipSection />
      <CoursesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}