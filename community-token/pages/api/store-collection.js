import { create } from "ipfs-http-client"
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
const ipfs = create("https://ipfs.infura.io:5001")

export default async function handler(req, res) {
    // MORALIS INIT
    const Moralis = require("moralis/node");
    const serverUrl = process.env.SERVER_URL;
    const appId = process.env.APP_ID;
    const masterKey = process.env.MASTER_KEY;
    await Moralis.start({ serverUrl, appId, masterKey });

    const body = req.body;

    // REMOVE JPG INFORMATION FOR MORALIS DB
    const tokens = JSON.parse(body.tokens);
    const tokensDB = [];
    for (let i = 0; i < tokens.length; i++) {
        const tokenData = {
            tokenName: tokens[i].tokenName,
            tokenDescription: tokens[i].tokenDescription,
            initialSupply: tokens[i].initialSupply, //tokens[i].jpgBuffer -> holds the jpg buffers
        };
        tokensDB.push(tokenData);
    }

    // QUERY COLLECTIONS FOR THIS PARTICULAR COMMUNITY AND STORE IDX
    const Collection = Moralis.Object.extend("Collections");
    const query = new Moralis.Query(Collection);
    query.equalTo("CommunityId", body.communityId);
    const collections = await query.find();
    const idx = collections.length;

    // CREATE COLLECTION OBJECT IN COLLECTIONS CLASS
    const collection = new Collection();
    collection.set("CommunityId", body.communityId);
    collection.set("Name", body.collectionName);
    collection.set("Airdrop", body.airdrop);
    collection.set("idx", idx);

    // UPLOAD JPEGS TO IPFS
    const tokenMetadatas = []
    const tokenSupplies = []
    const tokenIds = []
    for (let i = 0; i < tokens.length; i++) {
        const result = await ipfs.add(tokens[i]["jpgBuffer"]["data"])
        const url = "https://gateway.ipfs.io/ipfs/" + result.path
        tokensDB[i]["url"] = url
        let meta = {
            name: tokensDB[i].tokenName,
            description: tokensDB[i].tokenDescription,
            image: url
        }
        tokenMetadatas.push(meta)
        // Save metadata locally, they'll get uploaded to IPFS with Web3Storage
        meta = JSON.stringify(meta)
        fs.writeFile(`tempFiles/${i + 1}.json`, meta, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
        tokenSupplies.push(tokensDB[i].initialSupply)
        tokenIds.push(i + 1)
    };
    collection.set("Tokens", tokensDB);
    await collection.save();

    // UPLOAD NFT METADATA TO IPFS VIA PINATA
    let baseMetadataURI = "https://gateway.pinata.cloud/ipfs/QmfPCgxbHWkNv4bMJHpoKXBohnV4umzpY3D9YfZQd5HwZF"
    const appDir = __dirname.substring(0, __dirname.length - 22);
    const sourcePath = appDir + 'tempFiles/';
    pinata.pinFromFS(sourcePath).then((result) => {
        //handle results here
        console.log("Uploaded Metadata Result", result);
        baseMetadataURI += result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

    // TODO: DELETE LOCAL METADATA FILES


    // RETURN
    const Communities = Moralis.Object.extend("Communities");
    const query2 = new Moralis.Query(Communities);
    query2.equalTo("objectId", body.communityId);
    const community = await query2.first({ useMasterKey: true })
    const addr = await community.get("CloneAddress")

    res.status(200).json({
        baseMetadataURI: baseMetadataURI,
        tokenIds: tokenIds,
        tokenSupplies: tokenSupplies,
        contractAddress: addr,
    });
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};