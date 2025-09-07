import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSkills } from "../../Api_url";

const token = localStorage.getItem("token"); // adjust if stored differently

// 🔹 Thunk: Fetch skills
export const getAllSkills = createAsyncThunk(
  "skills/getAllSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        getSkills, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; // 👈 returns array of skills
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const SkillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSkills.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload; 
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default SkillSlice.reducer;
