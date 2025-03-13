import multer from "multer";
import path from "path";

// ✅ アップロード先ディレクトリを `public/uploads/` に設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // ✅ アップロード先のパス
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ✅ ユニークなファイル名を作成
  },
});

// ✅ `multer` の設定（ファイルサイズの制限など）
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 最大5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images (JPEG, PNG, GIF) are allowed!"));
    }
  },
});

export default upload;
