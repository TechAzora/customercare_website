import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBlogApi } from "../../Api_url";

// create 
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};



// get Banners
export const getallBlog = createAsyncThunk("getallBlog/blogs", async () => {
  try {
    const response = await axios.get(getBlogApi, { headers });
    return response.data; 
  } catch (error) {
    throw new Error(error.message);
  }
});

const BlogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    status: "idle",
    loadingStatus: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // //getstories
      .addCase(getallBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(getallBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});


export default BlogSlice.reducer;
