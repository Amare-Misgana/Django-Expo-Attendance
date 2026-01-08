import axios from "axios";

export const api = axios.create({
  baseURL: "https://attendace-via-mobile-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
