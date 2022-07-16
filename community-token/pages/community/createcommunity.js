import React, { useState, useContext } from "react";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";

export default function CreateCommunity() {
  return (
    <div className="bg-community-background bg-cover bg-center">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:mb-12 mb-8 lg:mb-16 lg:text-[5vh] md:text-[3vh] text-[20px] text-center lg:mt-12 lg:mb-4 md:mt-28 md:mb-[10px] mt-12  text-white">
            Create New Community
          </div>
          <form className="bg-[#23024d] md:px-24 md:py-24 px-12 py-12 rounded-2xl flex justify-center grid grid-cols-1 gap-4 opacity-75 border-4 border-white">
            <label className="block cursor-pointer text-center text-white">
              Name
            </label>
            <input className="rounded-2xl  h-12 pl-2 text-center" maxlength="30" type="text"></input>
            <label className="block cursor-pointer text-center text-white">
              Short Description
            </label>
            <textarea className="rounded-2xl h-24 pl-2" maxlength="80" type="text"></textarea>
            <label className="block cursor-pointer text-center text-white">
              Upload image
            </label>
            <span className="sr-only">Choose File</span>
            <input
              type="file"
              className="cursor-pointer block w-full text-sm text-white file:mr-4 file:py-2 md:file:px-12 file:px-2 file:py-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[#23024d] hover:file:bg-gray-100"
            />
          </form>
        </main>
      </div>
    </div>
  );
}
