import { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function RatingStars({ reviewCount = 0, starSize = 20 }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  });

  useEffect(() => {
    const fullStars = Math.floor(reviewCount);
    const hasHalfStar = !Number.isInteger(reviewCount);

    setStarCount({
      full: fullStars,
      half: hasHalfStar ? 1 : 0,
      empty: hasHalfStar ? 4 - fullStars : 5 - fullStars,
    });
  }, [reviewCount]);

  return (
    <div className="flex gap-1 text-yellow-100">
      {Array.from({ length: starCount.full }).map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={starSize} />
      ))}

      {Array.from({ length: starCount.half }).map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={starSize} />
      ))}

      {Array.from({ length: starCount.empty }).map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={starSize} />
      ))}
    </div>
  );
}

export default RatingStars;