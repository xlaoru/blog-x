import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "../store/AuthSlice";
import { AppDispatch } from "../store";

export default function UserPage() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (!user.name) {
        return <div>Loading...</div>;
    }

    return <div>
        <ul>
            <li>User name: {user.name}</li>
            <li>User email: {user.email}</li>
            <li>Amount of user blogs: {user.blogAmount}</li>
        </ul>
    </div>;
}
