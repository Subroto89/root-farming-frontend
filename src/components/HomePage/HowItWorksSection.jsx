import React from "react";
import HowItsWorksCards from "./HowItsWorksCards";
import OurGrowingImpactSection from "./OurGrowingImpactSection";

const HowItWorksSection = () => {
  return (
    <div className="text-center pt-9 bg-gradient-to-b from-green-50 to-white ">
      <h2 className="text-3xl font-black my-3 ">How It Works</h2>
      <p className="text-gray-500">
        Simple steps to transform your farming experience with Root Farming
      </p>

      <HowItsWorksCards></HowItsWorksCards>
      {/* <OurGrowingImpactSection></OurGrowingImpactSection> */}
    </div>
  );
};

export default HowItWorksSection;
