import { createContext, useState } from "react";
import { useMoralis } from "react-moralis";

export const Web3Context = createContext(null);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const { authenticate, user, logout, isAuthenticated} = useMoralis();

  const metaMaskLogin = async () => {
    console.log("hello");
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
    console.log("hello");
  };

  const logoutWallet = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <Web3Context.Provider
      value={{ user, isAuthenticated,  metaMaskLogin, walletConnectLogin, logoutWallet }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default { useWeb3Context, Web3Provider };
