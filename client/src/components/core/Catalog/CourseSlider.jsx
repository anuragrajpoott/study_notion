import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper";

import CourseCard from "./Course_Card";

const CourseSlider = ({ Courses }) => {
  if (!Courses?.length) {
    return <p className="text-xl text-richblack-5">No Course Found</p>;
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      loop
      modules={[FreeMode, Pagination]}
      breakpoints={{
        1024: {
          slidesPerView: 3,
        },
      }}
      className="max-h-[30rem]"
    >
      {Courses.map((course) => (
        <SwiperSlide key={course._id}>
          <CourseCard course={course} Height="h-[250px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;