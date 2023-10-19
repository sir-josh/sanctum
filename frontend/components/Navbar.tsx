import Link from "next/link";
import Logo from "./icons/Logo";
import styles from "../styles/Navbar.module.scss";
import Menu from "../components/icons/Menu";

const Navbar = () => {
  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Logo />

          <span>Sanctum</span>
        </Link>

        <div className="flex gap-x-4">
          <Link href={"/organization"}>For Organization</Link>
          <Link href={"/donor"}>For Donor</Link>
        </div>

        <div className={styles.menu}>
          <Menu />

          <div className={styles.links}>
            <div>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
