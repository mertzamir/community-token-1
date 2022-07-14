import styles from "../../styles/Home.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function Explore() {
  return (
    <div className="bg-[#22014d]">
      <div className="">
        <Nav />
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="md:text-[6vh] text-[4vh] mt-12 text-white">
            Explore Communities
          </div>
          
        </main>
        <Footer />
      </div>
    </div>
  );
}
