import RenderSteps from "./RenderSteps"


export default function AddCourse() {
  return (
    <div className="flex w-full items-start gap-8">
      
      {/* Left Section */}
      <div className="flex flex-1 flex-col">
        <h1 className="mb-12 text-3xl font-semibold text-richblack-5">
          Add Course
        </h1>

        <RenderSteps />
      </div>

      {/* Right Section */}
      <CourseUploadTips />
      
    </div>
  )
}



 function CourseUploadTips() {
  const tips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make announcements to notify any important updates.",
    "Send notes to all enrolled students at once.",
  ]

  return (
    <div className="sticky top-10 hidden xl:block max-w-[380px] rounded-lg border border-richblack-700 bg-richblack-800 p-6">
      
      <h2 className="mb-6 text-lg font-semibold text-richblack-5">
        ⚡ Course Upload Tips
      </h2>

      <ul className="ml-5 list-disc space-y-3 text-sm text-richblack-300">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>

    </div>
  )
}