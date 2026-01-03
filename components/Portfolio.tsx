
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioCategories, projects, Project } from '../data/content';
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioProps {
  onShowAll?: () => void;
  isFullPage?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ onShowAll, isFullPage = false }) => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = filter === "All" 
    ? (isFullPage ? projects : projects.slice(0, 6)) 
    : projects.filter(p => p.category === filter);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
    }
  };

  return (
    <div className={`py-32 px-6 ${isFullPage ? 'bg-transparent' : 'bg-slate-50 dark:bg-card/20'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {isFullPage ? 'Full' : 'Select'} <span className="text-primary">Works</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">A glimpse into the digital empires we've helped build.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-dark border border-slate-200 dark:border-slate-800 hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openProject(project)}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer shadow-lg"
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay for all types */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Play Button Overlay for Videos */}
                {project.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                      <Play size={32} fill="white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isFullPage && onShowAll && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <button
              onClick={onShowAll}
              className="inline-flex items-center space-x-2 bg-dark dark:bg-white text-white dark:text-dark px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <span>Explore All Works</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={closeProject}
          >
            <button 
              onClick={closeProject}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full h-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              {selectedProject.type === 'video' ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={`${selectedProject.videoUrl}?autoplay=1&modestbranding=1&rel=0`}
                    title={selectedProject.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative group w-full h-full flex items-center justify-center">
                  <img
                    src={selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                  
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                      >
                        <ChevronRight size={32} />
                      </button>
                      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex space-x-2">
                        {selectedProject.images.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-primary w-6' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="mt-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-slate-400 max-w-xl mx-auto">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
