import { useEffect } from "react";

export function useDisableScroll(isDisabled) {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = "hidden"; // ✅ スクロールを無効化
      console.log("be disable to scrool");
    } else {
      document.body.style.overflow = "auto"; // ✅ 元に戻す
      console.log("be able to scrool");
    }

    return () => {
      document.body.style.overflow = "auto"; // ✅ クリーンアップ処理
      console.log(" ✅ クリーンアップ処理");
    };
  }, [isDisabled]); // ✅ `isDisabled` が変わるたびに処理
}
