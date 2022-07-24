import styles from "../../../styles/Home.module.css";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

export default function MyCommunities(props) {
  let communities = props.communities;
  return (
    <div className="bg-[#22014d]">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:text-[6vh] text-[4vh] mt-12 mb-12 text-white">
            My Communities
          </div>
          <div className=" xl:grid xl:grid-cols-3 md:grid md:grid-cols-2 gap-12 flex justify-center flex-wrap">
            {communities.map((community, index) => (
              <div
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
                  <button className="mt-4 md:px-16 px-4 font-bold py-4 bg-[#23024d] mb-2  rounded-full hover:bg-gray-500 block cursor-pointer text-center text-white">
                    View Community
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
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
        imagePath: community.get("imagePath"),
      })),
    },
  };
}
