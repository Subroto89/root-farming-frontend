import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection';
import WeatherForecastSection from '../../components/HomePage/WeatherForecastSection';
import OurProductsSection from '../../components/HomePage/OurProductsSection';
import HowItWorksSection from '../../components/HomePage/HowItWorksSection';
import OurGrowingImpactSection from '../../components/HomePage/OurGrowingImpactSection';
import FarmerSuccessStoriesSection from '../../components/HomePage/FarmerSuccessStoriesSection';
import OurTrustedPartnersSection from '../../components/HomePage/OurTrustedPartnersSection';
import BecomePartner from '../../components/HomePage/BecomePartner';
import Features from '../../components/HomePage/Features';
import HowItWorks from '../../components/HomePage/HowItWorks';
import AdvertisementSection from '../../components/HomePage/AdvertisementSection';

const Home = () => {
  return (
    <>
      {/* <MarqueeSection /> */}
      <HeroSection />
      <WeatherForecastSection />
      <Features />
      <HowItWorks />
      <AdvertisementSection />

      <OurGrowingImpactSection />
      <FarmerSuccessStoriesSection />
      <OurTrustedPartnersSection />
      <BecomePartner />
    </>
  );
};

export default Home;
