export default function MyCommunities() {
  return <h1>hello</h1>;
}

export async function getServerSideProps(context) {
  const Moralis = require("moralis/node");
  // MORALIS INIT CODE
  const serverUrl = process.env.SERVER_URL;
  const appId = process.env.APP_ID;
  const masterKey = process.env.MASTER_KEY;
  await Moralis.start({ serverUrl, appId, masterKey });

  const { index } = context.query;
  const UserInfo = Moralis.Object.extend("UserInfo");
  const query = new Moralis.Query(UserInfo);
  query.equalTo("EthAddress", index);
  const user = await query.first({ useMasterKey: true });
  const myCommunities = user.get("MyCommunities");
  //   console.log(myCommunities);

  const Communities = Moralis.Object.extend("Communities");
  const query2 = new Moralis.Query(Communities);
  const results = await query2.find();
  const communities = [];

  for (let j = 0; j < myCommunities.length; j++) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].id.toString() == myCommunities[j]) {
        communities.push(results[i]);
      }
    }
  }

  return {
    props: {
      communities: communities.map((community) => ({
        id: community.id,
        name: community.get("Name"),
        description: community.get("Description"),
        image: community.get("imagePath"),
      })),
    },
  };
}
