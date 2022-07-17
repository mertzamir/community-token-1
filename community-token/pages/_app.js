import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "../utils/web3context";
import { CommunityProvider } from "../utils/communitycontext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://lzjh0bzuprum.usemoralis.com:2053/server"
      appId="Fw1ZS0v9NyFKZAVNZIelFoDd1jQD1IDccm8KgGBp"
    >
      <Web3Provider>
        <CommunityProvider>
          <Component {...pageProps} />
        </CommunityProvider>
      </Web3Provider>
    </MoralisProvider>
  );
}

export default MyApp;
