// components/SignUp.jsx
import { CiFacebook } from "react-icons/ci";
import { SlSocialTwitter } from "react-icons/sl";
import { AiOutlineGoogle } from "react-icons/ai";
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import { AiOutlineGoogle } from "react-icons/ai";

export const SignUp = () => {
   const [full_name, setFull_name] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();
   const [errors, setErrors] = useState({
      full_name: "",
      email: "",
      password: "",
   });

   const handleSignUP = async () => {
      const payload = { full_name, email, password };
      const newErrors = {};

      // Validate input fields
      if (!full_name) {
         newErrors.full_name = "Name is required!";
      }
      if (!email) {
         newErrors.email = "Email is required!";
      }
      if (!password) {
         newErrors.password = "Password is required!";
      }

      setErrors(newErrors); // Update errors state
      if (Object.keys(newErrors).length > 0) return; // Stop signup if there are errors

      setIsLoading(true);
      try {
         setIsLoading(true);
         const response = await signup(payload);
         if (response.success) {
            toast.success(response?.message || "Please Check Your Email");
            setTimeout(() => {
               navigate("/verify-email", { state: { email } });
            }, 1000);
         } else {
            toast.error(response.message || "Something went wrong");
         }
      } catch (error) {
         toast.error(
            error.response?.data?.message || "Sign up failed. Please try again."
         );
      } finally {
         setIsLoading(false);
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      // Remove error message and border based on input name
      if (name === "full_name") {
         setFull_name(value);
         if (value) {
            setErrors((prev) => ({ ...prev, full_name: "" }));
         }
      } else if (name === "email") {
         setEmail(value);
         if (value) {
            setErrors((prev) => ({ ...prev, email: "" }));
         }
      } else if (name === "password") {
         setPassword(value);
         if (value) {
            setErrors((prev) => ({ ...prev, password: "" }));
         }
      }
   };

   const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
      console.log("Toggle");
   };

   const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
         const idToken = tokenResponse.credential || tokenResponse.access_token;

         // decode if needed (optional)
         // const user = jwt_decode(idToken);

         // Send token to backend
         const res = await fetch("http://localhost:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
         });

         const data = await res.json();
         console.log("User logged in:", data);
      },
      onError: () => {
         console.log("Login Failed");
      },
      flow: "implicit", // or 'auth-code' for server-side exchange
   });

   return (
      <>
         <div className="min-h-svh bg-[#060B26] flex flex-col justify-between">
            <Navbar />
            <section className="flex flex-row flex-wrap-reverse my-5 justify-evenly items-center w-full">
               <div className="bg-[#0E132D] text-white py-4 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
                  <h2 className="font-roboto text-[18px] font-bold leading-[23.4px] text-center my-4">
                     Register With
                  </h2>
                  <div className="flex gap-4 justify-center my-5">
                     <button className="bg-[#171b35] p-[20px] rounded-[20px]">
                        <CiFacebook className="text-[20px]" />
                     </button>
                     <button className="bg-[#171b35] p-[20px] rounded-[20px]">
                        <SlSocialTwitter className="text-[20px]" />
                     </button>
                     <button
                        className="bg-[#171b35] p-[20px] rounded-[20px]"
                        onClick={() => login()}
                     >
                        <AiOutlineGoogle className="text-[20px]" />
                     </button>
                  </div>
                  <p className="text-center font-[700] text-[18px] leading-6">
                     or
                  </p>
                  <div className="my-6">
                     <div className="flex flex-col space-y-2 mt-5 w-[100%]">
                        <label
                           htmlFor="name"
                           className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px]"
                        >
                           Name
                        </label>
                        <input
                           type="text"
                           name="full_name"
                           id="name"
                           placeholder="Your full name"
                           className={`bg-[#151933] my-3 px-3 py-3 w-full rounded-[8px] ${
                              errors.full_name && "border-red-500 border-[2px]"
                           }`}
                           value={full_name}
                           onChange={handleInputChange}
                           required
                        />
                        {errors.full_name && (
                           <p className="text-red-500 text-sm">
                              {errors.full_name}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col space-y-2 mt-5 w-[100%]">
                        <label
                           htmlFor="email"
                           className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px]"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           placeholder="Your email address"
                           className={`bg-[#151933] px-3 py-3 w-full rounded-[8px] ${
                              errors.email && "border-red-500 border-[2px]"
                           }`}
                           value={email}
                           onChange={handleInputChange}
                           required
                        />
                        {errors.email && (
                           <p className="text-red-500 text-sm">
                              {errors.email}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col space-y-2 mt-5 w-[100%]">
                        <label
                           htmlFor="password"
                           className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px]"
                        >
                           Password
                        </label>
                        <div className="relative">
                           <input
                              type={showPassword ? "text" : "password"} // Toggle input type
                              id="password"
                              name="password"
                              placeholder="Your password"
                              className={`bg-[#151933] px-3 py-3 w-full rounded-[8px] ${
                                 errors.password ? "border border-red-500" : ""
                              }`}
                              required
                              value={password}
                              onChange={handleInputChange}
                           />
                           <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                           >
                              {showPassword ? (
                                 <FaEyeSlash className="text-gray-500" />
                              ) : (
                                 <FaEye className="text-gray-500" />
                              )}
                           </button>
                        </div>
                        {errors.password && (
                           <p className="text-red-500 text-sm">
                              {errors.password}
                           </p>
                        )}
                     </div>
                  </div>
                  <button
                     onClick={handleSignUP}
                     className={`bg-[#0075FF] flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] my-8 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                     ) : (
                        <>
                           SIGN UP
                           <img
                              src="/signin.svg"
                              className="mx-2 my-1 max-w-[17px]"
                              alt=""
                           />
                        </>
                     )}
                  </button>
                  <Link to="/user-signin">
                     <span className="flex items-center justify-center my-4 gap-1 font-roboto text-[14px] leading-5 m-auto cursor-pointer">
                        <p className="text-[#F2994A] font-[500]">
                           Already have an account?
                        </p>
                        <p className="font-[700] text-white">Sign in</p>
                     </span>
                  </Link>
               </div>
               <div className="flex flex-col">
                  <img
                     src="/Algorithm Logo 22 1.svg"
                     className="mx-auto max-w-[280px] object-cover"
                     alt="BITS&ALGORITHM"
                  />
                  <h1 className="py-9 text-white font-roboto text-[50px] font-semibold leading-[68px] tracking-[0.1em] text-center">
                     Crafting Legacies, One <br /> Will at a Time
                  </h1>
               </div>
            </section>
            <Footer />
         </div>
      </>
   );
};
