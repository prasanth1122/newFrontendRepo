import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/redux/slices/authSlice.jsx"; // import the signup action
import { useState } from "react";
import { createFreeSubscription, checkEmail } from "../../../Api/Api.js";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    institution: "",
  });
  const [emailError, setEmailError] = useState(""); // State for email validation error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateEmail = async () => {
    try {
      const response = await checkEmail(formData.email);
      if (response.exists) {
        setEmailError("Email is already registered.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailError("Error validating email. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prevent signup if email is already registered
    if (emailError) {
      alert("Please fix the email error before proceeding.");
      return;
    }

    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "user",
      userType: formData.role,
      institution: formData.institution, // or other role as needed
    };

    try {
      // Dispatch signup action and wait for the response
      const signupResponse = await dispatch(userSignup(signupData));
      console.log(signupResponse);

      if (signupResponse?.payload?.user?.id) {
        const userId = signupResponse.payload.user.id;

        // Call createFreeSubscription after successful signup
        const subscriptionResponse = await createFreeSubscription(userId);
        console.log("Free subscription created:", subscriptionResponse);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup or subscription creation:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 bg-terinary px-8 py-4 rounded-xl flex flex-col items-center gap-6 mt-8"
    >
      <p className="text-2xl font-bold text-important_text">Sign Up</p>

      {/* Name Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Email Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={validateEmail} // Validate email on blur
          placeholder="Enter your email"
          className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
            emailError
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-primary"
          }`}
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      {/* Role Selection */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="role" className="text-lg font-medium">
          Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>
      </div>

      {/* Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="confirm-password" className="text-lg font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="institution" className="text-lg font-medium">
          Institution
        </label>
        <input
          type="institution"
          id="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Enter Institution"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary-dark transition duration-300"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Error message */}
      {isError && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* Login Link */}
      <p className="text-sm">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-important_text font-medium hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
}
