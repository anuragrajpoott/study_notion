import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (tab) => {
    setCurrentTab(tab);

    const selectedCategory = HomePageExplore.find(
      (course) => course.tag === tab
    );

    if (!selectedCategory) return;

    setCourses(selectedCategory.courses);
    setCurrentCard(selectedCategory.courses[0].heading);
  };

  return (
    <div>
      {/* Explore more section */}
      <div>
        <div className="my-10 text-center text-4xl font-semibold">
          Unlock the
          <HighlightText text="Power of Code" />
          <p className="mt-1 text-center text-lg font-semibold text-richblack-300">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto -mt-5 hidden w-max gap-5 rounded-full bg-richblack-800 p-1 font-medium text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] lg:flex">
        {tabsName.map((tab) => {
          const isActive = currentTab === tab;

          return (
            <div
              key={tab}
              onClick={() => setMyCards(tab)}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-7 py-[7px] text-[16px] transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 ${
                isActive
                  ? "bg-richblack-900 font-medium text-richblack-5"
                  : "text-richblack-200"
              }`}
            >
              {tab}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Cards Group */}
      <div className="mb-7 flex w-full flex-wrap justify-center gap-10 px-3 text-black lg:absolute lg:bottom-0 lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:translate-y-1/2 lg:justify-between lg:gap-0 lg:px-0">
        {courses.map((course) => (
          <CourseCard
            key={course.heading}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;