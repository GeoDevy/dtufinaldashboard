import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import Results from './pages/Results';
import CaseStudy from './pages/CaseStudy';
import Maps from './pages/Maps';
import About from './pages/About';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/results" element={<Results />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
