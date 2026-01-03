
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, ArrowUpRight, RefreshCcw } from 'lucide-react';
import { siteConfig, Lead } from '../data/content';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const saveLeadLocally = (leadData: any) => {
    try {
      const existingLeads: Lead[] = JSON.parse(localStorage.getItem('alevatex_leads') || '[]');
      const newLead: Lead = {
        id: crypto.randomUUID(),
        name: leadData.name as string,
        email: leadData.email as string,
        service: leadData.service as string,
        message: leadData.message as string,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      localStorage.setItem('alevatex_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch (e) {
      console.error("Failed to save lead locally", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Save lead for our internal dashboard
    saveLeadLocally(data);

    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  const resetForm = () => setFormState('idle');

  return (
    <div className="py-32 px-6 bg-slate-900 text-white rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
            >
              Let's Scale <br />Your <span className="text-primary">Vision</span>.
            </motion.h2>
            <p className="text-slate-400 text-xl mb-12 max-w-md">
              Ready to take your brand beyond boundaries? Tell us about your goals and let's engineer your growth.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Email Us</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-lg hover:text-primary transition-colors">{siteConfig.email}</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Call Us</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-lg hover:text-primary transition-colors">{siteConfig.phone}</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Find Us</p>
                  <p className="text-lg">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-white/10 h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={60} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message Received!</h3>
                  <p className="text-slate-400 text-lg mb-10 max-w-sm">
                    Thank you for reaching out. Our growth specialists will analyze your request and contact you within 24 hours.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="flex items-center space-x-2 text-primary font-bold hover:underline"
                  >
                    <RefreshCcw size={18} />
                    <span>Send another message</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-white/10"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="Enter your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</label>
                        <input 
                          required
                          name="email"
                          type="email" 
                          placeholder="name@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service of Interest</label>
                      <select name="service" className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-300 appearance-none">
                        <option value="Brand Identity" className="bg-slate-900">Brand Identity Design</option>
                        <option value="Performance Marketing" className="bg-slate-900">Performance Marketing</option>
                        <option value="Video Editing" className="bg-slate-900">Cinematic Video Editing</option>
                        <option value="E-commerce" className="bg-slate-900">E-commerce Development</option>
                        <option value="Motion Graphics" className="bg-slate-900">Motion Graphics</option>
                        <option value="Other" className="bg-slate-900">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Message</label>
                      <textarea 
                        required
                        name="message"
                        rows={4}
                        placeholder="Briefly describe your project goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all placeholder:text-slate-600 resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full py-5 bg-primary hover:bg-secondary text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-3 group disabled:opacity-70"
                    >
                      {formState === 'sending' ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="text-lg">Send Inquiry</span>
                          <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    {formState === 'error' && (
                      <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
