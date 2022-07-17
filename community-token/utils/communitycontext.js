import { createContext, useState, useContext } from "react";
import { Web3Context } from "../utils/web3context";

export const CommunityContext = createContext(null);

export const useCommunityContext = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [logoURL, setLogoURL] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { address } = useContext(Web3Context);

  const submitCreateCommunityForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const createCommunityForm = {
        name,
        description,
        logoURL,
        address,
        //   cloneAddress,
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
    setLogoURL(e.target.value);
  };

  return (
    <CommunityContext.Provider
      value={{
        handleName,
        handleDescription,
        handleLogoURL,
        loading,
        successMessage,
        submitCreateCommunityForm,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default { CommunityContext, useCommunityContext, CommunityProvider };
