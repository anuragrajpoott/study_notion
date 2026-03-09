import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <div className="flex flex-col items-center gap-20 lg:flex-row">
      <div className="lg:w-[50%]">
        <img
          src={Instructor}
          alt="Instructor"
          className="shadow-[-20px_-20px_0_0] shadow-white"
        />
      </div>

      <div className="flex flex-col gap-10 lg:w-[50%]">
        <h1 className="text-4xl font-semibold lg:w-[50%]">
          Become an <HighlightText text="instructor" />
        </h1>

        <p className="w-[90%] text-justify text-[16px] font-medium text-richblack-300">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <div className="w-fit">
          <CTAButton active linkto="/signup">
            <div className="flex items-center gap-3">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;