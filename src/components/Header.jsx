"use client"
import React, { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="#">
          <Image className={styles.logo} src="/logo-sample.jpeg" alt='Logo img' width={90} height={68} />
        </Link>
      </div>
      <div className={styles.menuIcon}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${styles.icon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />Ï
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${styles.icon}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          }
        </button>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul className={`${styles.navList} link`}>
          {/* stateとlogin機能を準備したらWelcome Guestを書き換える "Rewrite 'Welcome Guest' after preparing state and login functionality."*/}
          <li><Link href="/map" className={styles.navLink}>Welcome Guest</Link></li>{/* ！！！！！ */}
          <li><Link href="/map" className={styles.navLink}>Map</Link></li>
          <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
          <li><Link href="/mypage" className={styles.navLink}>MyPage</Link></li>
          <li><Link href="/login" className={styles.navLink}>Login</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

// 1. Logo
// 2. **Welcome Guest**（ログイン状況に応じて変化）
// 3. **Map**（`/map` へ移動）
// 4. **Contact**（`/contact` へ移動）
// 5. **MyPage**（`/mypage` へ移動）
// 6. **Login**（`/login` へ移動）

{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg> */}
