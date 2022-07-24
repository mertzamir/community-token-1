import React, { useContext, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import { useWeb3Context } from "../../utils/web3context";
import { communityABI } from "../../components/smart-contract-info";

export default function CreateCollection(props) {
  const router = useRouter();
  const [inputFields, setInputFields] = useState([
    { tokenName: "", tokenDescription: "", initialSupply: "", jpgBuffer: [] },
  ]);
  const { Moralis } = useMoralis()
  const { runContractFunction } = useWeb3Contract()

  const {
    success,
    handleCollectionName,
    handleCollectionDescription,
    handleCollectionTotalSupply,
    handleCollectionJPEG,
    submitAddCollectionForm,
  } = useWeb3Context();

  // HANDLE FORM SUBMIT- CREATES JSON OBJECT AND SENDS POST REQUEST
  async function handleSubmit(e) {
    e.preventDefault();
    const collectionName = document.getElementById("collectionName").value;
    const airdrop = document.getElementById("checkbox").checked;
    const query = router.query;
    const communityId = query.index.toString();
    const data = {
      communityId: communityId,
      collectionName: collectionName,
      airdrop: airdrop,
      tokens: JSON.stringify(inputFields),
    }; ""
    console.log("data", data);

    const res = await fetch("/api/store-collection", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json()
    console.log("resData: ", resData)
    console.log("addr", resData.contractAddress)

    const methodParams = {
      abi: communityABI,
      contractAddress: resData.contractAddress,
      functionName: "createCollection",
      params: {
        _baseMetadataURI: resData.baseMetadataURI,
        _tokenIds: resData.tokenIds,
        _initialSupplies: resData.tokenSupplies,
      }
    }

    await Moralis.enableWeb3()
    await runContractFunction({
      params: methodParams,
      onError: (err) => console.log(err)
    })

    // router.push("/owner-dashboard/" + communityId);
  }

  // CHANGES INPUT FIELD VALUES
  function handleChangeInput(index, event) {
    const values = [...inputFields]; // what dis do
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }

  // ADDS FIELDS WHEN ADD BUTTON CLICKED
  const handleAddFields = (e) => {
    e.preventDefault();
    setInputFields([
      ...inputFields,
      { tokenName: "", tokenDescription: "", initialSupply: "", jpgBuffer: [] },
    ]);
  };

  // REMOVES FIELDS WHEN REMOVE BUTTON CLICKED
  const handleRemoveFields = (index, e) => {
    e.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  // CREATES BUFFER ARRAY FROM IMAGES UPLOADED BY USER
  function captureFile(index, e) {
    e.preventDefault();
    const values = [...inputFields];
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      values[index][e.target.name] = Buffer(reader.result)
      setInputFields(values);
    };
  }

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

          <form>
            <div>
              <input
                id="collectionName"
                placeholder="Name of Collection"
                type="text"
              />
              <label>
                <input id="checkbox" type="checkbox" />
                Do you want to make this collection an airdrop collection (to distribute rewards for participation)?
              </label>
            </div>
            {inputFields.map((inputField, index) => (
              <div key={index}>
                <input
                  name="tokenName"
                  placeholder="Token Name"
                  type="text"
                  onChange={(event) => handleChangeInput(index, event)}
                  defaultValue={inputField.tokenName}
                />
                <input
                  name="tokenDescription"
                  placeholder="Token Description"
                  type="text"
                  onChange={(event) => handleChangeInput(index, event)}
                  defaultValue={inputField.tokenDescription}
                />
                <input
                  name="initialSupply"
                  placeholder="Initial Token Supply"
                  type="text"
                  onChange={(event) => handleChangeInput(index, event)}
                  defaultValue={inputField.initialSupply}
                />
                <input
                  name="jpgBuffer"
                  type="file"
                  onChange={(e) => captureFile(index, e)}
                  defaultValue={inputField.jpgBuffer}
                />
                <button style={{ color: 'white' }} onClick={(e) => handleAddFields(e)}>Add</button>
                <button style={{ color: 'white' }} onClick={(e) => handleRemoveFields(index, e)}>
                  Remove
                </button>
              </div>
            ))}
            <button style={{ color: 'white' }} onClick={handleSubmit}>Submit</button>
          </form>

          {/* <form
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
          </form> */}
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const Moralis = require("moralis/node");
  // MORALIS INIT CODE
  const serverUrl = process.env.SERVER_URL;
  const appId = process.env.APP_ID;
  const masterKey = process.env.MASTER_KEY;
  await Moralis.start({ serverUrl, appId, masterKey });

  // GET COLLECTION DETAILS
  const { index } = context.query;
  const Communities = Moralis.Object.extend("Communities");
  const query = new Moralis.Query(Communities);
  query.equalTo("objectId", index);
  const community = await query.first({ useMasterKey: true });
  const communityAddress = community.get("CloneAddress");
  console.log(communityAddress)

  return {
    props: {
      communityAddress: communityAddress,
    },
  };
}
