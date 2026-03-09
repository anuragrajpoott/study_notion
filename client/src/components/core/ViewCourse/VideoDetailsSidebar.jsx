import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

export default function VideoDetailsSidebar({ setReviewModal }) {

  const dispatch = useDispatch();

  const [activeSectionId, setActiveSectionId] = useState("");
  const [activeSubSectionId, setActiveSubSectionId] = useState("");
 

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const courseId = courseEntireData?._id;

  // Sync active section + subsection with URL
  useEffect(() => {
    if (!courseSectionData?.length) return;

    const section = courseSectionData.find((sec) => sec._id === sectionId);
    const subSection = section?.subSection?.find(
      (sub) => sub._id === subSectionId
    );

    setActiveSectionId(section?._id || "");
    setActiveSubSectionId(subSection?._id || "");
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  // Progress percentage
  const progressPercent =
    totalNoOfLectures > 0
      ? Math.round(((completedLectures?.length || 0) / totalNoOfLectures) * 100)
      : 0;

  // Handle lecture completion on checkbox click
  const handleLectureCompletion = async (lectureId) => {

    if (completedLectures?.includes(lectureId)) return;

    try {
     

      const res = await markLectureAsComplete(
        { courseId, subsectionId: lectureId },
        token
      );

      if (res) {
        dispatch(updateCompletedLectures(lectureId));
      }

    } catch (error) {
      console.error("Error completing lecture:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-richblack-700 bg-richblack-800">

      {/* Header */}
      <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

        <div className="flex w-full items-center justify-between">

          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 transition-transform hover:scale-90"
            title="Back"
          >
            <IoIosArrowBack size={30} />
          </button>

          {/* Review Button */}
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
          />

        </div>

        {/* Course Info */}
        <div className="flex flex-col">

          <p>{courseEntireData?.courseName}</p>

          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length || 0} / {totalNoOfLectures} Lectures Completed
          </p>

          {/* Progress Bar */}
          <div className="mt-2 h-2 w-full rounded-full bg-richblack-600">
            <div
              className="h-full rounded-full bg-yellow-50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-xs text-richblack-400 mt-1">
            {progressPercent}% Completed
          </p>

        </div>
      </div>

      {/* Sections */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">

        {courseSectionData?.map((section) => (
          <div key={section._id} className="mt-2 text-sm text-richblack-5">

            {/* Section Header */}
            <div
              className="flex cursor-pointer justify-between bg-richblack-600 px-5 py-4"
              onClick={() =>
                setActiveSectionId(
                  activeSectionId === section._id ? "" : section._id
                )
              }
            >

              <div className="w-[70%] font-semibold">
                {section?.sectionName}
              </div>

              <span
                className={`transition-transform duration-300 ${
                  activeSectionId === section._id
                    ? "rotate-0"
                    : "rotate-180"
                }`}
              >
                <BsChevronDown />
              </span>

            </div>

            {/* Subsections */}
            {activeSectionId === section._id && (

              <div className="overflow-hidden transition-all duration-300">

                {section?.subSection?.map((topic) => (

                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 px-5 py-2 ${
                      activeSubSectionId === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                  >

                    {/* Completion Checkbox */}
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic._id)}
                      onChange={() => handleLectureCompletion(topic._id)}
                    />

                    {/* Lecture Title */}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/view-course/${courseId}/section/${section._id}/sub-section/${topic._id}`
                        );
                        setActiveSubSectionId(topic._id);
                      }}
                    >
                      {topic.title}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>
        ))}

      </div>

    </div>
  );
}