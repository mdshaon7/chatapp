import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userinfo } from "../../slices/userSlice";
import toast, { Toaster } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userinfo(null)); // Redux থেকে data remove
        localStorage.clear(); // ✅ সব auth data remove
        toast.success("Logout Successful!");

        setTimeout(() => {
          navigate("/"); // ✅ Home Page এ নিয়ে যাবে
          window.location.reload(); // ✅ UI Refresh
        }, 500);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        toast.error("Logout Failed!");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-80 text-center">
        <i className="fas fa-sign-out-alt text-5xl mb-4 text-red-400" />
        <h2 className="text-2xl font-semibold mb-2">Are you sure?</h2>
        <p className="text-gray-300 mb-6">Do you really want to log out?</p>

        <div className="flex justify-around gap-2">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Yes, Logout
          </button>

          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Logout;
