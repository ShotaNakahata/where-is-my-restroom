import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { scrollToRef } from "@/utils/scrollUtils";
import { useRefContext } from '@/context/RefContext';
import { useSelector,useDispatch} from "react-redux";
import { logout } from "@/redux/slices/authSlice";

function Hero() {
  const { loginRef } = useRefContext()
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth)
  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("user");
  }
  return (
    <section className={styles.heroSection}>
      <div className={`${styles.hero} grid`}>
        <div className={styles.heroTextBox}>
          <h1 className={`h1 ${styles.heroH1}`}>
            Enjoy a hassle-free toilet experience wherever you go!
          </h1>
          <p className={styles.heroDescription}>
            This website helps you quickly find nearby restrooms and key details. Accessible options make it convenient for those needing special facilities.
          </p>
          <div className={`${styles.btnBox}  grid3cols`}>
            <button className={`btnLg`}>Map</button>
            <Link href="/toilet/list" className={`btnLg`} role="button">List</Link>
            <Link href="/toilet/add" className={`btnLg`} role="button">Post</Link>
            {!isAuthenticated ?
              <button onClick={() => scrollToRef(loginRef)} className={`btnLg`}>Login</button>
              : <button onClick={handleLogout} className={`btnLg`}>Logout</button>}
          </div>
        </div>
        <div className={styles.heroImgBox}>
          <Image src="/hero.png" className={styles.heroImg} alt='hero img' width="290" height="286" />
        </div>
      </div>
    </section>
  )
}

export default Hero