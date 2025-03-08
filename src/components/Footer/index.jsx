import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} All rights served.</p>
    </footer>
  );
};

export default Footer;
