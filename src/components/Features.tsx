"use client";

import {
  Zap,
  Users,
  History,
  Shield,
  Sparkles,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant loading with edge deployment. Your documents are always accessible, anywhere.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly. See changes as they happen with live cursors and presence.",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Never lose your work. Browse and restore any previous version with one click.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC2 compliant with end-to-end encryption. Your data stays private and secure.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description:
      "Get intelligent suggestions, summaries, and translations powered by AI.",
  },
  {
    icon: Globe,
    title: "Publish Anywhere",
    description:
      "Share publicly or privately. Export to any format or publish to custom domains.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-600 mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Everything you need to create
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Powerful features designed for modern teams who want to move fast.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;