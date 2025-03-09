import React from 'react'
import styles from "@/components/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container grid grid3cols ${styles.gridgap}`}>
        {/* LOGO */}
        <div className={`${styles.logo}`}>
          <Image src="/logo-sample.jpeg" alt='Logo img' width={90} height={68} />
        </div>
        {/* ACCOUNT */}
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
        {/* CONTACT */}
        <div className={styles.contact}>
          <p className={styles.footerHeading}>Contact us</p>
          <div className={styles.contactContents}>
              <Link className={styles.footerLink} href="#">to contact page</Link>{/* Contct us page 完成したらhref変更 */}
              <p className={styles.footerLink} href="example@gmail.com">example@gmail.com</p>{/* Adressを決めたらhref変更 */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer