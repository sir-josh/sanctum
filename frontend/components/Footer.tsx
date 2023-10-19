import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.copy}>
        <span>&copy; EthOnline - Sanctum 2023.</span>
      </div>
    </footer>
  );
};

export default Footer;
