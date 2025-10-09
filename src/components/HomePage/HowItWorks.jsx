import { Leaf, ShoppingCart, Sprout, BarChart2 } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Leaf,
    title: 'Register Your Farm',
    description:
      'Create your account and register your farmland details in minutes.',
  },
  {
    step: 2,
    icon: Sprout,
    title: 'Get Smart Insights',
    description:
      'Receive tailored recommendations for crops, fertilizers, and irrigation.',
  },
  {
    step: 3,
    icon: BarChart2,
    title: 'Track & Manage',
    description:
      'Monitor your crops, expenses, and resources with real-time analytics.',
  },
  {
    step: 4,
    icon: ShoppingCart,
    title: 'Sell with Ease',
    description:
      'Access the marketplace to sell your harvest directly to buyers.',
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How RootFarming Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to smarter farming in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line - Desktop */}
          <div
            className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-300"
            style={{ width: 'calc(100% - 8rem)', left: '4rem' }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#F59F0A] flex items-center justify-center text-2xl font-extrabold text-[#2C2621] z-10 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>

                  {/* Icon Container */}
                  <div className="mt-8 mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 border-2 border-green-700 shadow-md group-hover:bg-green-700 transition-colors duration-300">
                    <Icon className="w-10 h-10 text-green-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
