import React from "react";

const TransformYourFarmSection = () => {
  return (
    <div
         className="w-full px-8 py-6 sm:px-12 sm:py-8 rounded-2xl shadow-xl text-center 
                   bg-gradient-to-br from-green-600/40  to-yellow-600/30 flex flex-col items-center justify-center"
      >
         <h2 className="text-gray-700 text-2xl md:text-3xl  font-bold mb-4 leading-tight">
            Ready to Transform Your Farm?
         </h2>
         <p className="text-gray-600 text-sm sm:text-lg mb-8 opacity-90 max-w-2xl">
            Join thousands of successful farmers who trust Root Farming
         </p>
         <button
            className="bg-green-600 text-white font-semibold px-8 py-3 rounded-xl
             cursor-pointer 
                     hover:bg-gray-100 hover:text-green-800 transition-all duration-300 shadow-md"
            onClick={() => {
               // navigate('/registration');
               alert("Clicked to start your journey!");
            }}
         >
            Start Your Journey Today
         </button>
      </div>

  );
};

export default TransformYourFarmSection;
