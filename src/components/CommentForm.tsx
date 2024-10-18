import React from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

import { addCommentAsync } from "../store/BlogSlice"

interface ICommmentProps {
    id: string;
};

export default function CommentForm({ id }: ICommmentProps) {
    const dispatch: AppDispatch = useDispatch()

    const token = sessionStorage.getItem("token") ?? ""

    function handleAddComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const comment = e.currentTarget.comment.value

        dispatch(addCommentAsync({ id, token, text: comment }))

        e.currentTarget.comment.value = ""
    }

    return (
        <div className="Form">
            <div className="container" style={{ height: "auto" }}>
                <form className="form" style={{ width: "100%" }} onSubmit={handleAddComment}>
                    <label htmlFor="comment">Comment
                        <textarea name="comment" id="comment" placeholder="Comment" required />
                    </label>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div >
    )
}
