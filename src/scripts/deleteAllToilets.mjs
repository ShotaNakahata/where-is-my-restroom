async function deleteAllToilets() {
  try {
    console.log("🟢 Sending DELETE request to /api/toilets/delete...");

    const res = await fetch("/api/toilets/delete", { method: "DELETE" });

    const data = await res.json();
    console.log(data.message || "No response message");

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete toilets");
    }

    alert("✅ All toilets deleted successfully!");
  } catch (error) {
    console.error("🔴 [ERROR] Deleting toilets failed:", error);
    alert("❌ Error deleting toilets. Check console for details.");
  }
}

// スクリプト実行
deleteAllToilets();

