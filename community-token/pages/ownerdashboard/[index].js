import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function OwnerDashboard() {
  const addOns = [
    {
      id: "createcollection",
      title: "Add Collection",
      route: "/owner-dashboard/create-collection/",
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
          <div className="md:text-[4vh] text-[4vh] mt-12 text-white">
            Welcome
          </div>
          <div className="xl:grid xl:grid-cols-3 gap-12 flex justify-center flex-wrap">
            {/** Community Owner Content */}

            {addOns.map((content) => (
              <button
                className={contentStyle}
                // onClick={addNewCollection(content.route)}
                key={content.id}
              >
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
            ))}
            {/* {collections.map((collection) => (
              <div
                className={contentStyle}
                key={collection.id}
              >
        
                
              </div>
            ))} */}
          </div>

          {/** Desktop */}
          <Link href="/explore">
            <a className="md:flex justify-center ml-8 mt-12 relative text-center text-black hidden ">
              <Image
                src="/button.png"
                alt="Explore Button"
                width={190}
                height={60}
              />
              <div className="absolute inset-x-0.5 top-4  text-[#23024d] font-bold text-lg ">
                Explore
              </div>
            </a>
          </Link>
          {/** Mobile */}
          <Link href="/explore">
            <a className=" relative text-center mt-12 text-black md:hidden">
              <Image
                src="/button.png"
                alt="Explore Button"
                width={140}
                height={40}
              />
              <div className="absolute inset-x-0.5 top-2 text-[#23024d] font-bold text-sm">
                Explore
              </div>
            </a>
          </Link>
        </main>
        <Footer />
      </div>
    </div>
  );
}
