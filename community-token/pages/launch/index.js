import React, { useState, useContext } from "react";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Image from "next/image";
import ConnectWalletModal from "../../components/ConnectWalletModal";
import { Web3Context } from "../../utils/web3context";

export default function Launch() {
  const [openModal, setOpenModal] = useState();
  const isAuthenticated = useContext(Web3Context);

  return (
    <div className="bg-launch-background bg-cover bg-center">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className=" lg:text-[5vh] md:text-[3vh] text-[20px] text-center lg:mt-12 lg:mb-4 md:mt-28 md:mb-[10px] mt-12  text-white">
            Welcome To Community Token
          </div>
          <div className="lg:text-[6vh] text-white">
            <Image
              className="rounded-3xl "
              src="/connect-wallet.png"
              alt="Web3 Screen"
              width={1080}
              height={520}
            />
            <div className="relative xl:mt-8 xl:bottom-[400px] lg:bottom-[350px] md:bottom-[250px] bottom-[32vw] text-white text-center font-thin lg:text-4xl md:text-2xl text-xs mt-2">
              Please, connect <br />
              your wallet
            </div>
            <div className="md:flex justify-center hidden ">
              <button
                className="relative xl:-top-[320px] lg:-top-[300px] md:-top-[200px]"
                onClick={() => setOpenModal(true)}
              >
                <Image
                  className="btn"
                  src="/button.png"
                  alt="Connect Wallet Button"
                  width={190}
                  height={60}
                />
                <div className="relative text-[#23024d] font-bold md:text-lg text-sm lg:bottom-[65px] md:bottom-[50px] bottom-[32vw]">
                  Connect
                </div>
              </button>
            </div>
            {/** Mobile */}
            <div className="flex justify-center md:hidden ">
              <button
                className="relative -top-[110px]"
                onClick={() => setOpenModal(true)}
              >
                <Image
                  className="btn"
                  src="/button.png"
                  alt="Connect Wallet Button"
                  width={80}
                  height={30}
                />
                <div className="relative text-[#23024d] font-bold text-xs bottom-[30px]">
                  Connect
                </div>
              </button>
            </div>

            {openModal && <ConnectWalletModal closeModal={setOpenModal} />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
