const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// ✅ `住所` から `国` と `緯度経度` を取得する関数
export async function getLocationData(address) {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("🔴 [ERROR] Missing Google Maps API Key");
      return { country: "Other", latitude: 0, longitude: 0, error: "Missing API Key" };
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    console.log("🟢 [API REQUEST] Google Maps API URL:", url); // ✅ API URL を確認
    const res = await fetch(url);
    const data = await res.json();
    console.log("🟢 [API RESPONSE] Google Maps API response:", JSON.stringify(data, null, 2));

    if (data.status !== "OK") {
      console.error(`🔴 [ERROR] Google Maps API error: ${data.status}`);
      return { country: "Other", latitude: 0, longitude: 0, error: `Google Maps API error: ${data.status}` };
    }

    const location = data.results[0]?.geometry?.location;
    const countryComponent = data.results[0]?.address_components?.find(comp => comp.types.includes("country"));

    return {
      country: countryComponent ? countryComponent.long_name : "Other",
      latitude: location ? location.lat : 0,
      longitude: location ? location.lng : 0,
    };
  } catch (error) {
    console.error("🔴 [ERROR] Failed to fetch location data:", error);
  }
  return { country: "Other", latitude: 0, longitude: 0 };
}
