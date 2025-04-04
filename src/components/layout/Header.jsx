"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/layout/Header.module.css";
import { useRefContext } from '@/providers/RefContext';
import { scrollToRef } from "@/utils/scrollUtils";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { clearFavorites } from "@/redux/slices/favoriteSlice";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/common/LoginModal";
import { useDisableScroll } from "@/utils/useDisableScroll";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { loginRef } = useRefContext();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  useDisableScroll(isOpen);

  // ✅ メニューを閉じるための関数
  function handleCloseMenu() {
    setIsOpen(false);
  }

  function handleLoginClick() {
    handleCloseMenu(); // ✅ メニューを閉じる
    if (pathName === "/") {
      scrollToRef(loginRef);
    } else {
      setIsLoginModalOpen(true);
    }
  }

  function handleLogout() {
    handleCloseMenu(); // ✅ メニューを閉じる
    dispatch(logout());
    dispatch(clearFavorites());
    localStorage.removeItem("user");
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1000 && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      {isLoginModalOpen && (
        <LoginModal onCloseIsModal={() => setIsLoginModalOpen(false)} />
      )}
      <div className={styles.logoContainer}>
        <Link href={pathName === "/" ? "#" : "/"}>
          <Image
            className={styles.logo}
            src="/logo.webp"
            alt="Logo img"
            width={90}
            height={68}
            priority
          />
        </Link>
      </div>

      {/* ハンバーガーアイコン */}
      <div className={styles.menuIcon}>
        <button className={styles.hederBtn} onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.icon}
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul className={`${styles.navList} link`}>
          <li className={styles.Welcome}>
            <Link href="/#" className={`${styles.navLink} ${styles.Welcome}`} onClick={handleCloseMenu}>
              Welcome {!isAuthenticated ? "Guest" : user.name}
            </Link>
          </li>
          <li>
            <Link href="/" className={styles.navLink} onClick={handleCloseMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/map" className={styles.navLink} onClick={handleCloseMenu}>
              Map
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink} onClick={handleCloseMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/mypage" className={styles.navLink} onClick={handleCloseMenu}>
              MyPage
            </Link>
          </li>
          <li>
            {!isAuthenticated ? (
              <a
                onClick={handleLoginClick}
                className={`${styles.navLink} btnLg ${styles.login}`}
              >
                Login
              </a>
            ) : (
              <a
                onClick={handleLogout}
                className={`${styles.navLink} btnLg ${styles.login}`}
              >
                Logout
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
