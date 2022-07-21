import { createContext, useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const Web3Context = createContext(null);

export const useWeb3Context = () => useContext(Web3Context);

// as soon as they submit the form youll send a GET request to discord bot
// check for success with discord bot
// if successfully create community make call to smart contract
// check event logs for clone data
// get transaction recipt to get the clone smart conract address
// then send get resuest to new communiy api
// then send final post with user data
// put everything in components

// dynamic pages
// view community page
// joined page
// rewards? now view communiy

export const Web3Provider = ({ children }) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState("");
  const [logoURL, setLogoURL] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { authenticate, logout, isAuthenticated, user } = useMoralis();
  const currentUser = isAuthenticated ? user.get("ethAddress") : "";

  const [collectionName, setCollectionName] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const [collectionJPEG, setCollectionJPEG] = useState();
  const [collectionTotalSupply, setCollectionTotalSuppy] = useState();

  // Wallet configuration
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

  // Image Buffer Generator
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      return Buffer(reader.result);
    };
  };

  // Create Commmunity
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleLogoURL = (e) => {
    e.preventDefault();
    setLogoURL(captureImage(e));
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
        clone,
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

  // Create Collection

  const handleCollectionName = (e) => {
    e.preventDefault();
    setCollectionName(e.target.value);
  };

  const handleCollectionDescription = (e) => {
    e.preventDefault();
    setCollectionDescription(e.target.value);
  };

  const handleCollectionJPEG = (e) => {
    e.preventDefault();
    setCollectionJPEG(e.target.value);
  };

  const handleCollectionTotalSupply = (e) => {
    e.preventDefault();
    setCollectionTotalSuppy(e.target.value);
  };

  const submitAddCollectionForm = async (e) => {
    try {
      e.preventDefault();

      const AddCollectionForm = {
        collectionName,
        collectionDescription,
        collectionJPEG,
        collectionTotalSupply,
      };

      console.log(AddCollectionForm);
    } catch (e) {
      console.log(e);
    }
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
        handleCollectionName,
        handleCollectionDescription,
        handleCollectionTotalSupply,
        handleCollectionJPEG,
        submitAddCollectionForm,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default { Web3Context, useWeb3Context, Web3Provider };
