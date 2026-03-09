import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../components/common/Footer";
import Error from "./Error";

import { apiConnector } from "../services/apiconnector";
import { categoriesEndpoints } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";

import CourseCard from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categoriesEndpoints.GET_ALL_CATEGORIES);

        const matchedCategory = res?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );

        if (matchedCategory) {
          setCategoryId(matchedCategory._id);
        }
      } catch (error) {
        console.error("CATEGORY FETCH ERROR:", error);
      }
    };

    fetchCategories();
  }, [catalogName]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("CATALOG PAGE DATA ERROR:", error);
      }
    };

    if (categoryId) {
      fetchCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!catalogPageData.success) {
    return <Error />;
  }

  const { selectedCategory, differentCategory, mostSellingCourses } =
    catalogPageData.data;

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            Home / Catalog /{" "}
            <span className="text-yellow-25">{selectedCategory?.name}</span>
          </p>

          <p className="text-3xl text-richblack-5">{selectedCategory?.name}</p>

          <p className="max-w-[870px] text-richblack-200">
            {selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>

        <div className="my-4 flex border-b border-richblack-600 text-sm">
          <p
            className={`cursor-pointer px-4 py-2 ${
              active === 1
                ? "border-b border-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>

          <p
            className={`cursor-pointer px-4 py-2 ${
              active === 2
                ? "border-b border-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        <CourseSlider Courses={selectedCategory?.courses} />
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {differentCategory?.name}
        </div>

        <div className="py-8">
          <CourseSlider Courses={differentCategory?.courses} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>

        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mostSellingCourses?.slice(0, 4).map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                Height="h-[400px]"
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;