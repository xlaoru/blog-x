import React, { useEffect } from "react";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsAsync, selectComments } from "../store/BlogSlice";

import CommentItem from "./CommentItem";
import { selectUser } from "../store/AuthSlice";
import EmptyListPlug from "./EmptyListPlug";

interface ICommentListProps {
    id: string
};

export default function CommentList({ id }: ICommentListProps) {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector(selectUser)
    const comments = useSelector(selectComments)

    const token = sessionStorage.getItem("token") ?? ""

    useEffect(() => {
        if (token) {
            dispatch(getCommentsAsync({ id, token }))
        }
    }, [dispatch, id, token])

    return (
        <div>
            {comments && comments.length > 0
                ? comments.map((comment, index) => <span key={index}><CommentItem text={comment.text} createdBy={comment.createdBy} userName={user.name ? user.name : ""} /></span>)
                : <div style={{ display: "flex", justifyContent: "center" }}><EmptyListPlug type="comments" /></div>
            }
        </div>
    )
}
