import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const truncateWords = 20;

  /* -------- FETCH REVIEWS -------- */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.GET_REVIEWS
        );

        if (data?.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }

      setLoading(false);
    };

    fetchReviews();
  }, []);

  /* -------- TRUNCATE TEXT -------- */
  const truncateText = (text = "") => {
    const words = text.split(" ");
    return words.length > truncateWords
      ? words.slice(0, truncateWords).join(" ") + " ..."
      : text;
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-white">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="w-full text-white py-10">
      <div className="w-full max-w-[1300px] mx-auto px-5">
        <Swiper
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {reviews.map((review) => {
            const user = review?.user;
            const course = review?.course;

            const userImage =
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                `${user?.firstName} ${user?.lastName}`
              )}`;

            return (
              <SwiperSlide key={review?._id}>
                <div className="flex flex-col gap-4 bg-richblack-800 p-4 rounded-lg text-[14px] min-h-[200px]">

                  {/* USER INFO */}
                  <div className="flex items-center gap-3">
                    <img
                      src={userImage}
                      alt="User"
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <h1 className="font-semibold text-richblack-5">
                        {user?.firstName} {user?.lastName}
                      </h1>

                      <p className="text-xs text-richblack-400">
                        {course?.courseName}
                      </p>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <p className="text-richblack-100 leading-relaxed">
                    {truncateText(review?.review)}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="font-semibold text-yellow-200">
                      {review?.rating?.toFixed(1) || "0.0"}
                    </span>

                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;