"use client"
import React, { useState } from 'react'
import styles from "@/components/forms/AddRatingForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { useForm } from 'react-hook-form';
import { validationRules } from "@/utils/validationRules";
import StarRating from "@/components/forms/rating/StarRating";
// import { useDispatch } from 'react-redux';

function AddRatingForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' })
  // const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(login(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));
        setModalData(modalConfig.success);
        reset();
      } else {
        setErrorMessage(result.error || "Login failed");
        modalConfig.error.description = result.error || "Login failed"
        setModalData(modalConfig.error);
      }
    } catch (error) {
      modalConfig.error.description = "Something went wrong. Please try again."
      setModalData(modalConfig.error);
    }
    setisModalOpen(true);
  };

  const handleIsSingUp = () => {
    setIsSingUp(true)
  }
  return (
    <div className={`${formStyles.formContainer}`}>
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setisModalOpen(false)} />}
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          <h2 className={`h2 ${formStyles.formH2} ${styles.title}`}>Add Rating</h2>
          <div className={`${styles.inputArea} grid `}>
            {/* Rsting */}
            <div className={formStyles.formContent}>
              <label className={styles.label} htmlFor="rating">Rating</label>
              <StarRating />
            </div>
            {/* Comment */}
            <div className={formStyles.formContent}>
              <label className={styles.label} htmlFor="comment">Comment</label>
              <textarea className={formStyles.input} {...register("comment")} placeholder="Enter your comment here..." />
              {errors.name ? <span className={formStyles.error}>{errors.name.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
            </div>
            {/* LOGIN BUTTON */}
            <button type='submit' className={`btnLg ${formStyles.formBtn}`}>
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRatingForm