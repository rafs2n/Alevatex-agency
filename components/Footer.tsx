
import React, { useState } from 'react';
import { footerContent, siteConfig } from '../data/content';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  setView: (view: 'home' | 'portfolio' | 'about' | 'contact' | 'admin' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (['home', 'portfolio', 'about', 'contact', 'admin', 'privacy', 'terms'].includes(href)) {
      setView(href as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= 5) {
      setView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setClickCount(0);
    } else {
      setClickCount(nextCount);
      // Reset count after 2 seconds of inactivity
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <button 
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-3xl font-black mb-6 tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block text-left"
            >
              {siteConfig.name}
            </button>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
              {footerContent.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-primary uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={(e) => handleNavClick(e, 'home')} className="text-slate-400 hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={(e) => handleNavClick(e, 'about')} className="text-slate-400 hover:text-white transition-colors">About</button>
              </li>
              <li>
                <button onClick={(e) => handleNavClick(e, 'portfolio')} className="text-slate-400 hover:text-white transition-colors">Portfolio</button>
              </li>
              <li>
                <button onClick={(e) => handleNavClick(e, 'contact')} className="text-slate-400 hover:text-white transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-primary uppercase tracking-widest text-sm">Follow Us</h4>
            <div className="flex space-x-6">
              <a href={siteConfig.socials.linkedin} className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href={siteConfig.socials.facebook} className="text-slate-400 hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href={siteConfig.socials.instagram} className="text-slate-400 hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <div className="mt-8">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Subscribe</p>
              <div className="flex">
                <input type="text" placeholder="Your email" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none" />
                <button className="bg-primary px-4 py-2 rounded-r-lg font-bold">Go</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p 
            onClick={handleSecretClick}
            className="cursor-default select-none active:text-white/40 transition-colors"
          >
            {footerContent.copyright}
          </p>
          <div className="flex space-x-8">
            <button onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
