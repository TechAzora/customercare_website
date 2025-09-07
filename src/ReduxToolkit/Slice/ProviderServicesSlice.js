import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProviderServicesApi } from "../../Api_url";

const token = localStorage.getItem("accessToken");

// 🔹 Thunk to fetch provider services
export const getProviderServices = createAsyncThunk(
  "providerServices/getProviderServices",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getProviderServicesApi}/${id}`,
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

const ProviderServicesSlice = createSlice({
  name: "providerServices",
  initialState: {
    providerServices: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProviderServices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProviderServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.providerServices = action.payload; // save array of services
      })
      .addCase(getProviderServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ProviderServicesSlice.reducer;
