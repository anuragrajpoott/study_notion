const statsData = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className="bg-richblack-700">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <div className="grid grid-cols-2 text-center md:grid-cols-4">
          {statsData.map((stat) => (
            <div key={stat.label} className="flex flex-col py-10">
              <h1 className="text-[30px] font-bold text-richblack-5">
                {stat.count}
              </h1>
              <h2 className="text-[16px] font-semibold text-richblack-500">
                {stat.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;