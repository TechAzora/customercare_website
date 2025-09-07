import { combineReducers } from "@reduxjs/toolkit";
import Banner from "./Slice/Banner";
import Blog from "./Slice/Blog";
import Service from "./Slice/Service";
import CompanyService from "./Slice/CompanyService";
import categories from "./Slice/Category";
import skills from './Slice/Skill';
import providerServices from './Slice/ProviderServicesSlice';
import CompanyProviderService from './Slice/CompanyProviderServices'

const rootReducer = combineReducers({
  Service,
  CompanyService,
  categories,
  skills,
  providerServices,
  CompanyProviderService,
  banner: Banner,
  blog: Blog,

});

export default rootReducer;
