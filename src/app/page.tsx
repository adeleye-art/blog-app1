import BlogPostSection from "@/components/BlogPost";

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <main className="">
        <BlogPostSection />
      </main>
    </div>
  );
}
