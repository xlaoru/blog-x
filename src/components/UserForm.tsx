import React from "react";

import { IUser } from "../store/AuthSlice";

import { BookOpen, PencilLine } from "lucide-react";

type IUserFormProps = {
    user: IUser;
    loadData: (event: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
    setEditing: (value: boolean) => void;
};

export default function UserForm({ loadData, isEditing, setEditing, user }: IUserFormProps) {
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
                </form>
            </div>
        </div>
    )
}
