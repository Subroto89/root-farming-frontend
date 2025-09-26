import React from "react";
import HowItsWorksCards from "./HowItsWorksCards";
import OurGrowingImpactSection from "./OurGrowingImpactSection";

const HowItWorksSection = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
         <div className="text-center max-w-7xl mx-auto py-16 ">
            <h2 className="text-3xl font-black my-3 ">How It Works</h2>
            <p className="text-gray-500">
               Simple steps to transform your farming experience with Root
               Farming
            </p>

            <HowItsWorksCards></HowItsWorksCards>
         </div>
      </section>
  );
};

export default HowItWorksSection;
