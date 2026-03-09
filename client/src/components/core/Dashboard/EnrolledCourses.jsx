import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (!token) return
        const res = await getUserEnrolledCourses(token)
        setEnrolledCourses(res)
      } catch (error) {
        setEnrolledCourses([])
      }
    }

    fetchEnrolledCourses()
  }, [token])

  const getCourseNavigationPath = (course) => {
    const firstSection = course?.courseContent?.[0]
    const firstSubSection = firstSection?.subSection?.[0]

    return `/view-course/${course?._id}/section/${firstSection?._id}/sub-section/${firstSubSection?._id}`
  }

  const truncateDescription = (text = "", limit = 50) => {
    if (text.length <= limit) return text
    return `${text.slice(0, limit)}...`
  }

  if (!enrolledCourses) {
    return (
      <>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner" />
        </div>
      </>
    )
  }

  if (!enrolledCourses.length) {
    return (
      <>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      </>
    )
  }

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>

      <div className="my-8 text-richblack-5">
        {/* Headings */}
        <div className="flex rounded-t-lg bg-richblack-500">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>

        {enrolledCourses.map((course, index) => {
          const isLast = index === enrolledCourses.length - 1
          const progress = course?.progressPercentage ?? 0

          return (
            <div
              key={course._id}
              className={`flex items-center border border-richblack-700 ${
                isLast ? "rounded-b-lg" : ""
              }`}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => navigate(getCourseNavigationPath(course))}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>

                  <p className="text-xs text-richblack-300">
                    {truncateDescription(course.courseDescription)}
                  </p>
                </div>
              </div>

              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {progress}%</p>

                <ProgressBar
                  completed={progress}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}