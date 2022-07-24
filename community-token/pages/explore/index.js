import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import JoinCommuntiyModal from "../../components/JoinCommunityModal";

export default function Explore(props) {
  const [openModal, setOpenModal] = useState();
  const [clickedCommunity, setClickedCommunity] = useState(null);
  let communities = props.communities;

  const openIndividualModal = (community) => {
    setOpenModal(true);
    setClickedCommunity(community);
  };

  const closeIndividualModal = (community) => {
    setOpenModal(false);
    setClickedCommunity(community);
  };

  return (
    <div className="bg-[#22014d]">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:text-[6vh] text-[4vh] mt-12 mb-12 text-white">
            Explore Communities
          </div>
          <div className=" xl:grid xl:grid-cols-3 md:grid md:grid-cols-2 gap-12 flex justify-center flex-wrap">
            {communities.map((community, index) => (
              <div
                id={index}
                key={index}
                className="bg-white font-bold rounded-lg border-white border-8"
              >
                <div className="flex justify-center">
                  <img
                    src={community.imagePath}
                    className="w-[370px] h-[360px] rounded-lg "
                  />
                </div>
                <div className="text-center mt-4 text-[#23024d]">
                  {community.name}
                </div>
                <div className="text-center text-[#23024d]">
                  {community.description}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => openIndividualModal(community)}
                    className="mt-4 md:px-16 px-4 font-bold py-4 bg-[#23024d] mb-2  rounded-full hover:bg-gray-500 block cursor-pointer text-center text-white"
                  >
                    Join Community
                  </button>
                </div>
                {openModal && (
                  <JoinCommuntiyModal
                    id={index}
                    key={index}
                    clickedCommunity={clickedCommunity}
                    closeModal={() => closeIndividualModal(clickedCommunity)}
                  />
                )}
              </div>
            ))}
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
