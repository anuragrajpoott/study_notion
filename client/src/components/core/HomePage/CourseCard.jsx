import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`h-[300px] w-[360px] cursor-pointer box-border text-richblack-25 lg:w-[30%] ${
        isActive
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="flex h-[80%] flex-col gap-3 border-b-[2px] border-dashed border-richblack-400 p-6">
        <div
          className={`text-[20px] font-semibold ${
            isActive ? "text-richblack-800" : ""
          }`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between px-6 py-3 font-medium ${
          isActive ? "text-blue-300" : "text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;