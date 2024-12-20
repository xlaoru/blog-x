import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { banUser, IUser, unbanUser, setAdmin, removeAdmin } from "../store/AuthSlice";
import { useState } from "react";

type IUserListItemProps = {
    user: IUser
};

export default function UserListItem({ user }: IUserListItemProps) {
    const [isDisabled, setDisabled] = useState(false)
    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            <div>{user.name} | {user.email} | {user.role} | {user._id}</div>
            {
                user.role === "OWNER"
                    ? null
                    : user.role === "USER"
                        ? <button
                            disabled={isDisabled}
                            onClick={() => {
                                setDisabled(true)
                                dispatch(setAdmin(user._id))
                                    .then(() => {
                                        setDisabled(false);
                                    })
                                    .catch(() => {
                                        setDisabled(false);
                                    })
                            }}
                        >Set as Admin</button>
                        : <button
                            disabled={isDisabled}
                            onClick={() => {
                                setDisabled(true)
                                dispatch(removeAdmin(user._id))
                                    .then(() => {
                                        setDisabled(false);
                                    })
                                    .catch(() => {
                                        setDisabled(false);
                                    })
                            }}
                        >Remove Admin</button>
            }
            {
                user.role === "OWNER"
                    ? null
                    : user.isBanned
                        ? <button disabled={isDisabled} onClick={() => {
                            setDisabled(true)
                            dispatch(unbanUser(user._id))
                                .then(() => {
                                    setDisabled(false);
                                })
                                .catch(() => {
                                    setDisabled(false);
                                })
                        }}>Unban</button>
                        : <button disabled={isDisabled} onClick={() => {
                            setDisabled(true)
                            dispatch(banUser(user._id))
                                .then(() => {
                                    setDisabled(false);
                                })
                                .catch(() => {
                                    setDisabled(false);
                                })
                        }}>Ban</button>
            }
        </>
    );
}
