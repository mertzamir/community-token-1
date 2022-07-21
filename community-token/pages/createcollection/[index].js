import React, { useContext } from "react";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import { useWeb3Context } from "../../utils/web3context";

export default function CreateCollection() {
  const {
    success,
    handleCollectionName,
    handleCollectionDescription,
    handleCollectionTotalSupply,
    handleCollectionJPEG,
    submitAddCollectionForm,
  } = useWeb3Context();
  return (
    <div className="bg-community-background bg-cover bg-center">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:mb-24 mb-16 lg:mb-24 lg:text-[5vh] md:text-[3vh] text-[20px] text-center lg:mt-12 lg:mb-12 md:mt-28 md:mb-[10px] mt-12  text-white">
            Add New Collection
          </div>

          <form
            onSubmit={submitAddCollectionForm}
            className="bg-[#23024d] md:px-24 md:py-12 px-12 py-12 rounded-2xl flex justify-center grid grid-cols-1 gap-4 opacity-75 border-4 border-white"
          >
            <label className="block cursor-pointer text-center text-white">
              Collection Name
            </label>
            <input
              onChange={handleCollectionName}
              className="rounded-2xl  h-12 pl-2 text-center"
              minLength="1"
              maxLength="30"
              type="text"
              required
              placeholder="Name of Collection"
              id="collection name"
            ></input>
            <label className="block cursor-pointer text-center text-white">
              Collection Description
            </label>
            <textarea
              onChange={handleCollectionDescription}
              className="rounded-2xl h-24 pl-2 text-center"
              minLength="10"
              maxLength="80"
              type="text"
              required
              placeholder="Description of Collection"
            ></textarea>
            <label className="block cursor-pointer text-center text-white">
              Total Supply
            </label>
            <input
              onChange={handleCollectionTotalSupply}
              className="rounded-2xl  h-12 pl-2 text-center"
              type="number"
              required
              min="1"
              placeholder="Collection Supply Amount"
              id="collection name"
            ></input>
            <label className="block cursor-pointer text-center text-white">
              Image
            </label>
            <input
              onChange={handleCollectionJPEG}
              required
              type="file"
              className="cursor-pointer block w-full text-sm text-white file:mr-4 file:py-2 md:file:px-8 file:px-2 file:py-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[#23024d] hover:file:bg-gray-100"
            />
            <div className="mt-8">
              <button
                type="submit"
                className="md:px-36 px-16 font-bold py-4 bg-white rounded-full text-[#23024d] hover:bg-gray-100"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
