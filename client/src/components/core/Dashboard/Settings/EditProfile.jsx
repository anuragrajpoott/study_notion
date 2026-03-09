import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      // silent fail to preserve behavior
    }
  }

  const handleCancel = () => {
    navigate("/dashboard/my-profile")
  }

  const maxDate = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="lable-style">
              First Name
            </label>

            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="form-style"
              defaultValue={user?.firstName}
              {...register("firstName", { required: true })}
            />

            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="lable-style">
              Last Name
            </label>

            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="form-style"
              defaultValue={user?.lastName}
              {...register("lastName", { required: true })}
            />

            {errors.lastName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="lable-style">
              Date of Birth
            </label>

            <input
              type="date"
              id="dateOfBirth"
              className="form-style"
              defaultValue={user?.additionalDetails?.dateOfBirth}
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth.",
                },
                max: {
                  value: maxDate,
                  message: "Date of Birth cannot be in the future.",
                },
              })}
            />

            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="lable-style">
              Gender
            </label>

            <select
              id="gender"
              className="form-style"
              defaultValue={user?.additionalDetails?.gender}
              {...register("gender", { required: true })}
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>

            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your gender.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="lable-style">
              Contact Number
            </label>

            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style"
              defaultValue={user?.additionalDetails?.contactNumber}
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: {
                  value: 12,
                  message: "Invalid Contact Number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid Contact Number",
                },
              })}
            />

            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="lable-style">
              About
            </label>

            <input
              type="text"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style"
              defaultValue={user?.additionalDetails?.about}
              {...register("about", { required: true })}
            />

            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50"
        >
          Cancel
        </button>

        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  )
}