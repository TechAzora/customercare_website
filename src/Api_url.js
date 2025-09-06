// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://Careconnect-backend.vercel.app/";

// Banner
export const getBannerApi = `${BASE_URL}api/v1/Careconnect/banner/getAllTrue`;
// video
export const getVideoApi = `${BASE_URL}api/v1/Careconnect/video/getAll`;

// video
export const getEventApi = `${BASE_URL}api/v1/Careconnect/event/getAllTrue`;

// Blog
export const getBlogApi = `${BASE_URL}api/v1/Careconnect/blog/getAllTrue`;
export const getSingleBlogApi = `${BASE_URL}api/v1/Careconnect/blog/getSingle`;

// Dining
export const getDiningApi = `${BASE_URL}api/v1/Careconnect/dining/getAllTrue`;
export const getSingleDiningApi = `${BASE_URL}api/v1/Careconnect/dining/getBySlug`;


// experience
export const getExperienceApi = `${BASE_URL}api/v1/Careconnect/experience/getAllTrue`;
export const getSingleExperienceApi = `${BASE_URL}api/v1/Careconnect/experience/getBySlug`;
// amenities
export const getAmenitiesApi = `${BASE_URL}api/v1/Careconnect/amenities/getAllTrue`;

// Living
export const getLivingApi = `${BASE_URL}api/v1/Careconnect/living/getAllTrue`;
export const getSingleLivingApi = `${BASE_URL}api/v1/Careconnect/living/getBySlug`;

// offer
export const getOfferApi = `${BASE_URL}api/v1/Careconnect/offer/getAllTrue`;
export const getSingleOfferApi = `${BASE_URL}api/v1/Careconnect/offer/getBySlug`;

//hotels
export const getHotelApi = `${BASE_URL}api/v1/Careconnect/hotel/getByCategory`;
export const getSingleHotelApi = `${BASE_URL}api/v1/Careconnect/hotel/getSingle`;
export const getallHotelDataApi = `${BASE_URL}api/v1/Careconnect/hotel/getAllTrue`;
export const getHotelRoomApi = `${BASE_URL}api/v1/Careconnect/room/getByHotel`;

//Property
export const getPropertyApi = `${BASE_URL}api/v1/Careconnect/property/getByCategory`;
export const getPropertyDetailsApi = `${BASE_URL}api/v1/Careconnect/property/getBySlug`;
export const getallPropertyDataApi = `${BASE_URL}api/v1/Careconnect/property/getAllActive`;

// Media
export const getMediaApi = `${BASE_URL}api/v1/Careconnect/media/getActive`;

// getCustomer
export const getCustomerApi = `${BASE_URL}api/v1/Careconnect/testimonials/getActive`;
export const createReviewApi = `${BASE_URL}api/v1/Careconnect/testimonials/upload`;

// product
export const getProductApi = `${BASE_URL}api/v1/Careconnect/product/getByCategory`;
export const getSingleProductApi = `${BASE_URL}api/v1/Careconnect/product/getSingle`;

// category
export const getCategoryApi = `${BASE_URL}api/v1/Careconnect/hotel/getAllTrue`;

// createContactApi
export const createContactApi = `${BASE_URL}api/v1/Careconnect/contact/upload`;
// createContactApi
export const createPropertyFormAPi = `${BASE_URL}api/v1/Careconnect/property-form/upload`;

// Product Reviews
export const getProductReviewApi = `${BASE_URL}api/v1/website/reviews`;


