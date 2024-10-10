import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IBlog {
  _id: string;
  title: string;
  body: string;
  link: string;
  code: string;
  isSaved: boolean;
}

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs",
  async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs")
      return response.json()
    } catch(error) {
      console.log("Error fetching blogs", error);
      throw error
    }
  }
)

type IBlogState = Omit<IBlog, "_id" | "isSaved"> & { token: string }

export const addBlogAsync = createAsyncThunk(
  "blogs/addBlog",
  async ({ token, title, body, link, code }: IBlogState, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/blogs", {
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding blog:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const saveBlogAsync = createAsyncThunk(
  "blogs/saveBlog",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save blog");
      }

      return id;
    } catch (error) {
      console.error("Error adding blog:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
)

export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) { 
        throw new Error("Failed to delete blog");
      }

      const data = await response.json(); 
      return data;

    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
)

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

    builder.addCase(addBlogAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs.push(action.payload);
    });

    builder.addCase(addBlogAsync.rejected, setError);

    builder.addCase(saveBlogAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(saveBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const savedBlogId = action.payload;
      state.blogs = state.blogs.map((blog) => {
        if (blog._id === savedBlogId) {
          return {
            ...blog,
            isSaved: !blog.isSaved,
          };
        }
        return blog;
      });
    });

    builder.addCase(saveBlogAsync.rejected, setError);

    builder.addCase(deleteBlogAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = state.blogs.filter(blog => blog._id !== action.meta.arg.id);
    });
    
    builder.addCase(deleteBlogAsync.rejected, setError)
  },
});


export const selectBlogs = (state: RootState) => state.blogs.blogs;
export default BlogSlice.reducer