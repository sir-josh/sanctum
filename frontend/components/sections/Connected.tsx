import Image from "next/image";
import call from "../../public/img/call.svg";
import { poppins } from "../../fonts";
import Envelope from "../icons/Envelope";
import styles from "../../styles/Footer.module.scss";

const Connected = () => {
  return (
    <div>
      <div className={styles.footerWrapper}>
        <div className={styles.call}>
          <Image src={call} alt="call us today" />
        </div>

        <div className={styles.action}>
          <h3 className={styles.title} style={poppins.style}>
            More connected than ever through charity.
          </h3>

          <button className="action">
            <span>Connect wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Connected;
