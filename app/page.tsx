import Navbar from "./components/Navbar";
import PageRoute from "./components/PageRoute";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dsg-charcoal text-dsg-ink">
      <Navbar />
      <PageRoute>
        <Hero />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </PageRoute>
    </main>
  );
}
