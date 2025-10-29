import React from "react";
import { useState } from "react";
import PartnerShipModal from "../../components/HomePage/PartnerShipModal";
import {
  Globe,
  MessageCircle,
  Zap,
  Leaf,
  Mail,
  Phone,
  Globe2,
  Section,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";


const BecomeAPartner = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Network",
      description:
        "Gain access to our worldwide community of farmers, agri-tech innovators, and sustainability experts. Collaborate, share insights, and accelerate your growth through global connections and learning platforms.",
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Premium Support",
      description:
        "Partners receive dedicated support and priority technical assistance from our expert team. Whether it’s technology integration, strategic planning, or implementation, our specialists are ready to help.",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Co-Innovation",
      description:
        "Collaborate on pioneering agricultural technologies, data-driven solutions, and research-based innovations. We encourage joint projects that aim to solve pressing agricultural challenges.",
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Sustainable Practices",
      description:
        "Contribute to initiatives that promote eco-friendly and sustainable farming methods. Together, we strive for a greener future with reduced environmental impact.",
    },
  ];

  return (
    <div className="pt-5">
      <div className={`${themeBackgroundStyle} min-h-screen `}>
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-semibold">
                Root Farming Partnership Program
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold  mb-6">
              Join Our <span className="text-green-600">AgriTech</span>{" "}
              Partnership
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The AgriTech Global Partnership Program is a collaborative
              initiative that unites innovators, organizations, and experts
              working toward sustainable agricultural transformation.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 btn btn-lg bg-green-600 hover:bg-green-700 text-white rounded-full border-none px-8"
            >
              Apply for Partnership
            </button>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center  mb-4">
              Partnership Benefits
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              By joining our network, partners gain access to resources,
              mentorship, and collaboration opportunities that empower them to
              create lasting global impact.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`${themeForegroundStyle} bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 `}
                >
                  <div className="text-green-600 mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold  mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
        </div>

        {/* DaisyUI Modal */}
        {isModalOpen && (
          <PartnerShipModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          ></PartnerShipModal>
        )}
      </div>
    </div>
  );
};

export default BecomeAPartner;
