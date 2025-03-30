// app/toilet/detail/[id]/page.jsx

// app/toilet/detail/[id]/page.jsx

import { fetchToilets } from "@/lib/fetchToilets";
import ToiletDetailClient from "@/components/toilet/ToiletDetailClient";
import Link from "next/link";
import styles from "./ToiletDetail.module.css";

export default async function ToiletDetail({ params }) {
  const toilet = await fetchToilets({ id: params.id });

  if (!toilet) return notFound();

  return (
    <main className={`page`}>
      <h2 className={`h2 ${styles.pageTitle}`}>Toilet Detail</h2>
      <div className={styles.btnBox}>
        <Link href={`/toilet/list`} className={`${styles.link} ${styles.btn}`}>Back to List Page</Link>
      </div>
      <ToiletDetailClient initialToilet={toilet} />
    </main>
  );
}

