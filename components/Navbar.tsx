
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { navigation, siteConfig } from '../data/content';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentView: 'home' | 'portfolio' | 'about' | 'contact' | 'admin';
  setView: (view: 'home' | 'portfolio' | 'about' | 'contact' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === 'home') {
      setView('home');
      window.scrollTo(0, 0);
    } else if (href === 'portfolio') {
      setView('portfolio');
    } else if (href === 'about') {
      setView('about');
    } else if (href === 'contact') {
      setView('contact');
    } else if (href === 'admin') {
      setView('admin');
    } else if (href.includes('#')) {
      const [viewName, hash] = href.split('#');
      const targetView = viewName === 'home' || !viewName ? 'home' : (viewName as any);
      
      if (currentView !== targetView) {
        setView(targetView);
        setTimeout(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          <button onClick={() => setView('home')} className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </button>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium transition-colors duration-200 ${
                (item.href === currentView)
                ? 'text-primary' : 'hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Animated Start Project Button */}
          <motion.a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden bg-primary text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            {/* Shimmer Effect Layer */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "linear",
                repeatDelay: 1
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            />
            
            {/* Pulse Glow Background */}
            <motion.div 
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary opacity-50 blur-lg -z-10 group-hover:opacity-100"
            />

            <span className="relative z-10">Start Project</span>
          </motion.a>
        </div>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-dark border-t border-slate-200 dark:border-slate-800 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium py-2 ${
                    item.href === currentView ? 'text-primary' : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Animated Button */}
              <motion.a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-primary text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-primary/20"
                onClick={() => setIsOpen(false)}
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "250%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20"
                />
                <span className="relative z-10">Start Project (WhatsApp)</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
