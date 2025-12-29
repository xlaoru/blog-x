import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getUsers, selectUsers } from "../store/AuthSlice";

import UserList from "../components/UserList";

export default function AdminPage() {
    const token = localStorage.getItem("token") ?? ""

    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(selectUsers)

    useEffect(() => {
        if (token) {
            dispatch(getUsers())
        }
    }, [dispatch])

    return <div style={{ display: "flex", justifyContent: "center" }}><UserList users={users} /></div>;
}
