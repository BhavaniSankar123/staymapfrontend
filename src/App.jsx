import { useEffect, useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Team from "./pages/Team";
import PgCard from "./pages/PgCard";
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourteam" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Contact />} />
          <Route path="/favourites" element={<Contact />} />
          <Route path="/recentlyused" element={<Contact />} />
          <Route path="/card" element={<PgCard />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
