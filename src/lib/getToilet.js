export async function getToilets(id = null) {

  const url = id ? `${process.env.NEXT_PUBLIC_API_URL}/api/toilets/${id}` // 🔹 ID指定がある場合、該当トイレを取得
    : `${process.env.NEXT_PUBLIC_API_URL}/api/toilets`;

    console.log("form getToilets :",url)

  const res = await fetch(url, { cache: "no-store", });

  if (!res.ok) throw new Error("Failed to fetch toilets");
  return res.json();
}