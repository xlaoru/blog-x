import React, { useState } from "react";

import { IUser } from "../store/AuthSlice";

import { BookOpen, PencilLine } from "lucide-react";

import defaultAvatar from "../images/default-avatar.png";

type IUserFormProps = {
    user: IUser;
    loadData: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isEditing: boolean;
    setEditing: (value: boolean) => void;
};

export default function UserForm({ loadData, isEditing, setEditing, user }: IUserFormProps) {
    const [img, setImg] = useState("");

    if (img === "" && user.avatar === "") setImg(defaultAvatar)

    return (
        <div className="UserForm">
            <div className="menu-panel-header">
                <h3 style={{ margin: "0" }}>User Form</h3>
                {
                    isEditing
                        ? <button type="button" className="img-button" onClick={() => setEditing(false)}><BookOpen /></button>
                        : <button type="button" className="img-button" onClick={() => setEditing(true)}><PencilLine /></button>
                }
            </div>
            <div className="container" style={{ height: "auto", alignItems: "flex-start" }}>
                <form onSubmit={loadData} className="user-data-form">
                    <img src={img || user.avatar} alt="avatar" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                        <span>
                            <label>
                                <input
                                    disabled={!isEditing}
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(e: any) => setImg(URL.createObjectURL(e.target.files[0]))}
                                />

                            </label>
                        </span>
                        <span>
                            <label>
                                <input disabled={!isEditing} type="text" name="name" defaultValue={user.name ?? ""} />
                            </label>
                        </span>
                        <span>
                            <label>
                                <textarea disabled={!isEditing} name="bio" placeholder={user.bio === "" ? "You have no bio." : ""} defaultValue={user.bio ?? ""} />
                            </label>
                        </span>
                        {
                            isEditing && <button type="submit" className="submit-button">Submint</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
