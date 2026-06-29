import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
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
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import Recommendations from "./components/Recommendations";

function MainPortfolio() {
  return (
    <>
      <Introduction />
      <Experience />
      <Projects />
      <Jobs />
      <Recommendations />
      <Contact />
    </>
  );
}

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const section = location.hash.replace("#", "");
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 600,
          smooth: true,
          offset: -80, // Offset for top header bar
        });
      }, 150);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <HashScrollHandler />
      <CustomCursor />
      <FluidBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <main style={{ paddingBottom: "44px" }}>
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
        <StatusBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
