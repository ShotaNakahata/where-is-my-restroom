export function isFavorite(favoriteToilets, toiletId) {
  if (!Array.isArray(favoriteToilets)) return false;
  return favoriteToilets.some((toilet) => toilet._id === toiletId);
}