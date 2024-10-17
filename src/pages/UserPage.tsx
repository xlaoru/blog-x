import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUser, selectUser } from "../store/AuthSlice";
import { AppDispatch } from "../store";
import List from "../components/List";
import UserForm from "../components/UserForm";

import { uploadFile } from "../firebase/uploadFile";

export default function UserPage() {
    const user = useSelector(selectUser)

    const [isEditing, setEditing] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    async function loadData(event: any): Promise<void> {
        event.preventDefault();

        const userName = event.target.elements.name.value;
        const userBio = event.target.elements.bio.value;
        const userAvatar = event.target.elements.avatar.files[0];

        try {
            let userAvatarUrl = ""

            if (userAvatar !== undefined) {
                userAvatarUrl = await uploadFile(userAvatar, `user/${user._id}/${new Date().getTime()}`) ?? "";
            }

            dispatch(editUser({ name: userName, bio: userBio, avatar: userAvatarUrl })).then(() => {
                setEditing(false);
            });
        } catch (error) {
            console.error("Error uploading file:", error);
        }
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
