import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";

function App() {
  return (
    <>
      <Header />
      <main>
        <Introduction />
        <Experience />
        <Projects />
        <Jobs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
