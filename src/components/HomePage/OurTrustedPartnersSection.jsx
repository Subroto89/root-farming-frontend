import React from 'react';
 const partners = [
  {
    name: 'John Deere',
    logo: 'https://i.ibb.co.com/PGxjcYcJ/john-Deere.png',
    description: 'Global leader in agricultural machinery and technology.',
  },
  {
    name: 'Bayer Crop Science',
    logo: 'https://i.ibb.co.com/F4y0PYB4/bayer.png',
    description:
      'Innovative solutions in seeds, crop protection, and sustainability.',
  },
  {
    name: 'Corteva Agriscience',
    logo: 'https://i.ibb.co.com/6c5VxqvR/corteva.png',
    description: 'Advancing agriculture with biotechnology and research.',
  },
  {
    name: 'Syngenta',
    logo: 'https://i.ibb.co.com/hJ0M7MvK/Syngenta-Logo.jpg',
    description: 'Global company dedicated to sustainable agriculture.',
  },
  {
    name: 'AGCO',
    logo: 'https://i.ibb.co.com/zWPNzyL5/Agco.png',
    description: 'Manufacturer of innovative agricultural solutions worldwide.',
  },
  {
    name: 'CNH Industrial',
    logo: 'https://i.ibb.co.com/CKBb28V9/cnhi.png',
    description: 'Agricultural and construction equipment leader.',
  },
];

const OurTrustedPartnersSection = () => {
  return (
    <div className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations to deliver the best
            agricultural solutions.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Logo */}
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {partner.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTrustedPartnersSection;
