import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // react-router ব্যবহার করছো তাই এটা হওয়া উচিত
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userinfo } from "../../slices/userSlice";

const Navbar = ({userInfo}) => {
  let dispatch= useDispatch()
  let user = useSelector((state)=>state.userinfo.value)
  let nevigete = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
// console.log(user)

  // বাইরে ক্লিক করলে popup বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) { 
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let heandelLogout=()=>{
    nevigete('/signin')
    // localStorage.removeItem('user', null)

    dispatch(userinfo(null)); // Redux থেকে data remove
        localStorage.clear(); // ✅ সব auth data remove
        toast.success("Logout Successful!");
  }
  return (
    <nav className="w-full bg-gray-800 text-white py-3 flex justify-around items-center fixed bottom-0 left-0 shadow-md z-50">
      {/* Home */}
      <Link
       to={`/`}
        className="flex flex-col items-center hover:text-blue-400 transition"
      >
        <i className="fas fa-home text-2xl mb-1" />
        <p className="text-sm">Home</p>
      </Link>

      {/* SMS */}
      <Link to={`/message`} className="flex flex-col items-center hover:text-blue-400">
        <i className="fas fa-comment text-2xl mb-1" />
        <p className="text-sm">SMS</p>
      </Link>

      {/* Profile */}
      <div className="relative" ref={popupRef}>
        <button
          onClick={() => setIsOpen(!isOpen) }
          className={`flex flex-col items-center hover:text-blue-400 transition`}
        >
          <i className="fas fa-user text-2xl mb-1" />
          <p className="text-sm">Profile</p>
        </button>

        {/* Popup / Profile Bubble */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-14 right-[-50px] bg-white text-gray-800 shadow-xl rounded-2xl p-4 w-52"
            >
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pravatar.cc/80"
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h3 className="font-semibold text-lg">{user.displayName}</h3>
                <p className="text-sm text-gray-500 mb-3">
                 {user?.email}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex flex-col space-y-2 text-sm">
                <Link to="/profile" className="hover:text-blue-500">
                  View Profile
                </Link>
                <Link to="/settings" className="hover:text-blue-500">
                  Settings
                </Link>
                <button
                  onClick={heandelLogout}
                  className="text-left hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
