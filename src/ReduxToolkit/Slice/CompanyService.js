import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCompanyServiceApi } from "../../Api_url";

const token = localStorage.getItem("accessToken");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// get CompanyServices
export const getAllCompanyServices = createAsyncThunk(
  "getAllCompanyServices/CompanyServices",
  async () => {
    try {
      const response = await axios.get(getCompanyServiceApi, { headers });
      return response.data; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
// 
export const CompanyGetAllProviders = createAsyncThunk(
  "providers/CompanyGetAllProviders",
  async (
    { search = "", page = 1, limit = 10, CompanyServiceCategoryId = "",},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        getCompanyServiceApi,
        {
          params: { search, page, limit, CompanyServiceCategoryId },
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

const CompanyServiceSlice = createSlice({
  name: "CompanyService",
  initialState: {
    CompanyServices: [], 
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
      .addCase(getAllCompanyServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompanyServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.CompanyServices = action.payload.data.companies; 
      })
      .addCase(getAllCompanyServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // 
       .addCase(CompanyGetAllProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CompanyGetAllProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.providers = action.payload.companies;
        state.pagination = action.payload.pagination;
      })
      .addCase(CompanyGetAllProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default CompanyServiceSlice.reducer;
