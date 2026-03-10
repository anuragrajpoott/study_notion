import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
      component: <CourseInformationForm />,
    },
    {
      id: 2,
      title: "Course Builder",
      component: <CourseBuilderForm />,
    },
    {
      id: 3,
      title: "Publish",
      component: <PublishCourse />,
    },
  ]

  const currentStepComponent = steps.find((item) => item.id === step)?.component

  return (
    <>
      {/* Stepper */}
      <div className="relative mb-12 flex w-full max-w-[700px] items-start justify-between mx-auto">

        {steps.map((item, index) => {
          const isActive = step === item.id
          const isCompleted = step > item.id
          const isLast = index === steps.length - 1

          return (
            <div key={item.id} className="flex flex-1 flex-col items-center relative">

              {/* Circle + Line Wrapper */}
              <div className="flex w-full items-center justify-center">

                {/* Circle */}
                <div
                  className={`grid h-[36px] w-[36px] place-items-center rounded-full border font-semibold transition-all duration-200
                  
                  ${
                    isCompleted
                      ? "bg-yellow-50 border-yellow-50 text-richblack-900"
                      : isActive
                      ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                      : "bg-richblack-800 border-richblack-700 text-richblack-300"
                  }`}
                >
                  {isCompleted ? (
                    <FaCheck className="text-sm font-bold" />
                  ) : (
                    item.id
                  )}
                </div>

                {/* Line */}
                {!isLast && (
                  <div
                    className={`absolute top-[18px] left-[60%] w-full border-b-2 border-dashed
                    ${
                      step > item.id
                        ? "border-yellow-50"
                        : "border-richblack-500"
                    }`}
                  />
                )}
              </div>

              {/* Title below circle */}
              <p
                className={`mt-3 text-sm text-center font-medium transition-all duration-200
                ${
                  step >= item.id
                    ? "text-richblack-5"
                    : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div>{currentStepComponent}</div>
    </>
  )
}