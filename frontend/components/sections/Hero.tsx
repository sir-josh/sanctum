import astronaut from "../../public/img/astro.svg";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import { poppins } from "../../fonts/index";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.hero}>
        <div className={styles.upper}>
          <h1 className={styles.intro} style={poppins.style}>
            Donate for tomorrow's future
          </h1>
          <p className={styles.subtext}>
            Sanctum brings onchain verifiable NGOs on one platform.
          </p>
          <p>
            Donate from any chain, we will ensure your donation is received
            succesfully. Trustless charity!
          </p>
          <button className="action">
            <span>Connect Wallet</span>
          </button>
        </div>

        <div className={styles.lower}>
          <div className={styles.astro}>
            <Image
              src={astronaut}
              alt="A young astronaut"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
