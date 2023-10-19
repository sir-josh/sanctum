import styles from "../../styles/Home.module.scss";
import rotaShow from "../../public/img/rota-show.webp";
import waves from "../../public/img/waves.webp";
import velocity from "../../public/img/velocity.webp";
import goldLines from "../../public/img/goldLines.webp";
import travellers from "../../public/img/travellers.webp";
import Image from "next/image";

const Sponsors = () => {
  return (
    <section className={styles.sponsorSection}>
      <div className={styles.sponsorWrapper}>
        <div className={styles.logo}>
          <Image src={rotaShow} alt="Rota Show logo" />
        </div>
        <div className={styles.logo}>
          <Image src={waves} alt="Waves logo" />
        </div>
        <div className={styles.logo}>
          <Image src={velocity} alt="Velocity logo" />
        </div>
        <div className={styles.logo}>
          <Image src={goldLines} alt="Gold  Lines logo" />
        </div>

        <div className={styles.logo}>
          <Image src={travellers} alt="Gold  Lines logo" />
        </div>
      </div>
    </section>
  );
};
export default Sponsors;
