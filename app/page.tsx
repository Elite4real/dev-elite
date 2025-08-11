import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";
import Work from "../components/Work";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="space-y-24 md:space-y-32">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
