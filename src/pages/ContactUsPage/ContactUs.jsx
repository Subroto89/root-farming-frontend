import React from "react";
import {
  BookText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ContactUs = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
  return (
    <div className={`${themeBackgroundStyle} bg-gray-100 font-sans p-4 sm:p-8`}>
      <div className={`${themeForegroundStyle} max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg`}>
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
            Contact Us
          </h1>
          <p className=" mt-3">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8  p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700">
              Contact Information
            </h2>
            <p className="">
              Have any questions or need to get more information about the
              product? Either way, you’re in the right place.
            </p>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium ">Address</h3>
                <p className="">
                  123 Krishi Lane, Krishan Nagar, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium ">Email</h3>
                <p className="">support@rootfarming.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium ">Phone</h3>
                <p className="">+880 1234 567890</p>
              </div>
            </div>
          </div>
          {/* Right Side: Contact Form */}
          <div>
            <form className="space-y-5">
              {/* Name Input */}
              <div className="relative">
                <User className="w-5 h-5  absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="w-5 h-5  absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Subject Input */}
              <div className="relative">
                <BookText className="w-5 h-5  absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <MessageSquare className="w-5 h-5  absolute left-3 top-4" />
                <textarea
                  name="message"
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full py-3 px-6 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
