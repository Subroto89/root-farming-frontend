import React from "react";
import { useState } from "react";
import { Mail, Home, Clock } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const UnderConstructionPage = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };
  return (
    <div className={`${themeBackgroundStyle} flex items-center justify-center min-h-screen  p-4`}>
      <div className={`${themeForegroundStyle} max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 text-center`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center ring-2 ring-green-300">
            <img src="https://i.ibb.co/mC8PSPDr/Gears-Lottie-Animation.gif" alt="underconstruction" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            🚧 This Page is Under Construction
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md">
            We’re currently building something awesome! Please check back later
            or subscribe below to get notified when we launch.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 p-3 rounded-lg border border-slate-300  focus:outline-none focus:ring-2 focus:ring-green-500 "
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center cursor-pointer gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              <Mail size={18} />
              {subscribed ? "Subscribed" : "Notify Us"}
            </button>
          </form>

          {subscribed && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              Thanks! We'll email you when it's ready.
            </p>
          )}

          <div className="mt-6 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-green-500 to-green-400 animate-pulse" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Progress: polishing the final details 
          </p>

          <div className="flex flex-col items-center gap-2 mt-6">
            <a
              href="/"
              className="inline-flex py-2 px-3  rounded-lg bg-green-600 items-center gap-2  hover:text-white font-medium "
            >
              <Home size={16} /> Back to Home
            </a>

            <div className="flex items-center gap-2 text-xs ">
              <Clock size={14} /> Estimated launch: Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
