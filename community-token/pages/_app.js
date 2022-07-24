import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "../utils/web3context";
global.__basedir = __dirname;

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://u7ta6ex1wtqp.usemoralis.com:2053/server"
      appId="FvkkeWMOjyPtYefdg7RuEsQHWcNHpxmB0Gu0FCo5"
    >
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </MoralisProvider>
  );
}

export default MyApp;
