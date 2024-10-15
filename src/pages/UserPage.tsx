import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "../store/AuthSlice";
import { AppDispatch } from "../store";
import List from "../components/List";

export default function UserPage() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (!user.name) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <hr style={{ color: "#121212", marginTop: "0" }} />
            <List content={user.blogs} />
        </>
    )
}
