
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<'home' | 'portfolio' | 'about' | 'contact' | 'admin' | 'privacy' | 'terms'>('home');

  useEffect(() => {
    // Initial theme setup
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [view]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} currentView={view as any} setView={setView as any} />
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <main>
              <section id="home">
                <Hero setView={setView as any} />
              </section>
              <LogoMarquee />
              <section id="services">
                <Services />
              </section>
              <section id="portfolio">
                <Portfolio onShowAll={() => setView('portfolio')} />
              </section>
              <section id="testimonials">
                <Testimonials />
              </section>
              <section id="contact-home">
                <Contact />
              </section>
            </main>
          </motion.div>
        )}

        {view === 'portfolio' && (
          <motion.div
            key="portfolio-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioPage />
            <Contact />
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutPage />
            <Contact />
          </motion.div>
        )}

        {view === 'contact' && (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactPage />
          </motion.div>
        )}

        {view === 'admin' && (
          <motion.div
            key="admin-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminDashboard />
          </motion.div>
        )}

        {view === 'privacy' && (
          <motion.div
            key="privacy-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PrivacyPage />
            <Contact />
          </motion.div>
        )}

        {view === 'terms' && (
          <motion.div
            key="terms-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TermsPage />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer setView={setView as any} />
    </div>
  );
};

export default App;
