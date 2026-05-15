"use client";

import React from "react";
import { motion } from "framer-motion";

const SectionCard = ({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6 group"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
    </div>
    <div className="pl-1">{children}</div>
  </motion.div>
);

export default SectionCard;
