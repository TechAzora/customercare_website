// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://api.vittasarthi.com/";

// Banner
export const getBannerApi = `${BASE_URL}api/v1/Careconnect/banner/getAllTrue`;

// Blog
export const getBlogApi = `${BASE_URL}api/v1/Careconnect/blog/getAllTrue`;

// category
export const getCategories = `${BASE_URL}api/v1/admin/service/getAllServiceCategories`;

// skill
export const getSkills = `${BASE_URL}api/v1/admin/service/getAllServicesByCategory`;


// getServiceApi
export const getServiceApi = `${BASE_URL}api/v1/provider/auth/getOnlineProvidersForWeb`;
export const getCompanyServiceApi = `${BASE_URL}api/v1/company/auth/getOnlineCompaniesForWeb`;

// getServiceApi
export const getProviderServicesApi = `${BASE_URL}api/v1/provider/providerService/getAllProviderServicesForCustomer`;
// getServiceApi
export const getCompanyProviderServiceApi = `${BASE_URL}api/v1/company/companyService/getAllCompanyServicesForCustomer`;



