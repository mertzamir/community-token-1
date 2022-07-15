import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-home-background bg-no-repeat bg-cover">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <Head>
          <title>Community Token</title>
          <meta name="description" content="Community Token" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="lg:mt-24">
            {/* Desktop  */}
            <div className="lg:flex justify-end mr-8 text-white text-lg hidden">
              New Featured Collection
            </div>
            <div className="lg:grid grid-cols-3 gap-2 xl:mt-8 items-center">
              <div className="col-span-2 text-white xl:text-[6vh] lg:text-[6.5vh] md:text-5xl lg:text-left  text-center text-[4vh] font-bold leading-none">
                Create, join, <br />
                and explore new
                <p className="text-[#cdadff]">communities.</p>
                <p className="mt-4 lg:text-[3vh] text-xl text-[2vh] lg:text-left text-center font-thin text-white md:mb-8">
                  For creators and by creators
                </p>
              </div>

              {/* Mobile  */}
              <div className="text-center text-white mt-12  text-lg md:hidden">
                New Featured Collection
              </div>
              <div className="flex justify-center mt-4 mb-4  lg:hidden">
                {/** Will replace with moralis web 3 ui kit */}{" "}
                <Image
                  className="rounded-3xl "
                  src="/sappy-seal.png"
                  alt="Sappy Seal NFT"
                  width={300}
                  height={300}
                />
              </div>
              <div className="text-center  text-white text-lg md:hidden">
                Sappy Seals
              </div>

              {/* Desktop */}

              <div className="lg:flex rounded-3xl hidden lg:ml-18">
                <Image
                  className="rounded-3xl"
                  src="/sappy-seal.png"
                  alt="Sappy Seal NFT"
                  width={300}
                  height={300}
                />
              </div>
              <Link href="/explore">
                <a className="md:flex justify-center ml-8 mt-4 relative text-center text-black hidden ">
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

              {/* Mobile */}

              <div className="flex justify-center mt-12">
                <Link href="/explore">
                  <a className=" relative text-center text-black md:hidden">
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
              </div>
              <div className="md:flex justify-end mr-24 text-white text-lg hidden">
                Sappy Seals
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
