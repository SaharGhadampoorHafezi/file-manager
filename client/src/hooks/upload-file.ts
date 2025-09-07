import axios from "axios";
import { BASE_URL } from "../constants/api";

const urlInstance = axios.create({
  baseURL: "http://localhost:3500",
});

export const uploadFile = async (uploadedFile: File) => {
  const formData = new FormData();
  formData.append("image", uploadedFile); // <-- must match backend field name

  const res = await urlInstance.post("/upload", formData);

  console.log(uploadFile instanceof File)

  return res.data;
};

export const getFile = async () => {
  const res = await urlInstance.get("/files");
  return res;
};
