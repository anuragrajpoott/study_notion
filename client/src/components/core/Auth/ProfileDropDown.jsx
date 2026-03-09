import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout(navigate));
    setOpen(false);
  };

  const closeDropdown = () => setOpen(false);

  return (
    <button
      className="relative"
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center gap-x-1">
        <img
          src={user.image}
          alt={`profile-${user.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          ref={dropdownRef}
          onClick={(event) => event.stopPropagation()}
          className="absolute right-0 top-[118%] z-[1000] divide-y divide-richblack-700 overflow-hidden rounded-md border border-richblack-700 bg-richblack-800"
        >
          <Link to="/dashboard/my-profile" onClick={closeDropdown}>
            <div className="flex w-full items-center gap-x-1 px-[12px] py-[10px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="flex w-full items-center gap-x-1 px-[12px] py-[10px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}