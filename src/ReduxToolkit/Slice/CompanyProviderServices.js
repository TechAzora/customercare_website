import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCompanyProviderServiceApi } from "../../Api_url";

const token = localStorage.getItem("accessToken");

// 🔹 Thunk to fetch provider services
export const getCompanyProviderService = createAsyncThunk(
  "CompanyProviderService/getCompanyProviderService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getCompanyProviderServiceApi}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; // array of provider services
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const CompanyProviderServiceSlice = createSlice({
  name: "CompanyProviderService",
  initialState: {
    CompanyProviderServices: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyProviderService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCompanyProviderService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.CompanyProviderServices = action.payload; // save array of services
      })
      .addCase(getCompanyProviderService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default CompanyProviderServiceSlice.reducer;
