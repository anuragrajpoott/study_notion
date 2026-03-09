import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title)
      setValue("lectureDesc", modalData?.description)
      setValue("lectureVideo", modalData?.videoUrl)
    }
  }, [edit, view, modalData, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues()

    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    )
  }

  const updateCourseStructure = (updatedSection) => {
    const updatedCourseContent = course.courseContent.map((section) =>
      section._id === (modalData.sectionId || modalData)
        ? updatedSection
        : section
    )

    const updatedCourse = {
      ...course,
      courseContent: updatedCourseContent,
    }

    dispatch(setCourse(updatedCourse))
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)

    const result = await updateSubSection(formData, token)

    if (result) {
      updateCourseStructure(result)
    }

    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      handleEditSubsection()
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true)

    const result = await createSubSection(formData, token)

    if (result) {
      updateCourseStructure(result)
    }

    setModalData(null)
    setLoading(false)
  }

  const handleClose = () => {
    if (!loading) setModalData(null)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button onClick={handleClose}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>

            <input
              id="lectureTitle"
              disabled={view || loading}
              placeholder="Enter Lecture Title"
              className="form-style w-full"
              {...register("lectureTitle", { required: true })}
            />

            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>

            <textarea
              id="lectureDesc"
              disabled={view || loading}
              placeholder="Enter Lecture Description"
              className="form-style min-h-[130px] w-full resize-none"
              {...register("lectureDesc", { required: true })}
            />

            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={
                  loading
                    ? "Loading..."
                    : edit
                    ? "Save Changes"
                    : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}