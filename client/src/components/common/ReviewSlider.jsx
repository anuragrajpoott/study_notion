import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  /* ---------- FETCH REVIEWS ---------- */
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
    };

    fetchReviews();
  }, []);

  const truncateText = (text = "") => {
    const words = text.split(" ");
    if (words.length <= truncateWords) return text;

    return `${words.slice(0, truncateWords).join(" ")} ...`;
  };

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop
          freeMode
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review) => {
            const user = review?.user;
            const course = review?.course;

            const userImage =
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`;

            return (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  
                  {/* USER */}
                  <div className="flex items-center gap-4">
                    <img
                      src={userImage}
                      alt="User"
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {user?.firstName} {user?.lastName}
                      </h1>

                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* REVIEW */}
                  <p className="font-medium text-richblack-25">
                    {truncateText(review?.review)}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>

                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
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