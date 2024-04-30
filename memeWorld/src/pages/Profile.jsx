import React, { useEffect } from "react";
import CustomBtn from "../components/CustomBtn";
import { useData } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/Firebase";

function Profile() {
  const { memes, name, email, isLogin } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/");
  }, []);

  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex min-h-[100vh] items-center pt-16 bg-yellow-300 w-[100vw] h-full flex-col gap-10">
      <CustomBtn
        title="Logout"
        addstyle="absolute bg-red-300 text-red-900 lg:right-10 lg:top-10 right-3 top-3"
        handleSubmit={handleLogout}
      />
      <CustomBtn
        title="Back"
        addstyle="absolute bg-green-300 text-green-900 lg:left-10 lg:top-10 left-3 top-3"
        handleSubmit={backToHome}
      />
      <h1 className="text-center text-3xl font-semibold">
        Welcome to Meme World{" "}
        <span className="font-mono text-[#2F4858] text-4xl ml-2">{name}</span>
      </h1>
      <p className="text-xl font-mono">{email}</p>

      <div className="flex justify-center gap-10 flex-wrap">
        {memes.length > 0 ? (
          memes.map(
            (data, index) =>
              data.UserName === name && (
                <div key={index} className="p-4 m-4 bg-yellow-900 rounded-md">
                  <img src={data.Imgurl} alt={data.Title} width={300} />
                  <p className="text-black py-2 font-mono text-2xl">
                    @{data.UserName} <span>❤️</span>
                  </p>
                  <p className="text-black py-2 ">{data.Title}</p>
                </div>
              )
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
