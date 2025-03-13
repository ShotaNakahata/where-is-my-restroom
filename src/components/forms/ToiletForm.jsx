"use client";
import React, { useState } from 'react'
// import { useDispatch } from "react-redux";
// import { login } from "@/redux/slices/authSlice";
import styles from "@/components/forms/LoginForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { validationRules } from "@/utils/validationRules";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import StarRating from './rating/StarRating';

const modalConfig = {
  success: {
    message: "Toilet Added Successfully!",
    description: "Thank you for contributing to our community!",
    btnMessage: "Close",
  },
  error: {
    message: "Failed to Register",
    description: "Something went wrong. Please try again later.",
    btnMessage: "Close",
  },
};

function ToiletForm({ setIsSingUp }) {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setValue } = useForm({ mode: 'onBlur' })
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/toilets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          rating: data.rating,
          comments: data.comments,
          isUniversal: data.isUniversal === "true",
          image: data.image,
        })
      });
      const result = await response.json();
      if (response.ok) {
        setModalData(modalConfig.success);
        reset();
      } else {
        setModalData({ ...modalConfig.error, description: result.error || "Failed to add toilet." });
      }
    } catch (error) {
      setModalData({ ...modalConfig.error, description: "Something went wrong. Please try again." });
    }
    setisModalOpen(true);
  };

  return (
    <div className={formStyles.formContainer}>
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setisModalOpen(false)} />}
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents} `}>
          <div className={`${styles.loginArea} grid `}>
            {/* Toilet Name: */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="name">Toilet Name</label>
              <input className={formStyles.input} {...register("name", validationRules.name)} type="text" placeholder='Taipei Main Station Toilet' />
              {errors.name ? <span className={formStyles.error}>{errors.name.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
            </div>
            {/* Address: */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="address">Address</label>
              <input className={formStyles.input} {...register("address", validationRules.requiredField)} type="address" placeholder='Address' />
              {errors.address ? <span className={formStyles.error}>{errors.address.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
            </div>
            {/* Rating: */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="rating">Rating</label>
              <StarRating value={watch("rating") || 0} onChange={(rating) => setValue("rating", rating)} />
              {errors.rating && <span className="error">{errors.rating.message}</span>}
            </div>
            {/* Comment */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="comment">Comment</label>
              <textarea className={formStyles.input} {...register("comment", validationRules.requiredField)} placeholder="Enter your comment here..." />
              {errors.name ? <span className={formStyles.error}>{errors.name.message}</span> : <span className={formStyles.errorsDefo}>-</span>}
            </div>
            {/* Universal Toilet */}
            <div className={formStyles.formContent}>
              <label className={formStyles.label} htmlFor="isUniversal">Is it a universal toilet?</label>
              <select {...register("isUniversal")} className={formStyles.input}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            {/* Submit BUTTON */}
            <button type='submit' className={`btnLg ${formStyles.formBtn}`}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToiletForm