
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { heroContent } from '../data/content';
import { ChevronRight, Star, Plus, ChevronDown } from 'lucide-react';

interface HeroProps {
  setView: (view: 'home' | 'portfolio' | 'about' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const { stats } = heroContent;

  const handleCtaClick = (e: React.MouseEvent, view: 'contact' | 'portfolio') => {
    e.preventDefault();
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants for staggered reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-32 pb-32 md:pb-20 px-6 overflow-hidden">
      {/* Dynamic Floating Background Elements */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "linear",
          delay: 2
        }}
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full text-center z-10"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Next Generation Digital Agency
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent"
        >
          {heroContent.headline}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* Rating Widget with Soft Pulse */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12"
        >
          <div className="text-center md:text-left">
            <p className="text-slate-500 font-medium text-sm mb-1">Trusted by_</p>
            <div className="flex items-baseline justify-center md:justify-start">
              <span className="text-5xl font-extrabold text-slate-800 dark:text-white">{stats.trustedBy}</span>
              <span className="text-3xl font-bold text-indigo-500 ml-1">{stats.suffix}</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">{stats.label}</p>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white dark:bg-slate-800/50 backdrop-blur-md p-6 rounded-[2.5rem] md:rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/5 flex items-center space-x-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-3xl font-black text-slate-800 dark:text-white leading-none">{stats.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="flex -space-x-3">
                {stats.avatars.map((avatar, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden shadow-md"
                  >
                    <img src={avatar} alt="Client" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white border-2 border-white dark:border-slate-800 shadow-md">
                  <Plus size={16} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-10"
        >
          <a
            href="#contact"
            onClick={(e) => handleCtaClick(e, 'contact')}
            className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg flex items-center justify-center group transition-all hover:bg-secondary hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
          >
            {heroContent.ctaPrimary}
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleCtaClick(e, 'portfolio')}
            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
          >
            {heroContent.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Double Chevron Wave Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-400 dark:text-slate-600 mb-2">Scroll</span>
        <div className="flex flex-col items-center -space-y-4">
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="text-primary w-6 h-6" strokeWidth={3} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <ChevronDown className="text-primary/50 w-6 h-6" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
