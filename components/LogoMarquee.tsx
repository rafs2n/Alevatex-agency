
import React from 'react';
import { clientLogos } from '../data/content';

const LogoMarquee: React.FC = () => {
  return (
    <div className="py-20 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-card/30 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-dark to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...clientLogos, ...clientLogos].map((logo, idx) => (
          <div key={idx} className="mx-12 text-2xl md:text-3xl font-black text-slate-300 dark:text-slate-700 hover:text-primary transition-colors cursor-default tracking-widest">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
