import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState("students")

  const generateRandomColors = (count) =>
    Array.from({ length: count }, () =>
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
    )

  const labels = courses.map((course) => course.courseName)

  const studentsData = courses.map((course) => course.totalStudentsEnrolled)
  const incomeData = courses.map((course) => course.totalAmountGenerated)

  const chartDataStudents = {
    labels,
    datasets: [
      {
        data: studentsData,
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const chartIncomeData = {
    labels,
    datasets: [
      {
        data: incomeData,
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
  }

  const isStudentsChart = currChart === "students"

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>

      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            isStudentsChart
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm px-3 py-1 transition-all duration-200 ${
            !isStudentsChart
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie
          data={isStudentsChart ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}