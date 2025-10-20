import React from 'react';
import { useTheme } from '../../hooks/useTheme';
const partners = [
  {
    name: 'John Deere',
    logo: 'https://i.ibb.co/N2hB0cjg/john.png',
    description: 'Global leader in agricultural machinery and technology.',
  },
  {
    name: 'AGCO',
    logo: 'https://i.ibb.co/ZR2DFcGM/Agco.png',
    description: 'Manufacturer of innovative agricultural solutions worldwide.',
  },
  {
    name: 'Aaco',
    logo: 'https://i.ibb.co/gZK07HCt/aaco-logo-Photoroom.png ',
    description:
      'AACo is Australias largest integrated cattle and beef producer.',
  },
  {
    name: 'Corteva Agriscience',
    logo: 'https://i.ibb.co/k6w44gdt/corteva.png',
    description: 'Advancing agriculture with biotechnology and research.',
  },
  {
    name: 'Syngenta',
    logo: 'https://i.ibb.co/nqsM0d46/Syngenta.png',
    description: 'Global company dedicated to sustainable agriculture.',
  },

  {
    name: 'Cargill',
    logo: 'https://i.ibb.co/5PTqBmw/cargill.png',
    description: 'Cargill is a family company providing food & ingredients.',
  },

  {
    name: 'Senwes',
    logo: 'https://i.ibb.co/RG13n4Rv/Main-Logo-Green.png',
    description:
      'Senwes Agricultural Services specialises in agricultural economic services.',
  },
  {
    name: 'Nutrian',
    logo: 'https://i.ibb.co/W4PMT5zv/nutrian.png',
    description:
      'Nutrien is a leading global provider of crop inputs and services.',
  },
];
const OurTrustedPartnersSection = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle = theme === 'dark' ? 'fg-dark' : 'fg-light';
  return (
    <div className={`${themeBackgroundStyle} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold  mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg  max-w-2xl mx-auto">
            We collaborate with leading organizations to deliver the best
            agricultural solutions.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`${themeForegroundStyle} border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center`}
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
              <h3 className="text-xl font-semibold  mb-2">{partner.name}</h3>

              {/* Description */}
              <p className=" text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTrustedPartnersSection;
