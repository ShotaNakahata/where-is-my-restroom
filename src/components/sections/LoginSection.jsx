"use client"
import React, { useState } from 'react'
import LoginForm from "@/components/forms/LoginForm";
import styles from "@/components/sections/LoginSection.module.css";
import SignupForm from "@/components/forms/SignupForm";
import { useRefContext } from "@/context/RefContext";

function LoginSection() {
  const [isSingUp, setIsSingUp] = useState(null);
  const { loginRef } = useRefContext()

  return (
    <section ref={loginRef} id='login' className={`container `}>
      <div className={`${styles.loginSection} sectionP`}>
        <div className={styles.LoginForm}>
          {isSingUp ? <SignupForm setIsSingUp={setIsSingUp} /> : <LoginForm setIsSingUp={setIsSingUp} />}
        </div>
        <div className={styles.textBox}>
          <div className={styles.headTextBox}>
            <h2 className={styles.h2}>What You Can Do After Logging In </h2>
            <p className={styles.subheading}>Unlock more features with your account!</p>
          </div>
          <ul className={styles.loginFeatures}>
            <li className={styles.loginFeature}>
              <p className={styles.fetureText}>1,Save your favorite restrooms</p>
              <blockquote className={styles.blockquote}> Add your favorite restrooms to your favorites list for quick and easy access.</blockquote>
            </li>
            <li className={styles.loginFeature}>
              <p className={styles.fetureText}>2,Manage your saved restrooms in My Page</p>
              <blockquote className={styles.blockquote}> Manage your saved restrooms in My Page</blockquote>
            </li>
            <li className={styles.loginFeature}>
              <p className={styles.fetureText}>3,Rate and review restrooms</p>
              <blockquote className={styles.blockquote}> Share your experiences by adding star ratings and comments to restroom listings.</blockquote>
            </li>
            <li className={styles.loginFeature}>
              <p className={styles.fetureText}>4,Post new restrooms you discover</p>
              <blockquote className={styles.blockquote}> Contribute to the community by adding new restrooms you've found!</blockquote>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default LoginSection


// "use client";
// import React, { useEffect, useRef, useState, forwardRef } from 'react';
// import LoginForm from "@/components/forms/LoginForm";
// import styles from "@/app/sections/LoginSection.module.css";
// import SignupForm from "@/components/forms/SignupForm";

// const LoginSection = forwardRef((props, ref) => { 
//   const [isSingUp, setIsSingUp] = useState(false);

//   return (
//     <section ref={loginRef} id='login' className={`container `}>
//       <div className={`${styles.loginSection} sectionP`}>
//         <div className={styles.LoginForm}>
//           {isSingUp ? <SignupForm setIsSingUp={setIsSingUp} /> : <LoginForm setIsSingUp={setIsSingUp} />}
//         </div>
//         <div className={styles.textBox}>
//           <div className={styles.headTextBox}>
//             <h2 className={styles.h2}>What You Can Do After Logging In </h2>
//             <p className={styles.subheading}>Unlock more features with your account!</p>
//           </div>
//           <ul className={styles.loginFeatures}>
//             <li className={styles.loginFeature}>
//               <p className={styles.fetureText}>1,Save your favorite restrooms</p>
//               <blockquote className={styles.blockquote}> Add your favorite restrooms to your favorites list for quick and easy access.</blockquote>
//             </li>
//             <li className={styles.loginFeature}>
//               <p className={styles.fetureText}>2,Manage your saved restrooms in My Page</p>
//               <blockquote className={styles.blockquote}> Manage your saved restrooms in My Page</blockquote>
//             </li>
//             <li className={styles.loginFeature}>
//               <p className={styles.fetureText}>3,Rate and review restrooms</p>
//               <blockquote className={styles.blockquote}> Share your experiences by adding star ratings and comments to restroom listings.</blockquote>
//             </li>
//             <li className={styles.loginFeature}>
//               <p className={styles.fetureText}>4,Post new restrooms you discover</p>
//               <blockquote className={styles.blockquote}> Contribute to the community by adding new restrooms you've found!</blockquote>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// });

// export default LoginSection;

