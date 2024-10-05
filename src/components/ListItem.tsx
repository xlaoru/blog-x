// import { useDispatch } from "react-redux";
// import { deleteBlogAsync } from "../store/BlogSlice";
import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../store";
import { ArrowRight } from "lucide-react";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  id: string; // ! remove
}

export default function ListItem({ to, title, body, /* id */ }: IListItemProps) {
  // const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  /* function handleDelete() {
    const token = sessionStorage.getItem("token") ?? "";
    dispatch(deleteBlogAsync({ id, token }))
  } */

  return (
    <div
      style={{
        gap: "10px",
        padding: "10px",
        borderRadius: "7px",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
        width: "60%",
        margin: "10px 0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title.length > 80 ? `${title.substring(0, 80)}...` : title}</Typography> <button type="button" className="img-button"><BookmarkBorderIcon /></button>
      </div>
      <div>
        <Typography variant="body2">{body.length > 240 ? `${body.substring(0, 240)}...` : body}</Typography> {/* <button onClick={handleDelete}>Delete</button> */}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}><button type="button" className="img-button" onClick={() => navigate(`/blog/${to}`)}><ArrowRight /></button></div>
    </div>
  );
}
