
import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services } from '../data/content';

const Services: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
        >
          Our <span className="text-primary">Superpowers</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg"
        >
          We provide a comprehensive suite of digital solutions designed to ignite growth and establish market dominance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const IconComponent = (Icons as any)[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-card border border-slate-100 dark:border-slate-800 transition-all group hover:border-primary/50"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                {IconComponent && <IconComponent size={28} />}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Capabilities:</p>
                <p className="text-sm mt-2 text-slate-400">{service.details}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
