
import React from 'react';
import { motion } from 'framer-motion';
import { legalContent } from '../data/content';
import { ShieldCheck, Calendar } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
            Privacy <span className="text-primary">Policy.</span>
          </h1>
          <div className="flex items-center space-x-2 text-slate-400 font-medium">
            <Calendar size={16} />
            <span>Last Updated: {legalContent.privacy.lastUpdated}</span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {legalContent.privacy.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 dark:bg-card/40 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">{section.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-light">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 italic">
            Questions about our privacy policy? Reach out at <a href="mailto:hello@alevatex.com" className="text-primary font-bold hover:underline">hello@alevatex.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
