import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

import CTAButton from "./Button";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  const lineNumbers = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div className={`my-20 flex ${position} flex-col justify-between gap-10 lg:gap-10`}>
      {/* Section 1 */}
      <div className="flex w-full flex-col gap-8 lg:w-[50%]">
        {heading}

        <div className="-mt-3 w-[85%] text-base font-bold text-richblack-300">
          {subheading}
        </div>

        <div className="mt-7 flex gap-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="code-border relative flex h-fit w-full flex-row py-3 text-[10px] leading-[18px] sm:text-sm sm:leading-6 lg:w-[470px]">
        {backgroundGradient}

        {/* Line Numbers */}
        <div className="flex w-[10%] select-none flex-col text-center font-inter font-bold text-richblack-400">
          {lineNumbers.map((num) => (
            <p key={num}>{num}</p>
          ))}
        </div>

        {/* Code */}
        <div
          className={`flex w-[90%] flex-col gap-2 pr-1 font-mono font-bold ${codeColor}`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;