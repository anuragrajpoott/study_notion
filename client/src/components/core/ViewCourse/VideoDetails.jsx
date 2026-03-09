import { useEffect, useRef, useState } from "react";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseSectionData?.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const section = courseSectionData.find((s) => s._id === sectionId);
    const subSection = section?.subSection?.find((s) => s._id === subSectionId);

    setVideoData(subSection);
    setPreviewSource(courseEntireData?.thumbnail);
    setVideoEnded(false);
  }, [
    courseSectionData,
    courseEntireData?.thumbnail,
    courseId,
    sectionId,
    subSectionId,
    navigate,
    location.pathname,
  ]);

  const getCurrentIndexes = () => {
    const sectionIndex = courseSectionData.findIndex(
      (s) => s._id === sectionId
    );

    const subSectionIndex =
      courseSectionData?.[sectionIndex]?.subSection?.findIndex(
        (s) => s._id === subSectionId
      );

    return { sectionIndex, subSectionIndex };
  };

  const isFirstVideo = () => {
    const { sectionIndex, subSectionIndex } = getCurrentIndexes();
    return sectionIndex === 0 && subSectionIndex === 0;
  };

  const isLastVideo = () => {
    const { sectionIndex, subSectionIndex } = getCurrentIndexes();
    const lastSectionIndex = courseSectionData.length - 1;
    const lastSubSectionIndex =
      courseSectionData?.[sectionIndex]?.subSection?.length - 1;

    return sectionIndex === lastSectionIndex && subSectionIndex === lastSubSectionIndex;
  };

  const goToNextVideo = () => {
    const { sectionIndex, subSectionIndex } = getCurrentIndexes();
    const section = courseSectionData[sectionIndex];
    const nextSub = section?.subSection?.[subSectionIndex + 1];

    if (nextSub) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSub._id}`
      );
    } else {
      const nextSection = courseSectionData[sectionIndex + 1];
      const firstSub = nextSection?.subSection?.[0];

      if (nextSection && firstSub) {
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${firstSub._id}`
        );
      }
    }
  };

  const goToPrevVideo = () => {
    const { sectionIndex, subSectionIndex } = getCurrentIndexes();
    const prevSub =
      courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex - 1];

    if (prevSub) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSub._id}`
      );
    } else {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastSub =
        prevSection?.subSection?.[prevSection.subSection.length - 1];

      if (prevSection && lastSub) {
        navigate(
          `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSub._id}`
        );
      }
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="mx-auto max-w-max px-4 text-xl"
                />
              )}

              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="mx-auto mt-2 max-w-max px-4 text-xl"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pb-6 pt-2">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;