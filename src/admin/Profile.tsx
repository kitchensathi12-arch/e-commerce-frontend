import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Profile Header Card ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">M</div>

              {/* Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Muskan Singh</h2>
                <p className="text-gray-500">Administrator</p>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} /> muskan@email.com
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> +91 9876543210
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> India
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <button onClick={() => setIsEditing(!isEditing)} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* ===== Edit Profile Form Section ===== */}
        {isEditing && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Edit Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input type="text" className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="Muskan Singh" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input type="email" className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="muskan@email.com" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input type="text" className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="+91 9876543210" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Location</label>
                <input type="text" className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="India" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
