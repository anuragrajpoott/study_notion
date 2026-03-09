import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  const baseStyles =
    "px-6 py-3 text-center text-[13px] font-bold rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none sm:text-[16px]";

  const activeStyles = "bg-yellow-50 text-black";
  const inactiveStyles = "bg-richblack-800";

  return (
    <Link to={linkto}>
      <div className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}>
        {children}
      </div>
    </Link>
  );
};

export default Button;