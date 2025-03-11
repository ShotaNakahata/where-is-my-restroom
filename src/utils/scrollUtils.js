export const scrollToRef = (ref) => {
  if (!ref?.current) {
    console.warn("scrollToRef: ref.current is null - Ensure the ref is properly assigned.");
    return;
  }
  
  console.log("Scrolling to ref:", ref.current);
  ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
};
