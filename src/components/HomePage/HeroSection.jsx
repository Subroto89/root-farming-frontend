import {
  ArrowRight,
  TrendingUp,
  Users,
  Leaf,
  Sun,
  UserCheck,
  BarChart2,
  ShoppingCart,
} from 'lucide-react';
import heroImage from '../../assets/Logo/hero-farmer.jpg';
import QuickStats from './QuickStats';

const HeroSection = () => {
  const features = [
    {
      title: 'Weather Alerts',
      desc: 'Real-time forecasts',
      icon: <Sun className="w-10 h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Expert Advice',
      desc: '24/7 specialist chat',
      icon: <UserCheck className="w-10 h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Resource Tracking',
      desc: 'Manage inventory',
      icon: <BarChart2 className="w-10 h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Direct Selling',
      desc: 'Your marketplace',
      icon: <ShoppingCart className="w-10 h-10 text-[#F59F0A]" />,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pt-20 flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern farming with technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,92,40,0.95),rgba(30,92,40,0.85),rgba(30,92,40,0.7))]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-[#F59F0A]" />
              <span className="text-sm font-medium">
                Smart Agriculture Platform
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Farm Smarter,
              <br />
              <span className="text-[#F59F0A]">Grow Better</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Complete guidance from planting to harvesting. Get expert advice,
              weather alerts, and sell directly to consumers on our marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="flex items-center justify-center gap-2 text-white text-lg px-8 py-4 bg-[#F59F0A] hover:bg-white/20 rounded-lg font-medium transition">
                Start Farming Smart
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-white text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-[#F59F0A] rounded-lg transition">
                Browse Marketplace
              </button>
            </div>

            {/* Quick Stats */}
            <QuickStats />
          </div>

          {/* Right Content - Feature Highlights */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all shadow-[0_16px_48px_rgba(30,92,40,0.16)]"
                >
                  <div className="mb-3 ">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0F3F9] to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
