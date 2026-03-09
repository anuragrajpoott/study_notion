import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-2">
        <HiOutlineVideoCamera />
        <p>{subSec?.title}</p>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;