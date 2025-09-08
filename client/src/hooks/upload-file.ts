import axios from "axios";
import { BASE_URL } from "../constants/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadFile = async (formData: any) => {
  const res = await axiosInstance.post("/upload", formData);

  return res;
};

export const getFiles = async () => {
  const res = await axiosInstance.get("/files");
  return res;
};
