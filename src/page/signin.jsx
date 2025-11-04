import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userinfo } from '../slices/userSlice';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";

const Signin = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleEmail = (e) => {
    setErrors({});
    setInfo({ ...info, email: e.target.value });
  };

  const handlePassword = (e) => {
    setErrors({});
    setInfo({ ...info, password: e.target.value });
  };

  const handleSignin = () => {
    let newErrors = {};

    if (!info.email) {
      newErrors.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)) {
      newErrors.email = "Valid email required";
    }

    if (!info.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signInWithEmailAndPassword(auth, info.email, info.password)
      .then((userCredential) => {
        toast.success("Logged in successfully");
        const user = userCredential.user;

        dispatch(userinfo(user));
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await set(ref(db, 'users/' + user.uid), {
        name: user.displayName,
        email: user.email,
      });

      dispatch(userinfo(user));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-cyan-200 shadow-md rounded-lg p-8 w-full max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>

        <div>
          <label className="block text-gray-600 mb-2 font-bold">Email</label>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 mb-2 font-bold">Password</label>
          <input
            onChange={handlePassword}
            type="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          onClick={handleSignin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 duration-200 font-bold"
        >
          Sign In
        </button>

        <button
          onClick={handleGoogle}
          className="w-full bg-white py-2 flex items-center justify-center gap-3 rounded-lg mt-4 text-lg font-semibold shadow"
        >
          <img className="w-8" src="src/assets/images.png" alt="Google" />
          Google Sign-In
        </button>
      </div>
    </>
  );
};

export default Signin;
