import React, { useEffect } from 'react';
import { useProducts } from '../../allProductsApi/UseProducts';
import AdvertiseCard from '../shopComponents/AdvertiseCard';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdvertisementSection = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle =
    theme === 'dark'
      ? 'fg-dark border border-gray-500'
      : 'fg-light border border-gray-200';
  const { data: products = [], isLoading } = useProducts({});
  const featured = products.slice(0, 4);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-32">
        <p className="text-lg text-gray-600 animate-pulse">Loading ads...</p>
      </div>
    );

  return (
    <section
      className={`${themeBackgroundStyle} py-16 sm:py-20 lg:py-24 overflow-hidden`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="mb-12 sm:mb-16 text-center"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Advertisement — Featured Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Explore our top-rated agricultural products that make farming
            smarter, easier, and more profitable.
          </p>
        </div>

        {/* Product Grid */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product, idx) => (
              <div
                key={product._id}
                data-aos={idx % 2 === 0 ? 'fade-up-right' : 'fade-up-left'}
                data-aos-delay={idx * 150}
              >
                <AdvertiseCard
                  product={product}
                  themeForegroundStyle={themeForegroundStyle}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-left text-gray-600 text-lg mt-10"
            data-aos="fade-up"
          >
            No advertisements available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertisementSection;
