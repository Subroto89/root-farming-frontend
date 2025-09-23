import React from "react";

const TransformYourFarmSection = () => {
  return (
    <div className="flex justify-center py-5 mg:py-8 lg:py-12 px-5 md:px-10 lg:px-16">
      <div
        className=" w-full p-8 sm:p-12 rounded-2xl shadow-xl text-center 
                   bg-gradient-to-r from-green-500 to-yellow-600 flex flex-col items-center justify-center"
      >
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          Ready to Transform Your Farm?
        </h2>
        <p className="text-gray-200 text-sm sm:text-xl mb-8 opacity-90 max-w-2xl">
          Join thousands of successful farmers who trust Root Farming
        </p>
        <button
          className="bg-white text-green-600 font-semibold px-8 py-4 rounded-full cursor-pointer 
                     hover:bg-gray-100 hover:text-green-800 transition-all duration-300 shadow-md"
          onClick={() => {
            // navigate('/registration');
            alert("Clicked to start your journey!");
          }}
        >
          Start Your Journey Today
        </button>
      </div>
    </div>
  );
};

export default TransformYourFarmSection;
