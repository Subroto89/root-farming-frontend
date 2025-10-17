import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection';
import WeatherForecastSection from '../../components/HomePage/WeatherForecastSection';
import FarmerSuccessStoriesSection from '../../components/HomePage/FarmerSuccessStoriesSection';
import OurTrustedPartnersSection from '../../components/HomePage/OurTrustedPartnersSection';
import BecomePartner from '../../components/HomePage/BecomePartner';
import Features from '../../components/HomePage/Features';
import HowItWorks from '../../components/HomePage/HowItWorks';
import AdvertisementSection from '../../components/HomePage/AdvertisementSection';
import LatestReviews from '../../components/HomePage/LatestReviews';

const Home = () => {
  return (
    <>
      {/* <MarqueeSection /> */}
      <HeroSection />
      <WeatherForecastSection />
      <Features />
      <HowItWorks />
      <AdvertisementSection />
      <LatestReviews />

      <FarmerSuccessStoriesSection />
      <OurTrustedPartnersSection />
      <BecomePartner />
    </>
  );
};

export default Home;
