import { createPB } from "../config/pocketbase.js";

export const loginUser = async (email, password) => {
  const pb = createPB();
  return await pb.collection("users").authWithPassword(email, password);
};

export const registerUser = async (data) => {
  const pb = createPB();
  return await pb.collection("users").create(data);
};