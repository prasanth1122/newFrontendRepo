import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/redux/slices/authSlice";
import LoginForm from "../components/loginForm/loginForm";
import LandingNavbar from "../components/navbar/landingpageNavbar";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, errorMessage, userData } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UseRef to track whether navigation has occurred
  const hasNavigated = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action with the credentials
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    // Check if userData contains token and if navigation has already occurred
    if (userData?.token && !hasNavigated.current) {
      console.log("Login successful, redirecting to /store:", userData);

      // Save the token in localStorage
      localStorage.setItem("token", userData?.token);
      localStorage.setItem("user", userData?.user.id);
      localStorage.setItem("name", userData?.user.name);
      console.log(
        "Token saved in localStorage:",
        localStorage.getItem("token"),
        localStorage.getItem("user"),
        localStorage.getItem("name")
      );

      // Mark navigation as done
      hasNavigated.current = true;

      // Navigate to the store page
      navigate(`/home`);
    }
  }, [userData, navigate]); // Only watch for userData change

  useEffect(() => {
    if (userData?.token) {
      console.log("Received token:", userData.token);
    }
  }, [userData]);

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden">
      <LandingNavbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-8">
        <h1 className="text-4xl text-important_text w-full text-center font-bold">
          Welcome Back!
        </h1>

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        {isError && <div className="text-red-500 mt-4">{errorMessage}</div>}
      </main>
    </section>
  );
}
