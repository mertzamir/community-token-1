import React, { useContext } from "react";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import { useWeb3Context } from "../../utils/web3context";

export default function CreateCommunity() {
  const {
    success,
    handleName,
    handleDescription,
    handleBufferArray,
    submitCreateCommunityForm,
  } = useWeb3Context();

  return (
    <div className="bg-community-background bg-cover bg-center">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:mb-24 mb-16 lg:mb-24 lg:text-[5vh] md:text-[3vh] text-[20px] text-center lg:mt-12 lg:mb-12 md:mt-28 md:mb-[10px] mt-12  text-white">
            Create New Community
          </div>
          <div className="bg-[#23024d] md:px-24 md:py-12 px-12 py-12 rounded-2xl flex justify-center grid grid-cols-1 gap-4 opacity-75 border-4 border-white">
            <label className="block cursor-pointer text-center text-white">
              Invite bot
            </label>
            <a
              className="flex justify-center"
              target="_blank"
              rel="noreferrer"
              href="https://discord.com/api/oauth2/authorize?client_id=996115272677195789&permissions=8&scope=applications.commands+bot"
            >
              <button className="md:px-24 px-4 font-bold py-4 bg-white rounded-full text-[#23024d] hover:bg-gray-100 block cursor-pointer text-center text-white">
                Invite discord bot
              </button>
            </a>
            <form onSubmit={submitCreateCommunityForm}>
              <label className="block cursor-pointer text-center mb-2 text-white">
                Name
              </label>
              <input
                onChange={handleName}
                className="rounded-2xl  px-36 h-12 pl-2 text-center"
                minLength="1"
                maxLength="30"
                type="text"
                required
              ></input>
              <label className="block cursor-pointer text-center mt-4 mb-2 text-white">
                Short Description
              </label>
              <textarea
                onChange={handleDescription}
                className="rounded-2xl h-24 pl-2 text-center px-36"
                minLength="10"
                maxLength="80"
                type="text"
                required
              ></textarea>
              <label className="block cursor-pointer text-center mt-4  mb-2 text-white">
                Upload Logo
              </label>
              <input
                onChange={handleBufferArray}
                required
                type="file"
                className="cursor-pointer block w-full text-sm text-white file:mr-4 file:py-2 md:file:px-8 file:px-2 file:py-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[#23024d] hover:file:bg-gray-100"
              />
              <div className="mt-4">
                <button
                  type="submit"
                  className="md:px-36 px-16 font-bold py-4 bg-white rounded-full text-[#23024d] hover:bg-gray-100"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* <div className="bg-[#23024d] md:px-24 md:py-12 px-12 py-12 rounded-2xl flex justify-center grid grid-cols-1 gap-4 opacity-75 border-4 border-white">
              <p className="text-center text-white">
                You&apos;ve successfully created a community. Check it out
                here.. link here
              </p>
            </div> */}
        </main>
      </div>
    </div>
  );
}
