import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "../utils/web3context";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://lzjh0bzuprum.usemoralis.com:2053/server"
      appId="Fw1ZS0v9NyFKZAVNZIelFoDd1jQD1IDccm8KgGBp"
    >
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </MoralisProvider>
  );
}

export default MyApp;
