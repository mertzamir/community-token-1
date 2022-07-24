import { create } from "ipfs-http-client"
import * as cbor from '@ipld/dag-cbor'
import { Web3Storage } from 'web3.storage'
import { importer } from 'ipfs-unixfs-importer'

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
            initialSupply: tokens[i].initialSupply,
        };
        tokensDB.push(tokenData);
    }

    // QUERY COLLECTIONS FOR THIS PARTICULAR COMMUNITY AND STORE IDX
    const Collection = Moralis.Object.extend("Collections");
    const query = new Moralis.Query(Collection);
    query.equalTo("CommunityId", body.communityId);
    const collections = await query.find();
    const idx = collections.length;

    // STORE COLLECTION IN COLLECTIONS CLASS
    const collection = new Collection();
    collection.set("CommunityId", body.communityId);
    collection.set("Name", body.collectionName);
    collection.set("Airdrop", body.airdrop);
    collection.set("idx", idx);

    // UPLOAD JPEGS TO IPFS
    const tokenMetadatas = []
    const tokenSupplies = []
    for (let i = 0; i < tokens.length; i++) {
        const result = await ipfs.add(tokens[i]["jpgBuffer"]["data"])
        const url = "https://gateway.ipfs.io/ipfs/" + result.path
        tokensDB[i]["url"] = url
        tokenMetadatas.push({
            name: tokensDB[i].tokenName,
            description: tokensDB[i].tokenDescription,
            image: url
        })
        tokenSupplies.push(tokensDB[i].initialSupply)
    };
    collection.set("Tokens", tokensDB);
    await collection.save();

    // UPLOAD NFT METADATA TO IPFS
    const ipfsURLs = []
    const tokenIds = []
    const tokenNames = []
    var counter = 1
    for (const metaData of tokenMetadatas) {
        const result = await ipfs.add(JSON.stringify(metaData))
        ipfsURLs.push(`https://gateway.ipfs.io/ipfs/${result.path}`)
        tokenNames.push(metaData.name)
        tokenIds.push(counter)
        counter++
    }
    console.log("Uploaded metada", ipfsURLs)

    // RETURN
    const Communities = Moralis.Object.extend("Communities");
    const query2 = new Moralis.Query(Communities);
    query2.equalTo("objectId", body.communityId);
    const community = await query2.first({ useMasterKey: true })
    const addr = await community.get("ContractAddress")

    res.status(200).json({
        tokenURIs: ipfsURLs,
        tokenNames: tokenNames,
        tokenIds: tokenIds,
        tokenSupplies: tokenSupplies,
        contractName: body.collectionName,
        contractAddress: addr
    });
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};