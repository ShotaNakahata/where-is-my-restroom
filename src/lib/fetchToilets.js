export async function fetchToilets(id = null) {
  console.log("🔍 fetchToilets called with id:", id); // ✅ `id` の値を確認

  const url = id
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/toilets/${id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/toilets`;

  console.log("Fetching toilets from API:", url); // ✅ `fetch` の URL を確認

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("❌ Failed to fetch toilets:", res.status);
    throw new Error("Failed to fetch toilets");
  }

  const data = await res.json();
  console.log("Fetched Toilets Data:", data); // ✅ `fetch` したデータをログ出力
  return data;
}
