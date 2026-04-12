// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://easystretch-be-2.vercel.app";

// API Endpoints
export const ENDPOINTS = {
  auth: {
    signup: "/users/signup",
    signin: "/users/signin",
    signout: "/users/signout",
    otp: "/users/otp",
    me: "/users/me",
  },
};
