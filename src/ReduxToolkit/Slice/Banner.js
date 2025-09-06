import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getBannerApi,
} from "../../Api_url";
import { toast } from "react-toastify";

// create 
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};


// get Banners
export const getAllBanners = createAsyncThunk("getAllBanners/banners", async () => {
  try {
    const response = await axios.get(getBannerApi, { headers });
    return response.data; 
  } catch (error) {
    throw new Error(error.message);
  }
});

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    status: "idle",
    loadingStatus: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // //getplan
      .addCase(getAllBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload.data;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  },
});


export default bannerSlice.reducer;
