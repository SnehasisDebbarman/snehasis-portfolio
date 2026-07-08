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
import JsonTree from "./components/JsonTree";

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

function AppContent() {
  const location = useLocation();
  const isJsonTree = location.pathname === "/json-tree";

  return (
    <>
      <HashScrollHandler />
      {!isJsonTree && <CustomCursor />}
      {!isJsonTree && <FluidBackground />}
      <div style={isJsonTree ? { position: "relative", zIndex: 1, height: "100vh", overflow: "hidden" } : { position: "relative", zIndex: 1 }}>
        {!isJsonTree && <Header />}
        <main style={isJsonTree ? { height: "100%", display: "block", padding: 0 } : { paddingBottom: "44px" }}>
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/json-tree" element={<JsonTree />} />
          </Routes>
        </main>
        {!isJsonTree && <Footer />}
        {!isJsonTree && <StatusBar />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
