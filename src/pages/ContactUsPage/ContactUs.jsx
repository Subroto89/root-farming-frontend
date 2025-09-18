import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-green-50/50 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
            Contact Us
          </h1>
          <p className="text-gray-700 mt-3">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700">
              Contact Information
            </h2>
            <p className="text-gray-600">
              Have any questions or need to get more information about the
              product? Either way, you’re in the right place.
            </p>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Address</h3>
                <p className="text-gray-500">
                  123 Krishi Lane, Krishan Nagar, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Email</h3>
                <p className="text-gray-500">support@rootfarming.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                <p className="text-gray-500">+880 1234 567890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div>
          <form className="space-y-5"></form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
