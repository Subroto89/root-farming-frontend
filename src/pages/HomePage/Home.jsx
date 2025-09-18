import React from "react";
import MarqueeSection from "../../components/HomePage/MarqueeSection";
import HeroSection from "../../components/HomePage/HeroSection";
import WeatherForecastSection from "../../components/HomePage/WeatherForecastSection";
import WhyChooseRFSection from "../../components/HomePage/WhyChooseRFSection";
import BestSellingProductsSection from "../../components/HomePage/BestSellingProductsSection";
import OurProductsSection from "../../components/HomePage/OurProductsSection";
import HowItWorksSection from "../../components/HomePage/HowItWorksSection";
import OurGrowingImpactSection from "../../components/HomePage/OurGrowingImpactSection";
import FarmerSuccessStoriesSection from "../../components/HomePage/FarmerSuccessStoriesSection";
import OurTrustedPartnersSection from "../../components/HomePage/OurTrustedPartnersSection";
import TransformYourFarmSection from "../../components/HomePage/TransformYourFarmSection";

const Home = () => {
  return (
    <>
      <MarqueeSection />
      <HeroSection />
      <WeatherForecastSection />
      <WhyChooseRFSection />
      <TransformYourFarmSection />
      <BestSellingProductsSection />
      <OurProductsSection />
      <HowItWorksSection />
      <OurGrowingImpactSection />
      <FarmerSuccessStoriesSection />
      <OurTrustedPartnersSection />
    </>
  );
};

export default Home;
