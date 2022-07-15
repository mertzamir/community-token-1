import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Web3Context } from "../utils/web3context";

export default function Nav() {
  const { isAuthenticated, logoutWallet } = useContext(Web3Context);

  return (
    <nav className="px-8 sticky top-0 py-4 ">
      <div className="md:flex justify-between items-center h-16 hidden">
        <Link href="/">
          <a className="">
            <Image
              src="/community-token-logo.png"
              alt="Community Token"
              width={350}
              height={60}
            />
          </a>
        </Link>
        {!isAuthenticated ? (
          <Link href="/launch">
            <a className="md:flex relative text-center hidden">
              <Image
                src="/button.png"
                alt="Launch App Button"
                width={190}
                height={60}
              />
              <div className="absolute inset-x-0.5 top-4 text-[#23024d] font-bold text-lg ">
                Launch App
              </div>
            </a>
          </Link>
        ) : (
          <button onClick={logoutWallet} className="md:flex relative text-center hidden">
            <Image
              src="/button.png"
              alt="Launch App Button"
              width={190}
              height={60}
            />
            <div className="absolute inset-x-0.5 top-4 text-[#23024d] font-bold text-lg ">
              Log out
            </div>
          </button>
        )}
      </div>
      {/* Mobile menu */}
      <div className="flex justify-between items-center h-16 md:hidden">
        <Link href="/">
          <a className="order-first">
            <Image
              src="/community-token-logo.png"
              alt="Community Token"
              width={180}
              height={20}
            />
          </a>
        </Link>
        <Link href="/launch">
          <a className="flex order-last relative text-center text-black">
            <Image
              src="/button.png"
              alt="Launch App Button"
              width={140}
              height={40}
            />
            <div className="absolute inset-x-0.5 top-2 text-[#23024d] font-bold text-sm">
              Launch App
            </div>
          </a>
        </Link>
      </div>
    </nav>
  );
}
