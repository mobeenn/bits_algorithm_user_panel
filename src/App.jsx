// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./UserLayout/UserDashboard";
import { Userdashboard } from "./User_panel/Userdashboard";
import { PersonalDetails } from "./User_panel/PersonalDetails";
import { ChildDetail } from "./User_panel/ChildDetail";
import { MyAsset } from "./User_panel/MyAsset";
import { TrustDetail } from "./User_panel/TrustDetail";
import { ExecuterDetail } from "./User_panel/ExecuterDetail";
import { YourWishes } from "./User_panel/YourWishes";
import { UserWill } from "./User_panel/UserWill";
import { NewChild } from "./User_panel/NewChild";
import { NewAsset } from "./User_panel/NewAsset";
import { EditChild } from "./User_panel/EditChild";
import { EditAsset } from "./User_panel/EditAsset";
import { Signin } from "./User_panel/Signin";
import { ForgotPassword } from "./User_panel/ForgotPassword";
import { ResetPassword } from "./User_panel/ResetPassword";
import { UserContact } from "./User_panel/UserContact";
import { SignUp } from "./User_panel/SignUp";
import { PageNotFound } from "./User_panel/PageNotFound";
import { UpdatePassword } from "./User_panel/UpdatePassword";
import { UpdateProfile } from "./User_panel/UpdateProfile";
import { VerifyEmail } from "./User_panel/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WillSummary } from "./User_panel/WillSummary";
const App = () => {
   return (
      <>
         <ToastContainer />
         <Routes>
            {/* Redirect root path to SignIn */}
            <Route path="/" element={<Navigate to="/user-signin" />} />

            {/* Public Routes */}

            <Route path="/signup" element={<SignUp />} />
            <Route path="/user-signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<UserContact />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route
               path="/user-dashboard"
               element={
                  <ProtectedRoute>
                     <UserDashboard />
                  </ProtectedRoute>
               }
            >
               <Route index element={<Userdashboard />} />
               <Route path="details" element={<PersonalDetails />} />
               <Route path="user_details" element={<ChildDetail />} />
               <Route path="my_asset" element={<MyAsset />} />
               <Route path="trust_details" element={<TrustDetail />} />
               <Route path="executer_details" element={<ExecuterDetail />} />
               <Route path="your_wishes" element={<YourWishes />} />
               <Route path="user_will" element={<UserWill />} />
               <Route path="will_summary" element={<WillSummary />} />
               <Route path="new_child" element={<NewChild />} />
               <Route path="new_asset" element={<NewAsset />} />
               <Route path="edit-child" element={<EditChild />} />
               <Route path="edit-asset" element={<EditAsset />} />
               <Route path="update-password" element={<UpdatePassword />} />
               <Route path="update-profile" element={<UpdateProfile />} />
            </Route>

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
};

export default App;
