import { IComment } from "../store/BlogSlice";

type ICommentItemProps = Omit<IComment, "_id"> & { userName: string };

export default function CommentItem({ text, createdBy, userName }: ICommentItemProps) {
    return (
        <div className="Comment">
            <div className="text">{text}</div>
            <div className="created-by">Created by: <b>{isNaN(Number(createdBy)) ? createdBy : userName}</b></div>
        </div>
    )
}