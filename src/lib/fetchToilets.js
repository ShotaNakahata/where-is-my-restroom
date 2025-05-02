//fetch用途 1,db全てを取得 2,個数を制限して取得 3該当dataを取得
export async function fetchToilets({
  id = null,
  limit = null,
  offset = null,
} = {}) {
  let url = "";
  if (id) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/api/toilets/${id}`;
  } else if (limit !== null && offset !== null) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/api/toilets?limit=${limit}&offset=${offset}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/api/toilets`;
  }

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("❌ Fetch failed:", res.status);
    throw new Error("Failed to fetch toilets");
  }

  const data = await res.json();
  return data;
}
