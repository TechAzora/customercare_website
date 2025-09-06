import { combineReducers } from "@reduxjs/toolkit";
import Banner from "./Slice/Banner";
import Blog from "./Slice/Blog";
import Category from "./Slice/Category";



const rootReducer = combineReducers({
  Category,
  banner: Banner,
  blog: Blog,

});

export default rootReducer;
