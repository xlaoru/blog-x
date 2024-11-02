import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IBlog } from "./BlogSlice";

import api from "../utils/api";

export interface IUser {
    _id: string;
    avatar?: string
    name: string;
    bio?: string;
    email: string;
    password: string;
    role: string;
    blogs: IBlog[];
}

type UserStateSignUp = Omit<IUser, "_id" | "role" | "blogs">

export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (user: UserStateSignUp, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signup", { name: user.name, email: user.email, password: user.password })

            /* if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].msg);
            } */

            const data = await response.data;
            return data;
        } catch (error) {
            console.log("Error registering user:", error);
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
)

type UserStateLogIn = Omit<IUser, "_id" | "name" | "role" | "blogs">

export const logInUser = createAsyncThunk(
    "auth/logInUser",
    async (user: Omit<UserStateLogIn, "name">, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { email: user.email, password: user.password })

            /* if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].msg);
            } */

            const data = await response.data;
            localStorage.setItem("token", data.token);
            return data
        } catch (error) {
            console.log("Error logging in user:", error);
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get("/auth/user")

        /* if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors[0].msg);
        } */

        const data = await response.data;
        return data;
      } catch (error) {
            console.log("Error fetching user:", error);
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

type IUserEditableParams = Omit<IUser, "_id" | "email" | "password" | "role" | "blogs">

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ user }: {user: IUserEditableParams}, { rejectWithValue }) => {
    try {
        const response = await api.put("/auth/user", { name: user.name, bio: user.bio, avatar: user.avatar })

        /* if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        } */

        const data = await response.data;
        return data;
    } catch (error) {
        console.log("Error editing user:", error);
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        } else {
            return rejectWithValue("An unknown error occurred");
        }
      }
  }
);

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

const setError = (state: any, action: any) => {
    state.status = "rejected";
    state.error = action.payload
}
 
const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: { } as IUser,
        status: "idle" as LoadingStatusTypes,
        response: null,
        error: null,
    },
    reducers: {
        clearAuthResponseAndError: (state) => {
            state.response = null;
            state.error = null;
        },
        logoutUser: (state) => {
            state.user = {} as IUser;
            localStorage.removeItem("token");
            state.status = "idle";
            state.response = null;
            state.error = null;
        },
        toggleSaved: (state, action) => {
            const id = action.payload;
            const blog = state.user.blogs.find(blog => blog._id === id);
            if (blog) {
                blog.isSaved = !blog.isSaved;
            }
        },
        toggleVoted: (state, action) => {
            const { id, voteType } = action.payload;
            state.user.blogs = state.user.blogs.map((blog) => {
                if (blog._id === id) {
                    if (voteType === "upvote") {
                        return {
                            ...blog,
                            upVotes: {
                                quantity: blog.upVotes.isVoted ? blog.upVotes.quantity - 1 : blog.upVotes.quantity + 1,
                                isVoted: !blog.upVotes.isVoted
                            },
                            downVotes: {
                                quantity: blog.downVotes.isVoted ? blog.downVotes.quantity - 1 : blog.downVotes.quantity,
                                isVoted: false
                            }
                        };
                    }
                    if (voteType === "downvote") {
                        return {
                            ...blog,
                            upVotes: {
                                quantity: blog.upVotes.isVoted ? blog.upVotes.quantity - 1 : blog.upVotes.quantity,
                                isVoted: false
                            },
                            downVotes: {
                                quantity: blog.downVotes.isVoted ? blog.downVotes.quantity - 1 : blog.downVotes.quantity + 1,
                                isVoted: !blog.downVotes.isVoted
                            }
                        };
                    }
                }
                return blog;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.response = action.payload.message; 
        });

        builder.addCase(signUpUser.rejected, setError);

        builder.addCase(logInUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload.userValidData;
            state.response = action.payload.message;
        });

        builder.addCase(logInUser.rejected, setError);

        builder.addCase(getUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
          
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload.user;
            state.response = action.payload.message;
        });
        
        builder.addCase(getUser.rejected, setError);

        builder.addCase(editUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
          
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.status = "idle";

            state.user.name = action.payload.user.name
            state.user.bio = action.payload.user.bio
            state.user.avatar = action.payload.user.avatar  
      
            state.response = action.payload.message;
        });
        
        builder.addCase(editUser.rejected, setError);
    }
});

export const { clearAuthResponseAndError, logoutUser, toggleSaved, toggleVoted } = AuthSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectResponse = (state: RootState) => state.auth.response;
export const selectError = (state: RootState) => state.auth.error;
export default AuthSlice.reducer;