import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Articles from "@/components/Articles";
import { getMediumArticles } from "@/lib/medium";

export const revalidate = 3600;

export default async function Home() {
  const { recent } = await getMediumArticles();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Articles initialArticles={recent.slice(0, 8)} />
    </>
  );
}
