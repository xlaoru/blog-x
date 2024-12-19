import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { banUser, IUser, unbanUser } from "../store/AuthSlice";
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
                user.isBanned
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
