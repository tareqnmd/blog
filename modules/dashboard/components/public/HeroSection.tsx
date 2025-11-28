'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0  from-accent/5 via-background to-card-background z-0" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
            Welcome to Academy Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 leading-tight tracking-tight">
            Discover <span className="text-accent">Stories</span> <br />
            That Matter
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and perspectives from our community of passionate writers and
            developers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
