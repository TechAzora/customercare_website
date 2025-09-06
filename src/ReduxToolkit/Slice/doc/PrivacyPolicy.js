// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { getprivacyPolicyApi } from "../../../Api_url";
// import { toast } from "react-toastify";

// // create privacyPolicy
// export const getprivacyPolicy = createAsyncThunk(
//   "getprivacyPolicy/privacyPolicy",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(getprivacyPolicyApi, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// const privacyPolicySlice = createSlice({
//   name: "privacyPolicy",
//   initialState: {
//     privacyPolicys: [],
//     status: "idle",
//     error: null,
//     message: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       //create privacyPolicy
//       .addCase(getprivacyPolicy.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getprivacyPolicy.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.privacyPolicys = action.payload.data;
//       })
//       .addCase(getprivacyPolicy.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   },
// });

// export default privacyPolicySlice.reducer;
