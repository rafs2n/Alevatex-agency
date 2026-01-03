
import React from 'react';
import Portfolio from '../components/Portfolio';
import { motion } from 'framer-motion';

const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Case Studies</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Our Full <span className="text-primary">Portfolio</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Every pixel, every frame, and every line of code is engineered for one goal: Your Brand's Growth.
          </p>
        </motion.div>
      </div>
      
      <Portfolio isFullPage={true} />
    </div>
  );
};

export default PortfolioPage;
