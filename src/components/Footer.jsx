import React from 'react'
import styles from "@/components/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={`${styles.logo}`}>
          <Image src="/logo-sample.jpeg" alt='Logo img' width={90} height={68}/>
        </div>
        <div className={styles.account}>
          <p className={styles.footerHeading}>Account</p>
          <ul className={styles.footerNav}>
            <li>
              <Link className={styles.footerLink} href="#">Login</Link>
            </li>
            <li>
              <Link className={styles.footerLink} href="#">Singup</Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </footer>
  )
}

export default Footer