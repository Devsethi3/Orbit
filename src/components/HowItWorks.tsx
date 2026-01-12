"use client";

import { motion } from "framer-motion";
import { FileText, Users2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Create your document",
    description:
      "Start from scratch or choose from dozens of templates. Our editor adapts to your workflow.",
  },
  {
    step: "02",
    icon: Users2,
    title: "Invite your team",
    description:
      "Share with anyone. Set permissions and collaborate in real-time with your teammates.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Publish and share",
    description:
      "Export to any format or publish to the web. Your content, available everywhere.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-indigo-600 mb-3"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Get started in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            No complex setup. No learning curve. Just start writing.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-slate-300" />
              )}

              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm mb-6">
                <item.icon className="w-10 h-10 text-slate-700" />
                <span className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center text-xs font-bold bg-indigo-600 text-white rounded-full">
                  {item.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
