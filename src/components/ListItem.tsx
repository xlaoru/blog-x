import { useDispatch } from "react-redux";
import { deleteBlogAsync } from "../store/BlogSlice";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store";

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  id: string;
}

export default function ListItem({ to, title, body, id }: IListItemProps) {
  const dispatch: AppDispatch = useDispatch()

  function handleDelete() {
    const token = sessionStorage.getItem("token") ?? "";
    dispatch(deleteBlogAsync({ id, token }))
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        width: "300px",
        margin: "10px 0",
        wordWrap: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>
        <Link to={to}>{title}</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>{body} <button onClick={handleDelete}>Delete</button></div>
    </div>
  );
}
