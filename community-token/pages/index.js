import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/Footer";
import JoinCommuntiyModal from "../components/JoinCommunityModal";

export default function Home(props) {
  const [openModal, setOpenModal] = useState();
  const [clickedCommunity, setClickedCommunity] = useState(null);
  let communities = props.communities;

  const openIndividualModal = (community) => {
    setOpenModal(true);
    console.log(community);
    setClickedCommunity(community);
  };

  const closeIndividualModal = (community) => {
    setOpenModal(false);
    setClickedCommunity(community);
  };
  return (
    <div className="bg-home-background bg-no-repeat bg-cover">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <Head>
          <title>Community Token</title>
          <meta name="description" content="Community Token" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="lg:mt-24">
            {/* Desktop  */}

            <div className="lg:grid grid-cols-3 gap-2 xl:mt-8 items-center">
              <div className="col-span-2 text-white xl:text-[6vh] lg:text-[6.5vh] md:text-5xl lg:text-left  text-center text-[4vh] font-bold leading-none">
                Create, join, <br />
                and explore new
                <p className="text-[#cdadff]">communities.</p>
                <p className="mt-4 lg:text-[3vh] text-xl text-[2vh] lg:text-left text-center font-thin text-white md:mb-8">
                  For creators and by creators
                </p>
              </div>

              {/* Mobile  */}
              <div className="flex justify-center mt-4 mb-4  lg:hidden">
                <div className="flex rounded-3xl lg:hidden lg:ml-18">
                  <div
                    key={0}
                    className="bg-white font-bold rounded-lg border-white border-8"
                  >
                    <p className="text-center mb-4 text-[#23024d]">
                      New Featured Collection
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={communities[communities.length - 1].imagePath}
                        className="w-[370px] h-[360px] rounded-lg "
                      />
                    </div>
                    <div className="text-center mt-4 text-[#23024d]">
                      {communities[communities.length - 1].name}
                    </div>
                    {/* <div className="text-center text-[#23024d]">
                      {communities[communities.length - 1].description}
                    </div> */}
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          openIndividualModal(
                            communities[communities.length - 1]
                          )
                        }
                        className="mt-4 md:px-16 px-4 font-bold py-4 bg-[#23024d] mb-2  rounded-full hover:bg-gray-500 block cursor-pointer text-center text-white"
                      >
                        Join Community
                      </button>
                    </div>
                    {openModal && (
                      <JoinCommuntiyModal
                        id={communities.length - 1}
                        key={communities.length - 1}
                        clickedCommunity={clickedCommunity}
                        closeModal={() =>
                          closeIndividualModal(clickedCommunity)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop */}

              <div className="lg:flex rounded-3xl hidden lg:ml-18">
                <div
                  key={0}
                  className="bg-white font-bold rounded-lg border-white border-8"
                >
                  <p className="text-center mb-4 text-[#23024d]">
                    New Featured Collection
                  </p>

                  <div className="flex justify-center">
                    <img
                      src={communities[communities.length - 1].imagePath}
                      className="w-[370px] h-[360px] rounded-lg "
                    />
                  </div>
                  <div className="text-center mt-4 text-[#23024d]">
                    {communities[communities.length - 1].name}
                  </div>
                  {/* <div className="text-center text-[#23024d]">
                    {communities[communities.length - 1].description}
                  </div> */}
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        openIndividualModal(communities[communities.length - 1])
                      }
                      className="mt-4 md:px-16 px-4 font-bold py-4 bg-[#23024d] mb-2  rounded-full hover:bg-gray-500 block cursor-pointer text-center text-white"
                    >
                      Join Community
                    </button>
                  </div>
                  {openModal && (
                    <JoinCommuntiyModal
                      id={communities.length - 1}
                      key={communities.length - 1}
                      clickedCommunity={clickedCommunity}
                      closeModal={() => closeIndividualModal(clickedCommunity)}
                    />
                  )}
                </div>
              </div>
              <Link href="/explore">
                <a className="md:flex justify-center ml-8 lg:-mt-24 md:ml-4  relative text-center text-black hidden ">
                  <Image
                    src="/button.png"
                    alt="Explore Button"
                    width={190}
                    height={60}
                  />
                  <div className="absolute inset-x-0.5 top-4 text-[#23024d] font-bold text-lg ">
                    Explore
                  </div>
                </a>
              </Link>

              {/* Mobile */}

              <div className="flex justify-center mt-12">
                <Link href="/explore">
                  <a className=" relative text-center text-black md:hidden">
                    <Image
                      src="/button.png"
                      alt="Explore Button"
                      width={140}
                      height={40}
                    />
                    <div className="absolute inset-x-0.5 top-2 text-[#23024d] font-bold text-sm">
                      Explore
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const Moralis = require("moralis/node");
  const communities = [];

  // MORALIS INIT CODE
  const serverUrl = process.env.SERVER_URL;
  const appId = process.env.APP_ID;
  const masterKey = process.env.MASTER_KEY;
  await Moralis.start({ serverUrl, appId, masterKey });

  // GET COMMUNITIES
  // const { index } = context.query;
  // console.log("index", index);
  const Communities = Moralis.Object.extend("Communities");
  const query = new Moralis.Query(Communities);
  // query.equalTo("objectId" , index);
  const results = await query.find();

  /// need to improve this by just using find function to find last one added
  for (let i = 0; i < results.length; i++) {
    const community = {
      name: results[i].get("Name"),
      description: results[i].get("Description"),
      imagePath: results[i].get("imagePath"),
    };
    communities.push(community);
  }

  console.log(communities);

  return {
    props: {
      communities: communities.map((community) => ({
        name: community.name,
        description: community.description,
        imagePath: community.imagePath,
      })),
    },
  };
}
