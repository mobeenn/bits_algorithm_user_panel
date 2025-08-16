import { getUserdata, updateProfile } from "@/api/auth"; // Import your API functions
import { UserContext } from "@/context/ContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UpdateProfile = () => {
  const { setUserName, setProfilePicture, setUserEmail } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    profilePicture: null, // To store the uploaded file
  });
  const [loading, setLoading] = useState(false); // To handle loading state
  const [userProfile, setUserProfile] = useState("");
  const [file, setFile] = useState(null);

  // Fetch user data when the component loads
  useEffect(() => {
    const getDataForUpdateProfile = async () => {
      try {
        const res = await getUserdata();
        if (res.success) {
          setFormData({
            full_name: res.user.user.full_name || "",
            email: res.user.user.email || "",
          });
          setUserProfile(res.user.user.profile_picture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getDataForUpdateProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // setFormData({
    //   ...formData,
    //   profilePicture: e.target.files[0],
    // });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare form data for the API
      const data = new FormData();
      data.append("name", formData.full_name);
      data.append("email", formData.email);
      if (file) {
        data.append("file", file);
      }

      // Call the API to update the profile
      const response = await updateProfile(data);
      if (response.success) {
        toast("Profile updated successfully!");
        setUserName(response.user.full_name);
        setUserEmail(response.user.email);
        setProfilePicture(response.user.profile_picture);
        localStorage.setItem("authUser", JSON.stringify(response.user));
      } else {
        alert(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="update mx-2 rounded-[8px] px-7 sm:mx-7">
        <h2 className="font-roboto py-6 text-[18px] font-[700] text-white">
          Profile Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 my-2">
            <Inputfield
              type="text"
              id="full_name"
              label={"FULL NAME"}
              placeholder="Pixelz Warrios"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <Inputfield
              type="email"
              id="email"
              label={"EMAIL ADDRESS"}
              placeholder="pixelz@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true} // Email shouldn't be changed
            />

            <div className="flex flex-col gap-3 gap-y-7 md:flex-row">
              <div className="flex w-full flex-col md:max-w-[50%]">
                <label
                  htmlFor="profilePicture"
                  className="font-roboto mb-3 mt-5 text-[14px] font-[500] leading-[19.5px] text-[#B66214]"
                >
                  PICTURE
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])} // Handle file change
                />
                <label
                  htmlFor="profilePicture"
                  className="font-roboto inline-block w-full max-w-[510px] cursor-pointer rounded-[8px] border-[1px] border-[#B4B3B3] bg-[#0E1E39] px-5 py-4 text-left text-[14px] font-[400] leading-[19.5px] text-[#B1B1B1]"
                >
                  {/* {file ? file.name : "Upload profile picture"} */}
                  {"Upload profile picture"}
                </label>
              </div>
              <img
                className="object-contain max-w-[30vw] w-auto h-auto"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : userProfile !== ""
                    ? userProfile
                    : "/update_profile.svg"
                }
                alt="human"
              />
            </div>
          </div>
          <div className="py-9">
            <button
              type="submit"
              className="font-roboto mb-2 rounded-[4px] bg-[#0075FF] px-6 py-4 text-center text-[14px] font-[500] leading-5 text-white md:mb-0"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Updating..." : "UPDATE"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Reusable Inputfield component
function Inputfield({
  label,
  id,
  placeholder,
  type,
  value,
  onChange,
  name,
  disabled = false,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="font-roboto my-2 text-[14px] font-[500] leading-[19.5px] text-[#B66214]"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className="font-roboto my-1 w-full max-w-[510px] rounded-[8px] border-[1px] border-[#B4B3B3] bg-[#0E1E39] px-5 py-4 text-[14px] font-[400] leading-[19.5px] text-[#B1B1B1]"
      />
    </div>
  );
}
