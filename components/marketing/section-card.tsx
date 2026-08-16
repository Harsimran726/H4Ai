"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

export function SectionCard({ title, description, icon, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="bg-card border-border/50 shadow-none h-full flex flex-col hover:border-border transition-colors">
        <CardHeader>
          {icon && <div className="text-primary mb-4 w-10 h-10">{icon}</div>}
          <CardTitle className="font-sora text-xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-base">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
