import { createSlice } from "@reduxjs/toolkit";

const getTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;