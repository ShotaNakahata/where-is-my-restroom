import Link from "next/link";
import { fetchToilets } from "@/lib/fetchToilets";
import ToiletDetailClient from "@/components/toilet/ToiletDetailClient";
import styles from "./ToiletDetail.module.css";

async function ToiletDetail(props) {
  const { id } = props.params; 
  const toilet = await fetchToilets(id);
  if (!toilet) return notFound();

  return (
    <main className={`page`}>
      <h2 className={`h2 ${styles.pageTitle}`}>Toilet Detail</h2>
      <div className={styles.btnBox}>
        <Link href={`/toilet/list`} className={`${styles.link} ${styles.btn}`}>Back to List Page</Link>
      </div>
      {/* ✅ `toilet` を `Client Component` に渡す */}
      <ToiletDetailClient initialToilet={toilet} />
    </main>
  );
}

export default ToiletDetail;
