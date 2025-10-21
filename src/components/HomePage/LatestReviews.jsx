import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useLatestReviews } from '../../allProductsApi/UseReviews';
import Reviewscard from './Reviewscard';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LatestReviews = () => {
  const { theme } = useTheme();
  const { data: reviews = [], isLoading } = useLatestReviews();
  const [stopScroll, setStopScroll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
    AOS.refresh();
  }, []);

  if (isLoading) return <p>Loading reviews...</p>;

  const backgroundClass =
    theme === 'dark'
      ? 'bg-gradient-to-b from-[#1A202C] via-green-950 to-[#1A202C] text-gray-100'
      : 'bg-gradient-to-b from-green-50 to-green-100 text-gray-900';

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .transition-theme {
          transition: background 0.5s ease, color 0.5s ease;
        }
      `}</style>

      <div
        id="Latest-reviews"
        className={`${backgroundClass} transition-theme md:py-24 py-16 overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="900"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-3">
              What Our Customers Say
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto flex items-center justify-center gap-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-green-800'
              }`}
            >
              <Users
                className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}
              />
              Real feedback from our valued customers
            </p>
          </div>

          {/* Marquee Section */}
          <div
            className="overflow-hidden w-full relative max-w-7xl mx-auto"
            onMouseEnter={() => setStopScroll(true)}
            onMouseLeave={() => setStopScroll(false)}
          >
            <div
              className="marquee-inner flex w-fit"
              style={{
                animationPlayState: stopScroll ? 'paused' : 'running',
                animationDuration: reviews.length * 4000 + 'ms',
              }}
            >
              <div className="flex">
                {[...reviews, ...reviews].map((r, index) => (
                  <div
                    key={index}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    data-aos-duration="900"
                  >
                    <Reviewscard r={r} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestReviews;
