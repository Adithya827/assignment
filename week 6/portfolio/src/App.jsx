import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import './styles/global.css';

// React Suspense + Lazy Loading for all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function PageLoader() {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-ring" />
        <div className="loader-text">Loading...</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <BrowserRouter>
          <Navbar />
          <SearchModal />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  );
}
