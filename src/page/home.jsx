import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../assets/home/navbar";
import UserList from "../assets/home/UserList";
import FriendList from "../assets/home/FriendList";

const Home = () => {
  const user = useSelector((state) => state.userinfo.value);

  // console.log("✅ Home Rendered | Current User:", user);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-center gap-10 mt-6 flex-wrap">
        {/* Friend Requests Section */}
        <FriendList />

        {/* All Users Section */}
        <UserList />
      </div>

      {/* Navbar at the Bottom */}
      
    </main>
  );
};

export default Home;
