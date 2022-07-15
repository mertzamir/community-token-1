import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl="https://lzjh0bzuprum.usemoralis.com:2053/server" appId="Fw1ZS0v9NyFKZAVNZIelFoDd1jQD1IDccm8KgGBp">
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
