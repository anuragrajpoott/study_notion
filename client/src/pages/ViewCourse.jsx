import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);

      const { courseDetails, completedVideos } = courseData;

      dispatch(setCourseSectionData(courseDetails.courseContent));
      dispatch(setEntireCourseData(courseDetails));
      dispatch(setCompletedLectures(completedVideos));

      const totalLectures =
        courseDetails?.courseContent?.reduce(
          (acc, section) => acc + (section?.subSection?.length || 0),
          0
        ) || 0;

      dispatch(setTotalNoOfLectures(totalLectures));
    };

    fetchCourseDetails();
  }, [courseId, token, dispatch]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}