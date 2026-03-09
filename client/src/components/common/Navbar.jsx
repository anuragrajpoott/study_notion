import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categoriesEndpoints } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH CATEGORIES ---------- */

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const response = await apiConnector(
          "GET",
          categoriesEndpoints.GET_ALL_CATEGORIES
        );

        setSubLinks(response?.data?.data || []);
      } catch (error) {
        console.error("Could not fetch categories:", error);
      }

      setLoading(false);
    };

    fetchCategories();
  }, []);

  /* ---------- MATCH ROUTE ---------- */

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-b-richblack-700 transition-all duration-200 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* ---------- LOGO ---------- */}
        <Link to="/">
          <img
            src={logo}
            alt="StudyNotion Logo"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>

        {/* ---------- NAV LINKS ---------- */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link) => (
              <li key={link.title}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* ---------- DROPDOWN ---------- */}
                    <div className="invisible absolute left-1/2 top-1/2 z-[1000] flex w-[200px] -translate-x-1/2 translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                      {/* Triangle */}
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] -translate-y-[40%] rotate-45 rounded bg-richblack-5"></div>

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks
                          .filter((category) => category?.courses?.length > 0)
                          .map((category) => (
                            <Link
                              key={category._id}
                              to={`/catalog/${category.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg py-4 pl-4 hover:bg-richblack-50"
                            >
                              {category.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------- AUTH / CART ---------- */}
        <div className="hidden items-center gap-x-4 md:flex">

          {/* CART */}
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* LOGIN */}
          {!token && (
            <Link to="/login">
              <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                Log in
              </button>
            </Link>
          )}

          {/* SIGNUP */}
          {!token && (
            <Link to="/signup">
              <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                Sign up
              </button>
            </Link>
          )}

          {/* PROFILE */}
          {token && <ProfileDropdown />}
        </div>

        {/* ---------- MOBILE MENU ---------- */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;