import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Account() {
  const communityOwnerContentList = [
    {
      id: "rewards",
      title: "View My Rewards",
      link: "/community/rewards",
    },
    {
      id: "mycommunity",
      title: "View My Community",
      link: "/community",
    },
    {
      id: "joinedcommunities",
      title: "View Joined Communites",
      link: "/community/joined",
    },
  ];

  const communityMemberContentList = [
    {
      id: "createnewcommunity",
      title: "Create New Community",
      link: "/community/createnew",
    },
    {
      id: "rewards",
      title: "View My Rewards",
      link: "/community/rewards",
    },
    {
      id: "joinedcommunities",
      title: "View Joined Communites",
      link: "/community/joined",
    },
  ];

  const contentStyle =
    "text-center bg-[#e6d1ff] text-[#FDFEFF] mt-24 rounded-2xl opacity-75 md:w-96 md:h-72 w-64 h-72 md:text-4xl text-3xl";
  const buttonImg = "/plus-button.png";
  const buttonStyle = "mt-12 flex justify-center";

  return (
    <div className="bg-community-background bg-cover">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:text-[6vh] text-[4vh] mt-12 text-white">
            My Community
          </div>
          <div className="xl:grid xl:grid-cols-3 gap-12 flex justify-center flex-wrap">
            {/** Owner Content */}

            {communityOwnerContentList.map((content) => (
              <Link key={content.id} href={content.link}>
                <button className={contentStyle} key={content.id}>
                  {content.title}
                  <div className={buttonStyle} key={content.id}>
                    <Image
                      key={content.id}
                      src={buttonImg}
                      alt="Button"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              </Link>
            ))}

            {/** Member Content */}
            {communityMemberContentList.map((content) => (
              <Link key={content.id} href={content.link}>
                <button className={contentStyle} key={content.id}>
                  {content.title}
                  <div className={buttonStyle} key={content.id}>
                    <Image
                      key={content.id}
                      src={buttonImg}
                      alt="Button"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
