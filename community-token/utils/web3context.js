import { createContext, useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { router } from "next/router";
import { cloneFactoryABI } from "../components/smart-contract-info";
import { useNotification } from "web3uikit";

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
  const { runContractFunction } = useWeb3Contract();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState("");
  const [bufferArray, setBufferArray] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { authenticate, logout, isAuthenticated, user, Moralis } = useMoralis();
  const currentUser = isAuthenticated ? user.get("ethAddress") : "";

  const [collectionName, setCollectionName] = useState();
  const [collectionDescription, setCollectionDescription] = useState();
  const [collectionJPEG, setCollectionJPEG] = useState();
  const [collectionTotalSupply, setCollectionTotalSuppy] = useState();

  const [discordName, setDiscordName] = useState("");
  // Wallet configuration
  const metaMaskLogin = async () => {
    try {
      await authenticate();
      router.push("/community/account");
    } catch (e) {
      console.error(e);
    }
  };

  const walletConnectLogin = async () => {
    try {
      await authenticate({ provider: "walletconnect" });
      router.push("/community/account");
    } catch (e) {
      console.error(e);
    }
    ``;
  };

  const logoutWallet = async () => {
    await logout();
    router.push("/");
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

  const handleBufferArray = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      setBufferArray(Buffer(reader.result));
    };
  };

  const submitCreateCommunityForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await fetch("/api/check-discord-bot", {
        method: "GET",
      });

      if (res.status == 200) {
        // creating community clone
        await Moralis.enableWeb3();
        const methodParams = {
          abi: cloneFactoryABI,
          contractAddress: "0xBB4a18773C5F036Ad821059dd3574320934b567F",
          functionName: "createNewCommunity",
        };
        await runContractFunction({
          chain: "rinkeby",
          params: methodParams,
          onSuccess: handleSuccess,
          onError: (err) => console.log(err),
        });

        setLoading(false);
      } else {
        console.log("pls invite bot to your server");
        // display error message in frontend
      }
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

  const handleSuccess = async (tx) => {
    const receipt = await tx.wait(1);
    const communityClone = receipt.events[2].args[0].toString();
    const createCommunityForm = {
      name,
      description,
      bufferArray,
      currentUser,
      communityClone,
    };
    const response = await fetch("/api/new-community", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCommunityForm),
    });
    const path = await response.json();
    // console.log(response.)
    router.push("/community/details/" + path);

    // dispatch({
    //   type: "success",
    //   message: "New Community",
    //   title: "New Community Created!",
    //   position: "topR",
    // });
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

  // Join Community
  const handleDiscordName = (e) => {
    e.preventDefault();
    setDiscordName(e.target.value);
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
        handleBufferArray,
        handleDiscordName,
        loading,
        successMessage,
        submitCreateCommunityForm,
        handleCollectionName,
        handleCollectionDescription,
        handleCollectionTotalSupply,
        handleCollectionJPEG,
        submitAddCollectionForm,
        currentUser,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default { Web3Context, useWeb3Context, Web3Provider };
