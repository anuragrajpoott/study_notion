import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  if (!modalData) return null;

  const { text1, text2, btn1Text, btn2Text, btn1Handler, btn2Handler } =
    modalData;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

        <p className="text-2xl font-semibold text-richblack-5">{text1}</p>

        <p className="mb-5 mt-3 leading-6 text-richblack-200">{text2}</p>

        <div className="flex items-center gap-x-4">
          <IconBtn text={btn1Text} onClick={btn1Handler} />

          <button
            onClick={btn2Handler}
            className="cursor-pointer rounded-md bg-richblack-200 px-[20px] py-[8px] font-semibold text-richblack-900"
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}