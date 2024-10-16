import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IBlog } from "./BlogSlice";

export interface IUser {
    _id: string;
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
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].msg);
            }

            const data = await response.json();

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
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].msg);
            }

            const data = await response.json();

            sessionStorage.setItem("token", data.token);

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
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:3001/auth/user", {
          method: "GET",
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
  async (user: IUserEditableParams, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
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
            state.status = "idle";
            state.response = null;
            state.error = null;
            sessionStorage.removeItem("token");
        },
        toggleSaved: (state, action) => {
            const id = action.payload;
            const blog = state.user.blogs.find(blog => blog._id === id);
            if (blog) {
                blog.isSaved = !blog.isSaved;
            }
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

            state.user.name = action.payload.user.name;
            state.user.bio = action.payload.user.bio;

            state.response = action.payload.message;
        });
        
        builder.addCase(editUser.rejected, setError);
    }
});

export const { clearAuthResponseAndError, logoutUser, toggleSaved } = AuthSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectResponse = (state: RootState) => state.auth.response;
export const selectError = (state: RootState) => state.auth.error;
export default AuthSlice.reducer;