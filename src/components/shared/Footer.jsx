import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import logo from '../../assets/Logo/Rootfarming.png';
import { Link } from 'react-router';
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { theme } = useTheme();
  const Style = theme === 'dark' ? ' fg-dark ' : 'bg-[#0F172A] ';
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email && agreed) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
      setAgreed(false);
    }
  };

  const productLinks = [
    { name: 'Fresh Vegetables', path: '#' },
    { name: 'Organic Fruits', path: '#' },
    { name: 'Grains & Cereals', path: '#' },
    { name: 'Herbs & Spices', path: '#' },
    { name: 'Dairy Products', path: '#' },
  ];

  const serviceLinks = [
    { name: 'Crop Management', path: '#' },
    { name: 'Market Analytics', path: '#' },
    { name: 'Weather Forecasting', path: '#' },
    { name: 'Expert Consultation', path: '#' },
    { name: 'Payment Processing', path: '#' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '#' },
    { name: 'Our Story', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Press & Media', path: '#' },
    { name: 'Investor Relations', path: '#' },
  ];

  const resourceLinks = [
    { name: 'Farming Guides', path: '#' },
    { name: 'Best Practices', path: '#' },
    { name: 'Success Stories', path: '#' },
    { name: 'Research & Reports', path: '#' },
    { name: 'Community Forum', path: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, path: '#', label: 'Facebook' },
    { icon: Twitter, path: '#', label: 'Twitter' },
    { icon: Instagram, path: '#', label: 'Instagram' },
    { icon: Linkedin, path: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className={`${Style}  overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Company Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Root Farming Logo" className="h-10 w-10" />
              <h2 className="text-2xl font-bold">Root Farming</h2>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Empowering farmers and connecting communities through innovative
              agricultural technology. From seed to market, we're your trusted
              partner in sustainable farming.
            </p>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 flex-wrap">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">
                  1234 Farming Ave, Farm City, FC 12345
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-FARM</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">hello@rootfarming.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Get the latest farming tips, market insights, and product updates
              delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="space-y-4 w-full max-w-lg"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>

              <label className="flex items-start gap-2 sm:gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-green-700 border-gray-700 rounded focus:ring-green-700"
                  required
                />
                <span>
                  I agree to receive marketing communications and understand I
                  can opt out at any time.
                </span>
              </label>
            </form>

            {/* Social Icons */}
            <div className="mt-8 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      to={social.path}
                      aria-label={social.label}
                      className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-all"
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-gray-800 mt-12 pt-12">
          {[
            { title: 'Products', links: productLinks },
            { title: 'Services', links: serviceLinks },
            { title: 'Company', links: companyLinks },
            { title: 'Resources', links: resourceLinks },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-6">{section.title}</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-green-400 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RootFarming. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item, i) => (
                  <Link
                    key={i}
                    to="#"
                    className="text-gray-400 hover:text-green-400 transition-all"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
