import { useEffect } from "react";

export function useDisableScroll(isDisabled) {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = "hidden"; // ✅ スクロールを無効化
    } else {
      document.body.style.overflow = "auto"; // ✅ 元に戻す
    }

    return () => {
      document.body.style.overflow = "auto"; // ✅ クリーンアップ処理
    };
  }, [isDisabled]); // ✅ `isDisabled` が変わるたびに処理
}
