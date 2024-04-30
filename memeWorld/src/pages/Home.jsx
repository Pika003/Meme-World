import React, { useEffect, useState } from "react";
import { useData } from "../context/Context";
import CustomBtn from "../components/CustomBtn";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Popup from "./Popup";

const Home = () => {
  const [popup, setPopup] = useState(false);
  const firestore = getFirestore(app);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { memes, name, email, isLogin, setMemes } = useData();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } else {
      const fetchMemes = async () => {
        const Collectionref = collection(firestore, "meme");
        const q = query(Collectionref, where("isImage", "==", true));
        const snapshot = await getDocs(q);
        const memesArray = [];
        snapshot.forEach((doc) => {
          memesArray.push(doc.data());
        });
        setMemes(memesArray); // Update memes state once with the fetched array
      };

      fetchMemes();
    }
  }, [isLogin, navigate, setMemes, firestore]);

  const addMeme = () => {
    setPopup(true);
  };

  const GOprofile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex min-h-[100vh] items-center pt-16 bg-yellow-300 w-[100vw] h-full flex-col gap-10">
      <CustomBtn
        title="Logout"
        addstyle="absolute bg-red-300 text-red-900 right-3 top-3 lg:right-10 lg:top-10"
        handleSubmit={handleLogout}
      />
      <CustomBtn
        title={name}
        addstyle="absolute bg-green-300  text-green-900 left-3 top-3 lg:left-10 lg:top-10"
        handleSubmit={GOprofile}
      />
      <h1 className="text-center text-3xl font-semibold">
        Welcome to Meme World{" "}
        <span className=" font-mono text-[#2F4858] text-4xl ml-2">{name}</span>
      </h1>

      <CustomBtn
        title="Add Meme"
        handleSubmit={addMeme}
        addstyle="bg-green-300 text-green-900"
      />

      <div className="flex justify-center gap-10 flex-wrap">
        {memes.length > 0 ? (
          memes.map((data, index) => (
            <div key={index} className="p-4 m-4 bg-yellow-900 rounded-md">
              <img src={data.Imgurl} alt={data.Title} width={300} />
              <p className="text-black py-2 font-mono text-2xl">
                @{data.UserName} <span>❤️</span>
              </p>
              <p className="text-gray-300 font-medium py-2">{data.Title}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {popup && <Popup onClose={() => setPopup(false)} />}
    </div>
  );
};

export default Home;
