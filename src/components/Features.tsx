"use client"
import { FaBolt, FaUsers, FaBuilding, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';

const featuresList = [

  {
    icon: <FaBolt className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Experience real-time editing with zero lag, powered by our advanced synchronization engine.',
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: 'Collaborative Editing',
    description: 'Work together seamlessly with multiple users editing the same document in real-time.',
  },
  {
    icon: <FaBuilding className="w-6 h-6" />,
    title: 'Organization Tools',
    description: 'Powerful workspace features for teams including roles, permissions, and document sharing.',
  },
  {
    icon: <FaHistory className="w-6 h-6" />,
    title: 'Version Control',
    description: 'Track changes, review history, and restore previous versions with built-in version control.',
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:text-4xl text-2xl font-bold text-slate-900 mb-4"
          >
            Powerful Features for Modern Storage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Everything you need to store, manage, and share your files securely
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>

              {/* Decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;