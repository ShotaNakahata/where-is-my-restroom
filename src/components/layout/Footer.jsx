"use client"
import React from 'react'
import styles from "@/components/layout/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { scrollToRef } from "@/utils/scrollUtils";
import { useRefContext } from '@/providers/RefContext';

function Footer() {
  const { loginRef } = useRefContext()
  return (
    <footer className={styles.footer}>
      <div className={`container grid grid3cols ${styles.gridgap}`}>
        {/* LOGO */}
        <div className={`${styles.logo}`}>
          <Image src="/logo.webp" alt='Logo img' width={90} height={68} />
        </div>
        {/* ACCOUNT */}
        <div className={styles.account}>
          <p className={styles.footerHeading}>Account</p>
          <ul className={styles.footerNav}>
            <li>
              <a onClick={() => scrollToRef(loginRef)} className={styles.footerLink}>Login</a>
            </li>
            <li>
              <a onClick={() => scrollToRef(loginRef)} className={styles.footerLink}>Singup</a>
            </li>
          </ul>
        </div>
        {/* CONTACT */}
        <div className={styles.contact}>
          <p className={styles.footerHeading}>Contact us</p>
          <div className={styles.contactContents}>
            <Link className={styles.footerLink} href="/contact">to contact page</Link>{/* Contct us page 完成したらhref変更 */}
            <a className={styles.footerLink} href="mailto:whereismyrestroom@gmail.com">whereismyrestroom@gmail.com</a>{/* Adressを決めたらhref変更 */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer