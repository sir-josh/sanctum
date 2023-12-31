import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.copy}>
        <span>&copy; Polygon X Sanctum 2023.</span>
      </div>
    </footer>
  );
};

export default Footer;
