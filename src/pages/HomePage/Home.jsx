import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection';
import WeatherForecastSection from '../../components/HomePage/WeatherForecastSection';
import WhyChooseRFSection from '../../components/HomePage/WhyChooseRFSection';
import OurProductsSection from '../../components/HomePage/OurProductsSection';
import HowItWorksSection from '../../components/HomePage/HowItWorksSection';
import OurGrowingImpactSection from '../../components/HomePage/OurGrowingImpactSection';
import FarmerSuccessStoriesSection from '../../components/HomePage/FarmerSuccessStoriesSection';
import OurTrustedPartnersSection from '../../components/HomePage/OurTrustedPartnersSection';
import BecomePartner from '../../components/HomePage/BecomePartner';
import IndustryRecognitionAndAchievenent from '../../components/HomePage/IndustryRecognitionAndAchievenent';
import Features from '../../components/HomePage/Features';

const Home = () => {
  return (
    <>
      {/* <MarqueeSection /> */}
      <HeroSection />
      <WeatherForecastSection />
      <Features />
      <WhyChooseRFSection />
      {/* <BestSellingProductsSection /> */}
      <OurProductsSection />
      <HowItWorksSection />
      <OurGrowingImpactSection />
      <FarmerSuccessStoriesSection />
      <OurTrustedPartnersSection />
      <IndustryRecognitionAndAchievenent />
      <BecomePartner />
    </>
  );
};

export default Home;
