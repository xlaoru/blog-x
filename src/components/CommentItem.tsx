import React from "react";
import { IComment } from "../store/BlogSlice";

type ICommentItemProps = Omit<IComment, "_id"> & { userName: string };

export default function CommentItem({ text, createdBy, userName }: ICommentItemProps) {
    return (
        <div>
            {text}. | Created by: <u>{isNaN(Number(createdBy)) ? createdBy : userName}</u>
        </div>
    )
}
