"use client";

import AllCoursesSection from "@/app/components/AllCoursesSection";
import Header from "@/app/components/Header";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <AllCoursesSection />
      </main>
    </div>
  );
}
