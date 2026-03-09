import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

/* ---------- LocalStorage Helpers ---------- */

const getFromStorage = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const updateStorage = (cart, total, totalItems) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
  localStorage.setItem("totalItems", JSON.stringify(totalItems));
};

/* ---------- Initial State ---------- */

const initialState = {
  cart: getFromStorage("cart", []),
  total: getFromStorage("total", 0),
  totalItems: getFromStorage("totalItems", 0),
};

/* ---------- Slice ---------- */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;

      const existingCourse = state.cart.find((item) => item._id === course._id);

      if (existingCourse) {
        toast.error("Course already in cart");
        return;
      }

      state.cart.push(course);
      state.totalItems += 1;
      state.total += course.price;

      updateStorage(state.cart, state.total, state.totalItems);

      toast.success("Course added to cart");
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;

      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index === -1) return;

      const course = state.cart[index];

      state.cart.splice(index, 1);
      state.totalItems -= 1;
      state.total -= course.price;

      updateStorage(state.cart, state.total, state.totalItems);

      toast.success("Course removed from cart");
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;