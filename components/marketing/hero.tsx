"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export function Hero() {
  const ref = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Parallax Blob */}
      {!prefersReducedMotion && (
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[100px]"
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl pt-20">
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-sora font-semibold text-foreground leading-tight tracking-tight mb-8"
        >
          Run your business. <br className="hidden md:block" />
          We <span className="font-playfair italic text-primary font-medium pr-2">handle</span> the rest.
        </motion.h1>
        
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          AI consultancy, infrastructure, and creative systems for ambitious businesses — built, deployed, and managed end-to-end.
        </motion.p>
        
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link href="/book-a-call" className={buttonVariants({ size: "lg", className: "uppercase font-sora text-base h-14 px-10 rounded-lg shadow-sm" })}>Book a Call</Link>
        </motion.div>
      </div>
    </section>
  );
}
