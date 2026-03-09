import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentRef = useRef(null);

  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive, course._id]);

  useEffect(() => {
    setSectionHeight(active ? contentRef.current?.scrollHeight : 0);
  }, [active]);

  const lectureCount = course?.subSection?.length || 0;

  return (
    <div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div
        className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-all duration-300"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-2">
          <span
            className={`transition-transform ${
              active ? "rotate-180" : "rotate-0"
            }`}
          >
            <AiOutlineDown />
          </span>

          <p>{course?.sectionName}</p>
        </div>

        <span className="space-x-4 text-yellow-25">
          {lectureCount} lecture(s)
        </span>
      </div>

      <div
        ref={contentRef}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold text-textHead">
          {course?.subSection?.map((subSection) => (
            <CourseSubSectionAccordion
              key={subSection._id}
              subSec={subSection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}