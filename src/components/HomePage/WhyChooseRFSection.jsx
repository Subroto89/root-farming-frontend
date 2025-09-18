
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
