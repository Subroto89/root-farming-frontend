import React from "react";
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";

const HowItWorkCards = () => {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-10 h-10 text-blue-500" />,
      image: "https://cdn-icons-png.flaticon.com/128/471/471012.png",
      title: "Explore & Discover",
      desc: "Browse our extensive catalog of farming products, seeds, and equipment tailored to your specific needs.",
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-10 h-10 text-green-500" />,
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431186.png",
      title: "Select & Order",
      desc: "Choose the perfect products for your farm and place your order with our secure checkout process.",
    },
    {
      id: 3,
      icon: <Truck className="w-10 h-10 text-yellow-500" />,
      image: "https://cdn-icons-png.flaticon.com/128/1981/1981801.png",
      title: "Fast Delivery",
      desc: "Receive your products quickly with our reliable delivery network covering rural and urban areas.",
    },
    {
      id: 4,
      icon: <CheckCircle className="w-10 h-10 text-green-600" />,
      image: "https://cdn-icons-png.flaticon.com/128/5500/5500802.png",
      title: "Grow & Succeed",
      desc: "Use our products with confidence and watch your farm thrive with ongoing support from our experts.",
    },
  ];

  const benefits = [
    "Expert curation of high-quality farming products",
    "Competitive pricing with bulk discounts",
    "Nationwide delivery network",
    "24/7 customer support and guidance",
  ];
  return (
    <div>
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-4">
              <div className="w-full flex items-start justify-between">
                <span className="h-7 w-7 bg-white shadow-md rounded-full">
                  {step.id}
                </span>
                <div className=" rounded-full p-5">
                  <img src={step.image} width={80} alt="" />
                </div>
                <div>

                </div>
              </div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

       

      </section>
    </div>
  );
};

export default HowItWorkCards;
