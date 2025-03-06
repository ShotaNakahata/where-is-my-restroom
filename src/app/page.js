import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./sections/Hero.jsx";

export default function Home() {
  return (
    <main className={styles.page}>
      <Hero/>
    </main>
  );
}
