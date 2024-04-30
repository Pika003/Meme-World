import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  memes: [],
  name: "",
  email: "",
  isLogin: false,
  setName: () => {},
  setEmail: () => {},
  setIsLogin: () => {},
  setMemes: () => {},
});

export const useData = () => {
  return useContext(UserContext);
};

export const Provideruser = UserContext.Provider;

export const UserProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        memes,
        name,
        email,
        isLogin,
        setName,
        setEmail,
        setIsLogin,
        setMemes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
