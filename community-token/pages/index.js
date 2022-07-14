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
          <div className="md:mt-24">
            {/* Desktop  */}
            <div className="md:flex justify-end mr-8 text-white text-lg hidden">
              New Featured Collection
            </div>
            <div className="md:grid grid-cols-3 gap-2 mt-8  items-center">
              <div class="col-span-2 text-white md:text-[6vh] text-[4vh] font-bold leading-none">
                Create, join, <br />
                and explore new
                <p className="text-[#cdadff]">communities.</p>
                <p className="mt-4 md:text-[3vh] text-[2vh] font-thin text-white">
                  For creators and by creators
                </p>
              </div>

              {/* Mobile  */}
              <div className="flex justify-end mr-8 text-white mt-12 text-lg md:hidden">
              New Featured Collection
            </div>
              <div class="flex justify-center mt-4 mb-4 border-white border-8 border-solid rounded-3xl bg-white md:hidden">
                <Image
                  className="rounded-3xl "
                  src="/sappy-seal.png"
                  alt="Sappy Seal NFT"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex justify-end mr-24 text-white text-lg md:hidden">
                Sappy Seals
              </div>

              {/* Desktop */}

              <div class="md:flex border-white border-8 border-solid rounded-3xl bg-white hidden ml-12">
                <Image
                  className="flex justify-center "
                  className="rounded-3xl "
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

              <div className="flex justify-center mt-6">
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
