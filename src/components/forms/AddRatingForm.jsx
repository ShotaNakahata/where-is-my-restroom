// "use client";
// import React, { useState } from "react";
// import { useParams } from "next/navigation";
// import styles from "@/components/forms/AddRatingForm.module.css";
// import formStyles from "@/components/forms/formStyles.module.css";
// import { useForm } from "react-hook-form";
// import StarRating from "@/components/forms/rating/StarRating";
// import Modal from "@/components/common/Modal";

// const modalConfig = {
//   success: {
//     message: "Rating Added Successfully!",
//     description: "Your rating and comment have been successfully submitted. Thank you for your feedback!",
//     btnMessage: "Close",
//   },
//   error: {
//     message: "Failed to Add Rating",
//     description: "Something went wrong. Please try again later.",
//     btnMessage: "Close",
//   },
// };

// function AddRatingForm() {
//   const { id } = useParams();
//   const toiletId = id;

//   const { register, handleSubmit, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   // ✅ `StarRating` の値を `useForm` にセット
//   const handleRatingChange = (newRating) => {
//     setValue("rating", newRating);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch(`/api/toilets/${toiletId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           rating: Number(data.rating),
//           comment: data.comment.trim(),
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setModalData(modalConfig.success);
//         reset();
//       } else {
//         setModalData({ ...modalConfig.error, description: result.error || "Failed to add rating." });
//       }
//     } catch (error) {
//       setModalData({ ...modalConfig.error, description: "Something went wrong. Please try again." });
//     }

//     setIsModalOpen(true);
//   };

//   return (
//     <div className={`${formStyles.formContainer}`}>
//       {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
//       <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
//         <div className={`${formStyles.formContents}`}>
//           <h2 className={`h2 ${formStyles.formH2} ${styles.title}`}>Add Rating</h2>
//           <div className={`${styles.inputArea} grid`}>
//             {/* Rating */}
//             <div className={formStyles.formContent}>
//               <label className={styles.label} htmlFor="rating">Rating</label>
//               <StarRating value={watch("rating") || 0} onChange={handleRatingChange} />
//               {errors.rating && <span className={formStyles.error}>{errors.rating.message}</span>}
//             </div>

//             {/* Comment */}
//             <div className={formStyles.formContent}>
//               <label className={styles.label} htmlFor="comment">Comment</label>
//               <textarea
//                 className={formStyles.input}
//                 {...register("comment", { required: "Comment is required" })}
//                 placeholder="Enter your comment here..."
//               />
//               {errors.comment && <span className={formStyles.error}>{errors.comment.message}</span>}
//             </div>

//             {/* Submit BUTTON */}
//             <button type="submit" className={`btnLg ${formStyles.formBtn}`} disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddRatingForm;

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/components/forms/AddRatingForm.module.css";
import formStyles from "@/components/forms/formStyles.module.css";
import { useForm } from "react-hook-form";
import StarRating from "@/components/forms/rating/StarRating";
import Modal from "@/components/common/Modal";

function AddRatingForm({ onRatingAdded }) {
  const { id } = useParams();
  const toiletId = id;

  const { register, handleSubmit, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleRatingChange = (newRating) => {
    setValue("rating", newRating);
  };

  const onSubmit = async (data) => {
    const newRating = Number(data.rating);
    const newComment = data.comment.trim();

    try {
      const response = await fetch(`/api/toilets/${toiletId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: newRating,
          comment: newComment,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setModalData({
          message: "Rating Added Successfully!",
          description: "Your rating and comment have been successfully submitted.",
          btnMessage: "Close",
        });
        reset();
        onRatingAdded(newRating, newComment); // ✅ `fetch` せずに `UI に即時反映`
      } else {
        setModalData({
          message: "Failed to Add Rating",
          description: result.error || "Something went wrong.",
          btnMessage: "Close",
        });
      }
    } catch (error) {
      setModalData({
        message: "Failed to Add Rating",
        description: "Something went wrong. Please try again.",
        btnMessage: "Close",
      });
    }

    setIsModalOpen(true);
  };

  return (
    <div className={`${formStyles.formContainer}`}>
      {isModalOpen && modalData && <Modal {...modalData} onClose={() => setIsModalOpen(false)} />}
      <form className={`${formStyles.form} box`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${formStyles.formContents}`}>
          <h2 className={`h2 ${formStyles.formH2} ${styles.title}`}>Add Rating</h2>
          <div className={`${styles.inputArea} grid`}>
            <div className={formStyles.formContent}>
              <label className={styles.label} htmlFor="rating">Rating</label>
              <StarRating value={watch("rating") || 0} onChange={handleRatingChange} />
            </div>
            <div className={formStyles.formContent}>
              <label className={styles.label} htmlFor="comment">Comment</label>
              <textarea
                className={formStyles.input}
                {...register("comment", { required: "Comment is required" })}
                placeholder="Enter your comment here..."
              />
            </div>
            <button type="submit" className={`btnLg ${formStyles.formBtn}`} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRatingForm;
