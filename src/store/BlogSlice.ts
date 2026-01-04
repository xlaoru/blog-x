import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./";

import axios from 'axios';
import api from "../utils/api";
import { showAlert } from "./AlertSlice";

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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/api/blogs")
      
      const data = response.data

      return data;
    } catch(error) {
      console.error("Error fetching blogs:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const fetchBlogsByTag = createAsyncThunk("blogs/fetchBlogsByTag",
  async (tags: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/api/blogs/tags`, { tags })
      
      const data = response.data

      return data;
    } catch(error) {
      console.error("Error fetching blogs by tags:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

type IBlogState = Omit<IBlog, "_id" | "isSaved" | "isEditable" | "upVotes" | "downVotes">

export const addBlogAsync = createAsyncThunk(
  "blogs/addBlog",
  async ({ title, body, link, code, tags }: IBlogState, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/api/blogs", { title, body, link, code, tags })

      const data = response.data

      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))

      return data;
    } catch (error) {
      console.error("Error adding blog:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const saveBlogAsync = createAsyncThunk(
  "blogs/saveBlog",
  async ({ id }: { id: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/blogs/${id}/save`)

      const data = await response.data;

      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))

      return { id, message: data.message, isSaved: data.message.includes("removed") ? false : true };
    } catch (error) {
      console.log("Error saving blog:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const getSavedBlogsAsync = createAsyncThunk(
  "blogs/getSavedBlogs",
  async(_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/api/blogs/saved')
      
      const data = await response.data

      return data
    } catch (error) {
      console.error("Error fetching saved blogs:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

type IBlogUpdateState = Omit<IBlog, "_id" | "isSaved" | "isEditable" | "upVotes" | "downVotes"> & { id: string }

export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, title, body, link, code, tags }: IBlogUpdateState, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/api/blogs/${id}`, { title, body, link, code, tags })
      
      const data = await response.data;

      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))

      return data;
    } catch (error) {
      console.error("Error updating blog:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ id }: { id: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/blogs/${id}`)

      const data = await response.data; 

      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))

      return data;
    } catch (error) {
      console.error("Error deleting blog:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
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
  async ({ id, text }: { id: string; text: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/api/blogs/${id}/comments`, { text })

      const data = await response.data;
      
      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))

      return data;
    } catch (error) {
      console.error("Error adding comment:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))
        
        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const getCommentsAsync = createAsyncThunk(
  "blogs/getComments",
  async ({ id }: { id: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`/api/blogs/${id}/comments`)

      const data = await response.data
      
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))

        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const voteBlogAsync = createAsyncThunk(
  "blogs/voteBlog",
  async ({ id, voteType }: { id: string; voteType: "upvote" | "downvote" }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/blogs/${id}/vote/${voteType}`)

      const data = await response.data;
      
      dispatch(showAlert({
        message: data.message,
        type: "success"
      }))
      
      return data;
    } catch (error) {
      console.error("Error voting blog:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;

        dispatch(showAlert({
          message: errorData.message,
          type: "error"
        }))
        
        return rejectWithValue(errorData.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
)

const setError = (state: any, action: any) => {
  state.status = "rejected";
}

const BlogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [] as IBlog[],
    savedBlogs: [] as IBlog[],
    comments: [] as IComment[],
    status: "idle" as LoadingStatusTypes,
  },
  reducers: {
    clearBlogs: (state) => {
      state.blogs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.status = "loading";
    });
    
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = action.payload.blogs;
      localStorage.setItem("tags", action.payload.tags)
    });

    builder.addCase(fetchBlogs.rejected, setError);

    builder.addCase(fetchBlogsByTag.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchBlogsByTag.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = action.payload.blogs;
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
    });

    builder.addCase(updateBlogAsync.rejected, setError);

    builder.addCase(deleteBlogAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.blogs = state.blogs.filter(blog => blog._id !== action.meta.arg.id);
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
    });

    builder.addCase(addCommentAsync.rejected, setError)

    builder.addCase(getCommentsAsync.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.comments = action.payload.comments;
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
    });

    builder.addCase(voteBlogAsync.rejected, setError)
  },
});

export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectSavedBlogs = (state: RootState) => state.blogs.savedBlogs;
export const selectComments = (state: RootState) => state.blogs.comments;
export default BlogSlice.reducer