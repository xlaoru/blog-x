import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

import { useHttp } from "../services/useHttp";

interface IBlog {
    title: string;
    body: string;
    link: string;
    code: string;
}

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs",
    async () => {
        try {
            const response = await fetch("http://localhost:3001/api/blogs");
            if (!response.ok) throw new Error("Failed to fetch blogs")
            return response.json()
        } catch(error) {
            console.log("Error fetching blogs", error);
            throw error
        }
    }
)

/* export const addBlogAsync = createAsyncThunk(
  "blogs/addBlog",
  async ({ token, title, body, link, code }: IBlog & { token: string }, { rejectWithValue }) => {
    const { request } = useHttp();
    console.log(token);

    try {
      const response = await request({
        url: "http://localhost:3001/api/blogs",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, link, code }),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      return response.json();
    } catch (error) {
      console.error("Error adding blog:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);*/

const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload
}

const BlogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [] as IBlog[],
    status: "idle" as LoadingStatusTypes,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = action.payload;
    });
    builder.addCase(fetchBlogs.rejected, setError);

    /* builder.addCase(addBlogAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs.push(action.payload);
    });
    builder.addCase(addBlogAsync.rejected, setError); */
  },
});


export const selectBlogs = (state: RootState) => state.blogs.blogs
export default BlogSlice.reducer