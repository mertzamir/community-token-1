import { createContext, useState, useContext } from "react";
import { useMoralis } from "react-moralis";

export const CommunityContext = createContext(null);

export const useCommunityContext = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [logoURL, setLogoURL] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useMoralis();
  const currentUser =
    user !== null || user != "undefined" ? user.get("ethAddress") : "";

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
      //gives us the result which will be an arry of data to pass into the buffer
      setLogoURL(Buffer(reader.result));
    };
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
