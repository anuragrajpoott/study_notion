export default function Tab({ tabData = [], field, setField }) {
  return (
    <div
      className="my-6 flex max-w-max gap-x-1 rounded-full bg-richblack-800 p-1"
      style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
    >
      {tabData.map((tab) => {
        const isActive = field === tab.type;

        return (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`rounded-full px-5 py-2 transition-all duration-200 ${
              isActive
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            }`}
          >
            {tab.tabName}
          </button>
        );
      })}
    </div>
  );
}  