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
        const errorData = await response.json();
        throw new Error(errorData.message);
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
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      return { id, message: data.message, isSaved: data.message.includes("removed") ? false : true };
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

export const getSavedBlogsAsync = createAsyncThunk(
  "blogs/getSavedBlogs",
  async({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/savedBlogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })

      if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data
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

type IBlogUpdateState = Omit<IBlog, "_id" | "isSaved"> & { token: string, id: string }

export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, token, title, body, link, code }: IBlogUpdateState, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, link, code }),
      });

      if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error updating blog:", error);
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
        const errorData = await response.json();
        throw new Error(errorData.message);
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
    savedBlogs: [] as IBlog[],
    status: "idle" as LoadingStatusTypes,
    response: null,
    error: null
  },
  reducers: {
    clearBlogs: (state) => {
      state.blogs = [];
    },
    clearBlogResponseAndError: (state) => {
      state.response = null;
      state.error = null;
    }
  },
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
      state.blogs.push(action.payload.blog);
      state.response = action.payload.message;
    });

    builder.addCase(addBlogAsync.rejected, setError);

    builder.addCase(saveBlogAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(saveBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const { id, isSaved } = action.payload;
    
      state.blogs = state.blogs.map((blog) => {
        if (blog._id === id) {
          return {
            ...blog,
            isSaved,
          };
        }
        return blog;
      });
    
      if (!isSaved) {
        state.savedBlogs = state.savedBlogs.filter((blog) => blog._id !== id);
      } else {
        const blog = state.blogs.find((blog) => blog._id === id);
        if (blog) {
          state.savedBlogs.push(blog);
        }
      }
    });

    builder.addCase(saveBlogAsync.rejected, setError);

    builder.addCase(getSavedBlogsAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getSavedBlogsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.savedBlogs = action.payload.blogs;
      state.response = action.payload.message
    });

    builder.addCase(getSavedBlogsAsync.rejected, setError);

    builder.addCase(updateBlogAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = state.blogs.map((blog) => {
        if (blog._id === action.meta.arg.id) {
          return {
            ...blog,
            title: action.meta.arg.title,
            body: action.meta.arg.body,
            link: action.meta.arg.link,
            code: action.meta.arg.code,
          };
        }
        return blog;
      })
      state.response = action.payload.message
    });

    builder.addCase(updateBlogAsync.rejected, setError);

    builder.addCase(deleteBlogAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = state.blogs.filter(blog => blog._id !== action.meta.arg.id);
      state.response = action.payload.message
    });
    
    builder.addCase(deleteBlogAsync.rejected, setError)
  },
});

export const { clearBlogResponseAndError } = BlogSlice.actions;
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectSavedBlogs = (state: RootState) => state.blogs.savedBlogs;
export const selectResponse = (state: RootState) => state.blogs.response;
export const selectError = (state: RootState) => state.blogs.error;
export default BlogSlice.reducer