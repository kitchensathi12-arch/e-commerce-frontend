import { Check } from 'lucide-react';

const VerifySuccess = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#b7d1c7] to-[#d8c7c7] flex items-center justify-center relative">
      {/* Card */}
      <div className="bg-[#e9e9e9] w-150 rounded-3xl shadow-xl p-12 text-center mt-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#6CFF4D] flex items-center justify-center">
              <Check size={32} className="text-black stroke-4" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Thank you for verifying your identity!</h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg">You can now close this window and return to Blendora</p>
      </div>
    </div>
  );
};

export default VerifySuccess;
