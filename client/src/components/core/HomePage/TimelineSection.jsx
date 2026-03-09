import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="mb-20 flex flex-col items-center gap-20 lg:flex-row">
        {/* Timeline Items */}
        <div className="flex flex-col gap-14 lg:w-[45%] lg:gap-3">
          {timeline.map((item, index) => {
            const isLast = index === timeline.length - 1;

            return (
              <div key={item.heading} className="flex flex-col lg:gap-3">
                <div className="flex gap-6">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_0_62px_0] shadow-[#00000012]">
                    <img src={item.logo} alt={item.heading} />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold">
                      {item.heading}
                    </h2>
                    <p className="text-base">{item.description}</p>
                  </div>
                </div>

                {!isLast && (
                  <div className="hidden h-14 w-[26px] border-r border-dotted border-richblack-100 bg-richblack-400/0 lg:block"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Image + Stats */}
        <div className="relative h-fit w-fit shadow-[0px_0px_30px_0px] shadow-blue-200">
          <div className="absolute flex flex-col gap-4 bg-caribbeangreen-700 py-5 uppercase text-white lg:left-1/2 lg:bottom-0 lg:flex-row lg:translate-x-[-50%] lg:translate-y-[50%] lg:gap-0 lg:py-10">
            {/* Section 1 */}
            <div className="flex items-center gap-5 px-7 lg:border-r lg:border-caribbeangreen-300 lg:px-14">
              <h1 className="w-[75px] text-3xl font-bold">10</h1>
              <h1 className="w-[75px] text-sm text-caribbeangreen-300">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex items-center gap-5 px-7 lg:px-14">
              <h1 className="w-[75px] text-3xl font-bold">250</h1>
              <h1 className="w-[75px] text-sm text-caribbeangreen-300">
                types of courses
              </h1>
            </div>
          </div>

          <img
            src={TimeLineImage}
            alt="Timeline"
            className="h-[400px] object-cover shadow-[20px_20px_0px_0px] shadow-white lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;