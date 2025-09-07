import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getServiceApi } from "../../Api_url";

const token = localStorage.getItem("accessToken");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// get Services
export const getAllServices = createAsyncThunk(
  "getAllServices/Services",
  async () => {
    try {
      const response = await axios.get(getServiceApi, { headers });
      return response.data; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
// 
export const getAllProviders = createAsyncThunk(
  "providers/getAllProviders",
  async (
    { search = "", page = 1, limit = 10, serviceCategoryId = "", skillIds = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        getServiceApi,
        {
          params: { search, page, limit, serviceCategoryId, skillIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; // { providers, pagination }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ServiceSlice = createSlice({
  name: "Service",
  initialState: {
    Services: [], 
    status: "idle",
    // 
     providers: [],
    pagination: { totalPages: 1, page: 1, limit: 10 },

    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Services = action.payload.data.providers; 
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // 
       .addCase(getAllProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.providers = action.payload.providers;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ServiceSlice.reducer;
