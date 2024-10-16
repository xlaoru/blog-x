import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUser, selectUser } from "../store/AuthSlice";
import { AppDispatch } from "../store";
import List from "../components/List";
import UserForm from "../components/UserForm";

export default function UserPage() {
    const user = useSelector(selectUser)

    const [isEditing, setEditing] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    function loadData(event: any): void {
        event.preventDefault();

        const userName = event.target.elements.name.value;
        const userBio = event.target.elements.bio.value;

        dispatch(editUser({ name: userName, bio: userBio })).then(() => {
            setEditing(false);
        })
    }

    return (
        <>
            {
                user
                    ? (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <UserForm loadData={loadData} isEditing={isEditing} setEditing={setEditing} user={user} />
                        <hr style={{ borderColor: "#bbb", margin: "15px 0", width: "80%" }} />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <List content={user.blogs ? user.blogs : []} isProfile />
                        </div>
                    </div>)
                    : <p>Loading...</p>
            }
        </>
    )
}
