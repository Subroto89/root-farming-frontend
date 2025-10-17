import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useLatestReviews } from '../../allProductsApi/UseReviews';
import Reviewscard from './Reviewscard';

const LatestReviews = () => {
  const { data: reviews = [], isLoading } = useLatestReviews();
  const [stopScroll, setStopScroll] = useState(false);

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        /* Scroll from right to left */
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="bg-gray-50 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
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
                  <Reviewscard key={index} r={r} />
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
