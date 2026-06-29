import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";
import FluidBackground from "./components/FluidBackground";
import CustomCursor from "./components/CustomCursor";
import StatusBar from "./components/StatusBar";

function App() {
  return (
    <>
      <CustomCursor />
      <FluidBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <main style={{ paddingBottom: "44px" }}>
          <Introduction />
          <Experience />
          <Projects />
          <Jobs />
          <Contact />
        </main>
        <Footer />
        <StatusBar />
      </div>
    </>
  );
}

export default App;
