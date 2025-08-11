"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  y = 20,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
