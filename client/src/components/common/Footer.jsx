import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";

import Logo from "../../assets/Logo/Logo-Full-Light.png";

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

/* ---------- STATIC DATA ---------- */

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 py-14 text-richblack-400 lg:flex-row">
        <div className="flex w-full flex-col border-b border-richblack-700 pb-5 lg:flex-row">

          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex w-full flex-wrap justify-between gap-3 pl-3 lg:w-1/2 lg:border-r lg:border-richblack-700 lg:pr-5">

            {/* COMPANY */}
            <div className="mb-7 flex w-[30%] flex-col gap-3">
              <img src={Logo} alt="StudyNotion Logo" className="object-contain" />

              <h1 className="text-[16px] font-semibold text-richblack-50">
                Company
              </h1>

              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((item) => (
                  <Link
                    key={item}
                    to={item.toLowerCase()}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* RESOURCES */}
            <div className="mb-7 w-[48%] lg:w-[30%]">
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Resources
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Resources.map((item) => (
                  <Link
                    key={item}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <h1 className="mt-7 text-[16px] font-semibold text-richblack-50">
                Support
              </h1>

              <Link
                to="/help-center"
                className="mt-2 block cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
              >
                Help Center
              </Link>
            </div>

            {/* PLANS + COMMUNITY */}
            <div className="mb-7 w-[48%] lg:w-[30%]">
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Plans
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Plans.map((item) => (
                  <Link
                    key={item}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <h1 className="mt-7 text-[16px] font-semibold text-richblack-50">
                Community
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Community.map((item) => (
                  <Link
                    key={item}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- RIGHT SECTION ---------- */}
          <div className="flex w-full flex-wrap justify-between gap-3 pl-3 lg:w-1/2 lg:pl-5">
            {FooterLink2.map((section) => (
              <div key={section.title} className="mb-7 w-[48%] lg:w-[30%]">
                <h1 className="text-[16px] font-semibold text-richblack-50">
                  {section.title}
                </h1>

                <div className="mt-2 flex flex-col gap-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.title}
                      to={link.link}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM FOOTER ---------- */}
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center justify-between pb-14 text-sm text-richblack-400">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-row">
            {BottomFooter.map((item, index) => (
              <div
                key={item}
                className={`px-3 ${
                  index !== BottomFooter.length - 1
                    ? "border-r border-richblack-700 transition-all duration-200 hover:text-richblack-50"
                    : ""
                }`}
              >
                <Link to={item.split(" ").join("-").toLowerCase()}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;