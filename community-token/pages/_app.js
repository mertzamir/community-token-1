import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "../utils/web3context";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://sy1iyrlwxh8o.usemoralis.com:2053/server"
      appId="8i2wqq5PM876L0GYRJ2jKUEKmUUUKHVd9XiyD1tJ"
    >
      <Web3Provider>
          <Component {...pageProps} />
      </Web3Provider>
    </MoralisProvider>
  );
}

export default MyApp;
