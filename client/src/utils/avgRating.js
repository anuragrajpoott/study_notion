export default function getAvgRating(ratings = []) {
  if (!ratings.length) return 0;

  const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);

  const average = totalRating / ratings.length;

  return Math.round(average * 10) / 10; // round to 1 decimal place
}