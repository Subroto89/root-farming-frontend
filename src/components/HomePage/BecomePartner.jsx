import React from 'react';

const BecomePartner = () => {
  return (
    <div className=" max-w-11/12 mx-auto relative bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl shadow-2xl p-10 lg:p-16 text-white my-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>

      <div className="relative text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Become a Partner
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Join our ecosystem of innovative partners and help us transform
          agriculture for a sustainable future.
        </p>
      </div>
    </div>
  );
};

export default BecomePartner;
