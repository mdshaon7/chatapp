import { h2 } from 'framer-motion/client';
import React from "react";
import { useSelector } from 'react-redux';

const Profile = () => {

    const currentUser = useSelector((state) => state.userinfo.value);
  console.log(currentUser)
  return (
    <div className="p-6 text-center">
      <img
        src="https://i.pravatar.cc/100"
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold">{currentUser.displayName}</h2>
      <p className="text-gray-500 mb-4">Front-End Developer</p>
      <div className="text-left max-w-md mx-auto space-y-2">
        <p>📧 {currentUser.email}</p>
        <p>📞 Phone: 01601550159</p>
        <p>📍 Address: Adakhola, Rajapur, Jhalakathi</p>
      </div>
    </div>
  
  );
};

export default Profile;
