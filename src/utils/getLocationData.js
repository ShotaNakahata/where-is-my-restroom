const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// ✅ `住所` から `国` と `緯度経度` を取得する関数
export async function getLocationData(address) {
  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await res.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const countryComponent = data.results[0].address_components.find(comp => comp.types.includes("country"));
      return {
        country: countryComponent ? countryComponent.long_name : "Other",
        latitude: location.lat,
        longitude: location.lng,
      };
    }
  } catch (error) {
    console.error("🔴 [ERROR] Failed to fetch location data:", error);
  }
  return { country: "Other", latitude: 0, longitude: 0 };
}
