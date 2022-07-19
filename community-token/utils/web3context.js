import { createContext, useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const Web3Context = createContext(null);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState("");
  const [logoURL, setLogoURL] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { authenticate, logout, isAuthenticated, user } = useMoralis();
  const currentUser = isAuthenticated ? user.get("ethAddress") : "";

  const metaMaskLogin = async () => {
    try {
      await authenticate();
    } catch (e) {
      console.error(e);
    }
  };

  const walletConnectLogin = async () => {
    try {
      await authenticate({ provider: "walletconnect" });
    } catch (e) {
      console.error(e);
    }
    ``;
  };

  const logoutWallet = async () => {
    await logout();
  };

  const submitCreateCommunityForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const createCommunityForm = {
        name,
        description,
        logoURL,
        currentUser,
      };

      const response = await fetch("/api/new-community", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCommunityForm),
      });

      await response.json();
      setSuccessMessage(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleLogoURL = (e) => {
    e.preventDefault();

    // getting the files uploaded
    const file = e.target.files[0];
    // getting the file readert
    const reader = new window.FileReader();
    // converting file to an array that the buffer can understand
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      //   //gives us the result which will be an arry of data to pass into the buffer
      setLogoURL(Buffer(reader.result));
    };
  };

  useEffect(() => {}, [user]);

  return (
    <Web3Context.Provider
      value={{
        user,
        isAuthenticated,
        metaMaskLogin,
        walletConnectLogin,
        logoutWallet,
        handleName,
        handleDescription,
        handleLogoURL,
        loading,
        successMessage,
        submitCreateCommunityForm,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default { Web3Context, useWeb3Context, Web3Provider };
