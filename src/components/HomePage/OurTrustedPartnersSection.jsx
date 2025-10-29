import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import AOS from "aos";
import "aos/dist/aos.css";
import Marquee from "react-fast-marquee";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

// const partners = [
//   {
//     name: "John Deere",
//     logo: "https://i.ibb.co/N2hB0cjg/john.png",
//     description: "Global leader in agricultural machinery and technology.",
//   },
//   {
//     name: "AGCO",
//     logo: "https://i.ibb.co/ZR2DFcGM/Agco.png",
//     description: "Manufacturer of innovative agricultural solutions worldwide.",
//   },
//   {
//     name: "Aaco",
//     logo: "https://i.ibb.co/gZK07HCt/aaco-logo-Photoroom.png",
//     description:
//       "AACo is Australias largest integrated cattle and beef producer.",
//   },
//   {
//     name: "Corteva Agriscience",
//     logo: "https://i.ibb.co/k6w44gdt/corteva.png",
//     description: "Advancing agriculture with biotechnology and research.",
//   },
//   {
//     name: "Syngenta",
//     logo: "https://i.ibb.co/nqsM0d46/Syngenta.png",
//     description: "Global company dedicated to sustainable agriculture.",
//   },
//   {
//     name: "Cargill",
//     logo: "https://i.ibb.co/5PTqBmw/cargill.png",
//     description: "Cargill is a family company providing food & ingredients.",
//   },
//   {
//     name: "Gramik",
//     logo: "https://i.ibb.co/YqZcVd5/gramic-Photoroom.png",
//     description:
//       "Gramik aka Agrijunction, supplies various Agri input products and services to farmers.",
//   },
//   {
//     name: "Nutrian",
//     logo: "https://i.ibb.co/W4PMT5zv/nutrian.png",
//     description:
//       "Nutrien is a leading global provider of crop inputs and services.",
//   },
// ];

const OurTrustedPartnersSection = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle =
    theme === "dark"
      ? "fg-dark border border-gray-500"
      : "fg-light border border-gray-200";

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
    AOS.refresh();
  }, []);


  const axiosSecure = useAxiosSecure();
  const [partners, setPartners] = useState([]);

  
  useEffect(() => {
    const getPartners = async () => {
      try {
        const res = await axiosSecure.get("/becomePartners");
        setPartners(res.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    getPartners();
  }, [axiosSecure]);




  return (
    <div className={`${themeBackgroundStyle} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
            We collaborate with leading organizations to deliver the best
            agricultural solutions.
          </p>
        </div>

        {/* Marquee Section */}
        <div className="space-y-8">
          {/* Marquee 1 - Right Direction */}
          <Marquee
            direction="right"
            pauseOnHover={true}
            gradient={false}
            speed={60}
            className="rounded-xl py-4"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`${themeForegroundStyle} mx-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center w-64 min-h-[200px]`}
              >
                <img
                  src={partner.photo}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-3 animate-float"
                />
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="text-xs mt-1 line-clamp-2">{partner.description}</p>
              </div>
            ))}
          </Marquee>

          {/* Marquee 2 - Left Direction */}
          <Marquee
            direction="left"
            pauseOnHover={true}
            gradient={false}
            speed={55}
            className="rounded-xl py-4"
          >
            {partners.map((partner, index) => (
              <div
                key={`bottom-${index}`}
                className={`${themeForegroundStyle} mx-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center w-64`}
              >
                <img
                  src={partner.photo}   
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-3 animate-float"
                />
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="text-xs mt-1 line-clamp-2">{partner.description}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default OurTrustedPartnersSection;
