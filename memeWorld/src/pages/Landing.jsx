import React, { useEffect } from "react";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useData } from "../context/Context";

const Landing = () => {
  const auth = getAuth(app);
  const { name, email, isLogin, setName, setEmail, setIsLogin } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.reloadUserInfo)
        setName(user.reloadUserInfo.displayName);
        setEmail(user.reloadUserInfo.email);
        setIsLogin(true);
        navigate("/home");
      } else {
        //user not Login
        setIsLogin(false);
      }
    });
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-yellow-300 w-[100vw] h-[100vh] flex flex-col ">
      <h1 className="text-center text-3xl font-semibold font-mono pt-10">
        WellCome To Meme World
      </h1>
      <p className="text-center my-5">Login to see meme or create your own</p>
      <div className="flex gap-5 items-center justify-center mt-10 flex-col lg:flex-row lg:gap-20">
        <CustomBtn
          title="Login"
          handleSubmit={handleLogin}
          addstyle={"bg-green-500 text-white"}
        />{" "}
        <span>- OR -</span>
        <CustomBtn
          title="Signup"
          handleSubmit={handleSignup}
          addstyle={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
};

export default Landing;
