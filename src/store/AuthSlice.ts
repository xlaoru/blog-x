import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    blogs: string[];
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

type LoadingStatusTypes = 'idle' | 'loading' | 'error'

const setError = (state: any, action: any) => {
    state.status = "rejected";
    state.error = action.payload
}
 
const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: {} as IUser,
        status: "idle" as LoadingStatusTypes,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload; 
        });

        builder.addCase(signUpUser.rejected, setError);

        builder.addCase(logInUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        });

        builder.addCase(logInUser.rejected, setError);
    }
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export default AuthSlice.reducer;