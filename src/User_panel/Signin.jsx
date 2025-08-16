import { signin } from "@/api/auth";
import { useAuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { setAuthUser } = useAuthContext();
  const { setUserName, setProfilePicture, setUserEmail } =
    useContext(UserContext);

  // Redirect if user is already signed in
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const token = localStorage.getItem("token");

    // Check if user data exists in local storage or context
    if (storedUser && token) {
      navigate("/user-dashboard");
    }
  }, [navigate]);

  const handleSignIn = async () => {
    const payload = { email, password };
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await signin(payload);
      console.log("🚀 ~ handleSignIn ~ response:", response);

      if (response && response.success) {
        setAuthUser(response.user);
        setUserName(response.user.full_name ? response.user.full_name : "");
        setProfilePicture(
          response.user.profile_picture ? response.user.profile_picture : ""
        );
        setUserEmail(response.user.email ? response.user.email : "");

        // store  data in localStorage
        localStorage.setItem("authUser", JSON.stringify(response.user));
        // localStorage.setItem("userId", JSON.stringify(response.user?._id));
        localStorage.setItem("userId", response.user?._id);
        localStorage.setItem("token", response.token);

        // Redirect to dashboard
        setTimeout(() => {
          navigate("/user-dashboard");
        }, 1000);
        toast.success(response.message || "Successfully signed in");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
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
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-svh bg-[#060B26] flex flex-col justify-between">
        <Navbar />
        <section className="flex flex-row flex-wrap-reverse items-center w-full justify-evenly">
          <div className="bg-[#0E132D] text-white py-4 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
            <h2 className="font-roboto text-[18px] font-bold leading-[23.4px] text-center my-4">
              SIGN IN
            </h2>
            <div className="space-y-12">
              {/* Email Field */}
              <div className="flex flex-col w-full space-y-1">
                <label
                  htmlFor="email"
                  className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px] mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className={`bg-[#151933] px-3 py-3 w-full rounded-[8px] ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  required
                  value={email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col w-full space-y-1">
                <label
                  htmlFor="password"
                  className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px] mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
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
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <Link to="/forgot-password">
              <p className="text-[#F2994A] font-roboto text-[14px] font-medium leading-[19.6px] text-right cursor-pointer py-1">
                Forgot Password?
              </p>
            </Link>

            {/* Remember Me Checkbox */}
            <div className="flex gap-[10px] items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <p className="font-roboto font-[500] text-[13px] leading-5">
                Remember Me
              </p>
            </div>

            {/* Sign In Button */}
            <button
              className={`bg-[#0075FF] flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] my-8 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  SIGN IN
                  <img
                    src="/signin.svg"
                    className="mx-2 my-1 max-w-[17px]"
                    alt="Sign In Icon"
                  />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <Link to="/signup">
              <span className="flex items-center justify-center my-4 gap-1 font-roboto text-[14px] leading-5 m-auto cursor-pointer">
                <p className="text-[#FFFFFF]">Don't have an account yet?</p>
                <p className="text-[#0075FF] font-bold">Sign Up</p>
              </span>
            </Link>
          </div>
          <img
            src="/Algorithm Logo 22 1.svg"
            alt="Sign In"
            className="w-full sm:w-[350px] m-2"
          />
        </section>
        <Footer />
      </div>
    </>
  );
};
