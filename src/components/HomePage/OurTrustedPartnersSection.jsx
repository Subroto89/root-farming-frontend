import React from "react";

const OurTrustedPartnersSection = () => {
    const partners = [
  {
    name: 'John Deere',
    logo: 'https://brandfetch.com/deere.com/logo/download',
    description: 'Global leader in agricultural machinery and technology.',
  },
  {
    name: 'Bayer Crop Science',
    logo: 'https://brandfetch.com/bayer.com/logo.png',
    description:
      'Innovative solutions in seeds, crop protection, and sustainability.',
  },
  {
    name: 'Corteva Agriscience',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Corteva_Agriscience_logo.svg',
    description: 'Advancing agriculture with biotechnology and research.',
  },
  {
    name: 'Syngenta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Syngenta_logo.svg',
    description: 'Global company dedicated to sustainable agriculture.',
  },
  {
    name: 'AGCO',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/AGCO_logo.svg',
    description: 'Manufacturer of innovative agricultural solutions worldwide.',
  },
  {
    name: 'CNH Industrial',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/CNH_Industrial_logo.svg',
    description: 'Agricultural and construction equipment leader.',
  },
];
  return (
    <div className="mb-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We collaborate with leading organizations to deliver the best
          agricultural solutions
        </p>
      </div>

      {/* Card Section ----------------------------------------------- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {partner.name}
            </h3>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTrustedPartnersSection;
