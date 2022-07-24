import { create } from "ipfs-http-client";

export default async function handler(req, res) {
  /* init */
  console.log(req.body);
  // const Moralis = require("moralis/node");
  // const serverUrl = process.env.SERVER_URL;
  // const appId = process.env.APP_ID;
  // const masterKey = process.env.MASTER_KEY;

  // const ipfs = create("https://ipfs.infura.io:5001");

  // const body = req.body;

  // /* upload community logo to ipfs */
  // const upload = await ipfs.add(body.bufferArray);
  // const logoURL = "https://gateway.ipfs.io/ipfs/" + upload.path;

  // /* store community data in moralis database */
  // await Moralis.start({ serverUrl, appId, masterKey });
  // const communityClass = Moralis.Object.extend("Communities");
  // const community = new communityClass();
  // community.set("Name", body.name);
  // community.set("Description", body.description);
  // community.set("LogoURL", logoURL);
  // community.set("OwnerAddress", body.ownerAddress);
  // community.set("CloneAddress", body.cloneAddress);
  // await community.save();

  /* send "community created" message to server via bot */
}
