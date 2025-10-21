<<<<<<< HEAD
import React from 'react';
 const partners = [
=======
import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const partners = [
>>>>>>> e681e5c99b8eceb7fd6110f7f35f97bdaa2d15e9
  {
    name: 'John Deere',
    logo: 'https://i.ibb.co/N2hB0cjg/john.png',
    description: 'Global leader in agricultural machinery and technology.',
  },
  {
<<<<<<< HEAD
    name: 'Bayer Crop Science',
    logo: 'https://i.ibb.co.com/F4y0PYB4/bayer.png',
=======
    name: 'AGCO',
    logo: 'https://i.ibb.co/ZR2DFcGM/Agco.png',
    description: 'Manufacturer of innovative agricultural solutions worldwide.',
  },
  {
    name: 'Aaco',
    logo: 'https://i.ibb.co/gZK07HCt/aaco-logo-Photoroom.png',
>>>>>>> e681e5c99b8eceb7fd6110f7f35f97bdaa2d15e9
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
<<<<<<< HEAD
    name: 'AGCO',
    logo: 'https://i.ibb.co.com/zWPNzyL5/Agco.png',
    description: 'Manufacturer of innovative agricultural solutions worldwide.',
  },
  {
    name: 'CNH Industrial',
    logo: 'https://i.ibb.co.com/CKBb28V9/cnhi.png',
    description: 'Agricultural and construction equipment leader.',
  },
=======
    name: 'Cargill',
    logo: 'https://i.ibb.co/5PTqBmw/cargill.png',
    description: 'Cargill is a family company providing food & ingredients.',
  },
  {
    name: 'Gramik',
    logo: 'https://i.ibb.co/YqZcVd5/gramic-Photoroom.png',
    description:
      'Gramik aka Agrijunction, supplies various Agri input products and services to farmers.',
  },
  {
    name: 'Nutrian',
    logo: 'https://i.ibb.co/W4PMT5zv/nutrian.png',
    description:
      'Nutrien is a leading global provider of crop inputs and services.',
  },
>>>>>>> e681e5c99b8eceb7fd6110f7f35f97bdaa2d15e9
];

const OurTrustedPartnersSection = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle = theme === 'dark' ? 'fg-dark' : 'fg-light';

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className={`${themeBackgroundStyle} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
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
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="900"
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
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>

              {/* Description */}
              <p className="text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTrustedPartnersSection;
