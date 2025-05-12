import { Middleware } from "@reduxjs/toolkit";
import { setUser, setUsers, clearUsers, getUsers, updateUserPermissionsStatus, addNewUser } from "./AuthSlice";

export const authMiddleware: Middleware = store => next => action => {
    if (updateUserPermissionsStatus.fulfilled.match(action)) {
        const { userId, changes } = action.payload;
        const currentUser = store.getState().auth.user;

        if (currentUser._id === userId) {
            store.dispatch(setUser(changes));
        }

        const updatedCurrentUser = store.getState().auth.user; 

        if (updatedCurrentUser._id === userId) {
            if (changes.isBanned || changes.role === "USER") {
                store.dispatch(clearUsers());
            }

            if (changes.role !== "USER" && !changes.isBanned) {
                const users = store.getState().auth.users;
                if (users.length > 0) { 
                    const updatedUsers = users.map((user: any) => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                isAdminOrOwner: changes.isAdminOrOwner,
                                isBanned: changes.isBanned,
                                role: changes.role,
                            };
                        }
                        return user;
                    });
                    store.dispatch(setUsers(updatedUsers));
                } else {
                    store.dispatch<any>(getUsers());
                }
            }
        }

        const hasSpecialPermissions = updatedCurrentUser.role !== "USER" && !updatedCurrentUser.isBanned;

        if (hasSpecialPermissions) { 
            const users = store.getState().auth.users;

            if (users.length > 0) {
                const updatedUsers = users.map((user: any) => {
                    if (user._id === userId) {
                        return {
                            ...user,
                            isAdminOrOwner: changes.isAdminOrOwner,
                            isBanned: changes.isBanned,
                            role: changes.role,
                        };
                    }
                    return user;
                });

                store.dispatch(setUsers(updatedUsers));
            }
        }
    }

    if (addNewUser.fulfilled.match(action)) {
        const currentUser = store.getState().auth.user;
        
        const hasSpecialPermissions = currentUser.role !== "USER" && !currentUser.isBanned;

        if (hasSpecialPermissions) {
            const users = store.getState().auth.users;
            const exists = users.some((u: any) => u._id === action.payload._id);

            if (!exists) {                
                store.dispatch(setUsers([...users, action.payload]));
            }
        }
    }
    
    return next(action);
};