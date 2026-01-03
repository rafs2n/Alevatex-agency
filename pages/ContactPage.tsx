
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ArrowUpRight, CheckCircle2, RefreshCcw } from 'lucide-react';
import { siteConfig, Lead } from '../data/content';

const ContactPage: React.FC = () => {
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

    // Local save for internal tracker
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
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  const resetForm = () => setFormState('idle');

  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Let's Start a <br /> <span className="text-primary">Conversation.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
            Whether you have a groundbreaking idea or a complex business challenge, we're here to engineer your growth.
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        {/* Left Column: Info */}
        <div className="lg:col-span-5 space-y-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-6 p-6 bg-slate-50 dark:bg-card/40 rounded-3xl border border-slate-100 dark:border-slate-800 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-xl font-semibold hover:text-primary transition-colors">{siteConfig.email}</a>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-6 p-6 bg-slate-50 dark:bg-card/40 rounded-3xl border border-slate-100 dark:border-slate-800 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                <a href={`tel:${siteConfig.phone}`} className="text-xl font-semibold hover:text-primary transition-colors">{siteConfig.phone}</a>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-6 p-6 bg-slate-50 dark:bg-card/40 rounded-3xl border border-slate-100 dark:border-slate-800 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Office</p>
                <p className="text-xl font-semibold">{siteConfig.address}</p>
              </div>
            </motion.div>
          </div>

          {/* Socials */}
          <div className="pt-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Connect with us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Linkedin />, link: siteConfig.socials.linkedin },
                { icon: <Facebook />, link: siteConfig.socials.facebook },
                { icon: <Instagram />, link: siteConfig.socials.instagram }
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-card p-12 md:p-24 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={64} className="text-primary" />
                </div>
                <h2 className="text-4xl font-black mb-6">Inquiry Received!</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl max-w-sm mb-12 font-light">
                  Thank you for trusting AlevateX. Our team will get back to you with a strategic proposal within one business day.
                </p>
                <button 
                  onClick={resetForm}
                  className="flex items-center space-x-3 text-primary font-bold text-lg hover:underline transition-all"
                >
                  <RefreshCcw size={20} />
                  <span>Send Another Inquiry</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-card p-8 md:p-16 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full bg-slate-50 dark:bg-dark border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 dark:bg-dark border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service of Interest</label>
                    <select name="service" className="w-full bg-slate-50 dark:bg-dark border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all appearance-none">
                      <option value="Brand Identity">Brand Identity Design</option>
                      <option value="Performance Marketing">Performance Marketing</option>
                      <option value="Video Editing">Cinematic Video Editing</option>
                      <option value="E-commerce">E-commerce Development</option>
                      <option value="Motion Graphics">Motion Graphics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      placeholder="Briefly describe your project goals..."
                      className="w-full bg-slate-50 dark:bg-dark border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full py-5 bg-primary text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-3 group relative overflow-hidden disabled:opacity-70"
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
                    <p className="text-red-500 text-sm text-center">Submission error. Please try again or email us directly.</p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Width Map Section */}
      <div className="w-full h-[500px] relative mt-20 group">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301393!2d90.3910801!3d23.7508643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd071c3517%3A0x6a0c6a858e37803a!2sDhaka!5e0!3m2!1sen!2sbd!4v1711200000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.6) invert(0.9) contrast(1.2)' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="dark:invert dark:grayscale"
        />
        <div className="absolute top-10 left-10 z-20 hidden md:block">
           <div className="bg-white dark:bg-dark p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-primary mb-2">AlevateX Global HQ</h4>
              <p className="text-sm text-slate-500">Visit us for a coffee and strategy talk.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
