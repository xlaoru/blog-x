import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./";

import api from "../utils/api";

export interface IBlog {
  _id: string;
  title: string;
  body: string;
  link: string;
  code: string;
  tags: string[];
  isSaved: boolean;
  isEditable: boolean;
  upVotes: {
    quantity: number;
    isVoted: boolean;
  };
  downVotes: {
    quantity: number;
    isVoted: boolean;
  };
}

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs",
  async () => {
    try {
      const response = await api.get("/api/blogs")

      // if (!response.ok) throw new Error("Failed to fetch blogs")
      
      const data = response.data
      return data;
    } catch(error) {
      console.log("Error fetching blogs", error);
      throw error
    }
  }
)

export const fetchBlogsByTag = createAsyncThunk("blogs/fetchBlogsByTag",
  async (tags: string[], { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/blogs/tags`, { tags })

      // if (!response.ok) throw new Error("Failed to fetch blogs")
      
      const data = response.data
      return data;
    } catch(error) {
      console.error("Error adding blog:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
)

type IBlogState = Omit<IBlog, "_id" | "isSaved" | "isEditable" | "upVotes" | "downVotes">

export const addBlogAsync = createAsyncThunk(
  "blogs/addBlog",
  async ({ title, body, link, code, tags }: IBlogState, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/blogs", { title, body, link, code, tags })

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = response.data
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
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/blogs/${id}/save`)

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */
      
      const data = await response.data;
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
  async(_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/blogs/saved')

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data
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

type IBlogUpdateState = Omit<IBlog, "_id" | "isSaved" | "isEditable" | "upVotes" | "downVotes"> & { id: string }

export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, title, body, link, code, tags }: IBlogUpdateState, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/blogs/${id}`, { title, body, link, code, tags })

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data;
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
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/blogs/${id}`)

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data; 
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

export interface IComment {
  _id: string;
  text: string;
  createdBy: string
}

export const addCommentAsync = createAsyncThunk(
  "blogs/addComment",
  async ({ id, text }: { id: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/blogs/${id}/comments`, { text })

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error adding comment:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
)

export const getCommentsAsync = createAsyncThunk(
  "blogs/getComments",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/blogs/${id}/comments`)

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
)

export const voteBlogAsync = createAsyncThunk(
  "blogs/voteBlog",
  async ({ id, voteType }: { id: string; voteType: "upvote" | "downvote" }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/blogs/${id}/vote/${voteType}`)

      /* if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message);
      } */

      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
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
    comments: [] as IComment[],
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
      state.blogs = action.payload.blogs;
      localStorage.setItem("tags", action.payload.tags)
      state.response = action.payload.message;
    });

    builder.addCase(fetchBlogs.rejected, setError);

    builder.addCase(fetchBlogsByTag.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchBlogsByTag.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = action.payload.blogs;
      state.response = action.payload.message;
    });

    builder.addCase(fetchBlogsByTag.rejected, setError);

    builder.addCase(addBlogAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";

      state.blogs.push({
      ...action.payload.blog,
      isEditable: true,
      });

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
            tags: action.meta.arg.tags
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

    builder.addCase(addCommentAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.comments.push({
        _id: action.payload.comment._id,
        text: action.payload.comment.text,
        createdBy: action.payload.comment.createdBy
      });
      state.response = action.payload.message
    });

    builder.addCase(addCommentAsync.rejected, setError)

    builder.addCase(getCommentsAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.comments = action.payload.comments;
      state.response = action.payload.message
    });

    builder.addCase(getCommentsAsync.rejected, setError)

    builder.addCase(voteBlogAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(voteBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";

      state.blogs = state.blogs.map((blog) => {
        if (blog._id === action.meta.arg.id) {
          if (action.payload.blog) {
            if (action.meta.arg.voteType === "upvote") {
              return {
                ...blog,
                upVotes: {
                  quantity: action.payload.blog.upVotes.quantity,
                  isVoted: !blog.upVotes.isVoted 
                },
                downVotes: {
                  quantity: action.payload.blog.downVotes.quantity,
                  isVoted: false
                }
              };
            }
            if (action.meta.arg.voteType === "downvote") {
              return {
                ...blog,
                upVotes: {
                  quantity: action.payload.blog.upVotes.quantity,
                  isVoted: false
                },
                downVotes: {
                  quantity: action.payload.blog.downVotes.quantity,
                  isVoted: !blog.downVotes.isVoted 
                }
              };
            }
          }
        }
        return blog;
      });

      state.savedBlogs = state.savedBlogs.map((blog) => {
        if (blog._id === action.meta.arg.id) {
          if (action.payload.blog) {
            if (action.meta.arg.voteType === "upvote") {
              return {
                ...blog,
                upVotes: {
                  quantity: action.payload.blog.upVotes.quantity,
                  isVoted: !blog.upVotes.isVoted 
                },
                downVotes: {
                  quantity: action.payload.blog.downVotes.quantity,
                  isVoted: false
                }
              };
            }
            if (action.meta.arg.voteType === "downvote") {
              return {
                ...blog,
                upVotes: {
                  quantity: action.payload.blog.upVotes.quantity,
                  isVoted: false
                },
                downVotes: {
                  quantity: action.payload.blog.downVotes.quantity,
                  isVoted: !blog.downVotes.isVoted 
                }
              };
            }
          }
        }
        return blog;
      });
      
      state.response = action.payload.message
    });

    builder.addCase(voteBlogAsync.rejected, setError)
  },
});

export const { clearBlogResponseAndError } = BlogSlice.actions;
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectSavedBlogs = (state: RootState) => state.blogs.savedBlogs;
export const selectComments = (state: RootState) => state.blogs.comments;
export const selectResponse = (state: RootState) => state.blogs.response;
export const selectError = (state: RootState) => state.blogs.error;
export default BlogSlice.reducer