"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "3x", label: "Faster turnaround" },
  { value: "24/7", label: "Automation hours saved" },
  { value: "98%", label: "Client retention" },
];

export function ProofStats() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              <span className="font-sora font-bold text-6xl text-secondary mb-4">{stat.value}</span>
              <span className="text-muted-foreground font-medium text-lg">{stat.label}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-lg text-foreground font-medium">
            Based in Mansa. Built for premium clients — local access, enterprise-grade delivery.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
