import { combineReducers } from "@reduxjs/toolkit";
import Banner from "./Slice/Banner";
import Blog from "./Slice/Blog";
import Service from "./Slice/Service";
import categories from "./Slice/Category";
import skills from './Slice/Skill';
import providerServices from './Slice/ProviderServicesSlice';


const rootReducer = combineReducers({
  Service,
  categories,
  skills,
  providerServices,
  banner: Banner,
  blog: Blog,

});

export default rootReducer;
