import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeSectionId, setActiveSectionId] = useState("");
  const [activeSubSectionId, setActiveSubSectionId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData?.length) return;

    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const subSectionIndex =
      courseSectionData?.[sectionIndex]?.subSection?.findIndex(
        (sub) => sub._id === subSectionId
      );

    const currentSubSectionId =
      courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex]?._id;

    setActiveSectionId(courseSectionData?.[sectionIndex]?._id);
    setActiveSubSectionId(currentSubSectionId);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-richblack-700 bg-richblack-800">
      {/* Header */}
      <div className="mx-5 flex flex-col items-start justify-between gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 transition-transform hover:scale-90"
            title="Back"
          >
            <IoIosArrowBack size={30} />
          </button>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((section) => (
          <div
            key={section._id}
            className="mt-2 cursor-pointer text-sm text-richblack-5"
          >
            {/* Section Header */}
            <div
              className="flex justify-between bg-richblack-600 px-5 py-4"
              onClick={() => setActiveSectionId(section._id)}
            >
              <div className="w-[70%] font-semibold">
                {section?.sectionName}
              </div>

              <span
                className={`transition-transform duration-500 ${
                  activeSectionId === section._id ? "rotate-0" : "rotate-180"
                }`}
              >
                <BsChevronDown />
              </span>
            </div>

            {/* Subsections */}
            {activeSectionId === section._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {section.subSection.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex gap-3 px-5 py-2 ${
                      activeSubSectionId === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                      );
                      setActiveSubSectionId(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      readOnly
                    />
                    {topic.title}
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