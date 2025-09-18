
import React from "react";
import { motion } from "framer-motion";
import { Smartphone, BarChart3, Shield, Zap, Users, Award } from "lucide-react"; 


const features = [
  {
    title: "Smart Mobile App",
    description:
      "Monitor your crops, track growth, and manage your farm operations from anywhere with our intuitive mobile application.",
    icon: <Smartphone className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Get detailed insights into your farming performance with comprehensive analytics and reporting tools.",
    icon: <BarChart3 className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Crop Protection",
    description:
      "Advanced pest control and disease management solutions to protect your investments and maximize yields.",
    icon: <Shield className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Automated Systems",
    description:
      "Smart irrigation, fertilization, and monitoring systems that work 24/7 to optimize your crop production.",
    icon: <Zap className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Expert Support",
    description:
      "Connect with agricultural specialists and get personalized advice for your specific farming challenges.",
    icon: <Users className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Quality Assurance",
    description:
      "Ensure the highest quality standards for your produce with our comprehensive quality control systems.",
    icon: <Award className="w-10 h-10 text-green-500" />,
  },
];
const WhyChooseRFSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="text-green-600">Root Farming?</span>
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover the powerful features that make Root Farming the preferred choice for modern farmers worldwide.
        </motion.p>

