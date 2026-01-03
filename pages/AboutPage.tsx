
import React from 'react';
import { motion } from 'framer-motion';
import { aboutPageContent, teamMembers } from '../data/content';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      {/* Introduction & Vision */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1.1]">
              {aboutPageContent.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-light">
              {aboutPageContent.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-50 dark:bg-card/50 p-10 md:p-16 rounded-[3rem] border border-slate-100 dark:border-slate-800"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">{aboutPageContent.visionTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {aboutPageContent.visionDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Meet the <span className="text-primary">Architects</span>
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">The brilliant minds driving the AlevateX engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square mb-6 shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1 tracking-tight">{member.name}</h3>
                <p className="text-primary font-medium text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
