import React, { useState } from 'react';
import {
  Sprout,
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

const Footer = () => {
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

  const socialLinks = [
    { icon: Facebook, path: '#', label: 'Facebook' },
    { icon: Twitter, path: '#', label: 'Twitter' },
    { icon: Instagram, path: '#', label: 'Instagram' },
    { icon: Linkedin, path: '#', label: 'LinkedIn' },
  ];

  return (
    <div className="max-w-11/12 mx-auto  px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Company Information */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <img src={logo} alt="" className="h-10 w-10" />
            <span className="text-2xl font-bold">Root Farming</span>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Empowering farmers and connecting communities through innovative
            agricultural technology. From seed to market, we're your trusted
            partner in sustainable farming.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">
                1234 Farming Ave, Farm City, FC 12345
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">+1 (555) 123-FARM</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">hello@rootfarming.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter + Social */}
        <div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest farming tips, market insights, and product updates
              delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-green-700 border-gray-700 rounded focus:ring-green-700"
                  required
                />
                <span className="text-sm text-gray-300">
                  I agree to receive marketing communications and understand I
                  can opt out at any time.
                </span>
              </label>
            </form>
          </div>

          <div className="text-center lg:text-start py-4">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    to={social.path}
                    aria-label={social.label}
                    className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-colors"
                  >
                    <IconComponent className="h-6 w-6" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
