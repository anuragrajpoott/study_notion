import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

import KnowYourProgress from "../../../assets/Images/Know_your_progress.png";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="my-10 text-center text-4xl font-semibold">
        Your swiss knife for
        <HighlightText text="learning any language" />

        <div className="mx-auto mt-3 w-full text-center text-base font-medium leading-6 text-richblack-700 lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+
          languages realistic voice-over, progress tracking, custom schedule
          and more.
        </div>

        <div className="mt-8 flex flex-col items-center justify-center lg:mt-0 lg:flex-row">
          <img
            src={KnowYourProgress}
            alt="Know your progress"
            className="object-contain lg:-mr-32"
          />

          <img
            src={CompareWithOthers}
            alt="Compare with others"
            className="-mt-12 object-contain lg:-mb-10 lg:-mt-0"
          />

          <img
            src={PlanYourLessons}
            alt="Plan your lessons"
            className="-mt-16 object-contain lg:-ml-36 lg:-mt-5"
          />
        </div>
      </div>

      <div className="mx-auto -mt-5 mb-8 w-fit lg:mb-20">
        <CTAButton active linkto="/signup">
          <div>Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;