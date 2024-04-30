import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase/Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const addUser = () => {
    if (name === "" || email === "" || password === "") {
      alert("All fildes are required !");
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((res) =>
        console.log(res)
      );
      navigate("/home");
    }
  };

  const addUserBygoogle = () => {
    signInWithPopup(auth, googleProvider);
    navigate("/home");
  };

  return (
    <div className="bg-yellow-300 w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="bg-[#2F4858] w-[90vw] h-[80vh] lg:w-[30vw] lg:h-[70vh] rounded-lg">
        <h3 className="text-white text-center text-2xl font-mono my-5">
          Sign Up
        </h3>
        <div className="w-full h-2 p-3 bg-yellow-300"></div>
        <div className="flex flex-col gap-5 items-center mt-10">
          <CustomInput
            Type="text"
            Value={name}
            setValue={setName}
            title="User Name "
          />
          <CustomInput
            Type="text"
            Value={email}
            setValue={setEmail}
            title="Email Address "
          />
          <CustomInput
            Type="password"
            Value={password}
            setValue={setPassword}
            title="Password "
          />
          <CustomBtn
            handleSubmit={addUser}
            title="Create Account"
            addstyle={
              "bg-yellow-300 text-gray-900  font-semibold font-mono w-[14.5rem] lg:w-[22rem] mt-4"
            }
          />
        </div>
        <h3 className="text-white text-center my-3"> --- OR --- </h3>
        <div className="flex items-center justify-center">
          <CustomBtn
            handleSubmit={addUserBygoogle}
            title="📌 Signup with Google"
            addstyle={
              "bg-blue-400 text-gray-900 relative font-semibold font-mono lg:w-[22rem] mt-2"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
