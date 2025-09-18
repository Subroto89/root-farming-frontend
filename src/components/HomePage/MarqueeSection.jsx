
import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeSection({
    items = [
        "Breaking News: Govt to buy crops at fair prices to help farmers. Training and subsidies planned.",
        "Weather forecast: Light to moderate rain expected today with gusty winds this evening. Stay cautious",
    ],
    speed = 50,
    pauseOnHover = true,
}) {
    return (
        <div className="w-full bg-gray-100 py-2">
            <Marquee
                gradient={false}
                speed={speed}
                direction="left" // scroll from right to left
                pauseOnHover={pauseOnHover}
            >
                {items.map((text, index) => (
                    <span
                        key={index}
                        className={`mx-6 text-sm font-medium ${index === 0
                                ? "text-green-600" // first item: green for government news
                                : "text-blue-600" // second item: blue for weather news
                            }`}
                    >
                        {text}
                    </span>
                ))}
            </Marquee>
        </div>
    );
}
