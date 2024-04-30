import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useData } from "../context/Context";
import { app } from "../firebase/Firebase";

function Popup({ onClose }) {
  const { memes, isLogin, setMemes } = useData();
  const [title, setTitle] = useState("");
  const [imgurl, setImgurl] = useState("");
  const { name } = useData();

  const firestore = getFirestore(app);

  const addMeme = async () => {
    if (title == "" || imgurl == "") {
      alert("All filds are required !");
    } else {
      await addDoc(collection(firestore, "meme"), {
        Imgurl: imgurl,
        Title: title,
        UserName: name,
        isImage: true,
      });
      setMemes((prev) => [
        { Imgurl: imgurl, Title: title, UserName: name, isImage: true },
        ...prev,
      ]);
      onClose();
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-orange-900 h-[20rem] rounded-md w-72 sm:w-96">
        <div
          onClick={onClose}
          className="absolute bg-yellow-400 p-[0.3rem] rounded-lg m-1 cursor-pointer"
        >
          ✖️
        </div>

        <p className="text-center mt-5 mb-10 font-semibold">ADD NEW MEME</p>

        <div className="flex items-center justify-center flex-col gap-5">
          <CustomInput Value={title} setValue={setTitle} title="Title" />
          <CustomInput
            Value={imgurl}
            setValue={setImgurl}
            title="Meme Imgurl"
          />
          <CustomBtn
            handleSubmit={addMeme}
            title="Create Meme"
            addstyle="bg-yellow-300 mt-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Popup;
