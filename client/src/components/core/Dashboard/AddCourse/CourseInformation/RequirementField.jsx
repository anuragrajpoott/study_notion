import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || [])
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
  }, [editCourse, course, name, register])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList, name, setValue])

  const handleAddRequirement = () => {
    const value = requirement.trim()
    if (!value) return

    setRequirementsList((prev) => [...prev, value])
    setRequirement("")
  }

  const handleRemoveRequirement = (index) => {
    setRequirementsList((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          id={name}
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center text-richblack-5">
              <span>{item}</span>

              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-2 text-xs text-pure-greys-300"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}