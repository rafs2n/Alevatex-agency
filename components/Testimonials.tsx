
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';

const Testimonials: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Client <span className="text-primary">Success Stories</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Hear from the leaders who trusted us with their growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-slate-50 dark:bg-card border border-slate-100 dark:border-slate-800 relative"
          >
            <div className="absolute top-6 right-8 text-primary/20">
              <Quote size={40} />
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-8 relative z-10">
              "{t.content}"
            </p>
            <div className="flex items-center space-x-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
