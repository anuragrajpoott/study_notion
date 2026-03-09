import { createSlice } from "@reduxjs/toolkit";

/* ---------- Initial State ---------- */

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

/* ---------- Slice ---------- */

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },

    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },

    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },

    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },

    updateCompletedLectures: (state, action) => {
      state.completedLectures.push(action.payload);
    },
  },
});

/* ---------- Exports ---------- */

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;