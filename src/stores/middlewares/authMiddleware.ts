import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/utils/client";
export const getAuthProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await client.get("/auth/profile");
      return response.data;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);
