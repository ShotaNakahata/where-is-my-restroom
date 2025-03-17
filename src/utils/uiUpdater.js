export function handleRatingUpdate(toilet, newRating, newComment, styles) {
  //新しいaverageRatingを計算
  document.getElementById("rating").textContent = (
    (toilet.ratings.reduce((sum, r) => sum + r, 0) + newRating) / (toilet.ratings.length + 1)
  ).toFixed(1);  
  //新しいcommentをelに追加
  const commentsBox = document.getElementById("commentsBox");
  if (commentsBox) {
    const newCommentElement = document.createElement("div");
    newCommentElement.className = styles.commentBox;
    newCommentElement.innerHTML = `<p class="${styles.comment}">${newComment}</p>`
    commentsBox.appendChild(newCommentElement)
  }
}