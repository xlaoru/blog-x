import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IBlog } from "./BlogSlice";

import axios from 'axios';
import api from "../utils/api";
import { showAlert } from "./AlertSlice";

export interface IUser {
    _id: string;
    isAdminOrOwner?: boolean;
    avatar?: string
    name: string;
    bio?: string;
    email: string;
    password: string;
    role: string;
    blogs: IBlog[];
    isBanned?: boolean;
}

type UserStateSignUp = Omit<IUser, "_id" | "role" | "blogs">

export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (user: UserStateSignUp, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signup", { name: user.name, email: user.email, password: user.password })
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))
                
            return data;
        } catch (error) {
            console.log("Error registering user:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
                
                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))

                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

type UserStateLogIn = Omit<IUser, "_id" | "name" | "role" | "blogs">

export const logInUser = createAsyncThunk(
    "auth/logInUser",
    async (user: Omit<UserStateLogIn, "name">, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { email: user.email, password: user.password })
            
            const data = await response.data;
            localStorage.setItem("token", data.token);
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))

            return data
        } catch (error) {
            console.log("Error logging in user:", error);

            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
            
                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))

                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

export const getUsers = createAsyncThunk(
    "auth/getUsers",
    async(_, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.get("/auth/users")
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))
            
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;
                
                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))

                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const response = await api.get("/auth/user")
        
        const data = await response.data;
            
        dispatch(showAlert({
            message: data.message,
            type: "success"
        }))
        
        return data;
      } catch (error) {
            console.log("Error fetching user:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;

                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))

                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const updateUserPermissionsStatus = createAsyncThunk(
    "auth/updateUserPermissionsStatus",
    async (payload: { userId: string, changes: { isBanned: boolean, isAdminOrOwner: boolean, role: string } }) => {
        return payload;
    }
);

export const addNewUser = createAsyncThunk(
    "auth/addNewUser",
    async (payload: any) => {
        return payload
    }
)

type IUserEditableParams = Omit<IUser, "_id" | "email" | "password" | "role" | "blogs">

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ user }: {user: IUserEditableParams}, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.put("/auth/user", { name: user.name, bio: user.bio, avatar: user.avatar })
        
        const data = await response.data;
            
        dispatch(showAlert({
            message: data.message,
            type: "success"
        }))

        return data;
    } catch (error) {
        console.log("Error editing user:", error);
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;

            dispatch(showAlert({
                message: errorData.message,
                type: "error"
            }))


            return rejectWithValue(errorData);
        } else {
            return rejectWithValue('An unknown error occurred');
        }
      }
  }
);

export const banUser = createAsyncThunk(
    "auth/banUser",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/auth/user/ban/${id}`)
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))
            
            return data;
        } catch (error) {
            console.log("Error banning user:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;

                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))

                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

export const unbanUser = createAsyncThunk(
    "auth/unbanUser",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/auth/user/unban/${id}`)
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))

            return data;
        } catch (error) {
            console.log("Error unbanning user:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;

                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))


                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

export const setAdmin = createAsyncThunk(
    "auth/setAdmin",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/auth/user/set-admin/${id}`)
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))
            
            return data;
        } catch (error) {
            console.log("Error setting user as admin:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;

                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))


                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

export const removeAdmin = createAsyncThunk(
    "auth/removeAdmin",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/auth/user/remove-admin/${id}`)
            
            const data = await response.data;
            
            dispatch(showAlert({
                message: data.message,
                type: "success"
            }))
            
            return data;
        } catch (error) {
            console.log("Error removing user as admin:", error);
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data;

                dispatch(showAlert({
                    message: errorData.message,
                    type: "error"
                }))


                return rejectWithValue(errorData);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

const setError = (state: any, action: any) => {
    state.status = "rejected";
    state.user.isAdminOrOwner = action.payload.isAdminOrOwner
    state.user.role = action.payload.userRole
}

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: { } as IUser,
        users: [] as IUser[],
        status: "idle" as LoadingStatusTypes,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            }
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        clearUsers: (state) => {
            state.users = []
        },
        logoutUser: (state) => {
            state.user = {} as IUser;
            state.users = [] as IUser[];
            localStorage.removeItem("token");
            state.status = "idle";
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
        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.status = "idle";
        });

        builder.addCase(signUpUser.rejected, setError);

        builder.addCase(logInUser.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload.userValidData;
        });

        builder.addCase(logInUser.rejected, setError);

        builder.addCase(getUsers.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload.userValidData;
            state.users = action.payload.users;
        });

        builder.addCase(getUsers.rejected, setError);

        builder.addCase(getUser.pending, (state) => {
            state.status = "loading";
        });
          
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload.userValidData;
        });
        
        builder.addCase(getUser.rejected, setError);

        builder.addCase(editUser.pending, (state) => {
            state.status = "loading";
        });
          
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.status = "idle";

            state.user.name = action.payload.user.name
            state.user.bio = action.payload.user.bio
            state.user.avatar = action.payload.user.avatar  
        });
        
        builder.addCase(editUser.rejected, setError);

        builder.addCase(banUser.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(banUser.fulfilled, (state, action) => {
            state.status = "idle";
        
            state.users = state.users.map((user) => {
                if (user._id === action.meta.arg) {
                    return {
                        ...user,
                        isBanned: true
                    };
                }
                return user;
            });
        });

        builder.addCase(banUser.rejected, setError);

        builder.addCase(unbanUser.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(unbanUser.fulfilled, (state, action) => {
            state.status = "idle";
        
            state.users = state.users.map((user) => {
                if (user._id === action.meta.arg) {
                    return {
                        ...user,
                        isBanned: false
                    };
                }
                return user;
            });
        });

        builder.addCase(unbanUser.rejected, setError);

        builder.addCase(setAdmin.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(setAdmin.fulfilled, (state, action) => {
            state.status = "idle";

            state.users = state.users.map((user) => {
                if (user._id === action.meta.arg) {

                    return {
                        ...user,
                        isAdminOrOwner: true,
                        role: "ADMIN"
                    };
                }
                return user;
            });
        });

        builder.addCase(setAdmin.rejected, setError);

        builder.addCase(removeAdmin.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(removeAdmin.fulfilled, (state, action) => {
            state.status = "idle";

            state.users = state.users.map((user) => {
                if (user._id === action.meta.arg) {
                    return {
                        ...user,
                        isAdminOrOwner: false,
                        role: "USER"
                    };
                }
                return user;
            });
        });

        builder.addCase(removeAdmin.rejected, setError);
    }
});

export const { setUser, setUsers, clearUsers, logoutUser, toggleSaved, toggleVoted } = AuthSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUsers = (state: RootState) => state.auth.users;

export default AuthSlice.reducer;