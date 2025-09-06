import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCategoryApi } from "../../Api_url";
import { toast } from "react-toastify";

// create
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// get Categorys
export const getAllCategorys = createAsyncThunk(
  "getAllCategorys/Categorys",
  async () => {
    try {
      const response = await axios.get(getCategoryApi, { headers });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    Categorys: [],
    status: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // //getplan
      .addCase(getAllCategorys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategorys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Categorys = action.payload.data;
      })
      .addCase(getAllCategorys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default CategorySlice.reducer;
