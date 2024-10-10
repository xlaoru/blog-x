import { useDispatch } from "react-redux";
import { saveBlogAsync } from "../store/BlogSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { ArrowRight } from "lucide-react";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  isSaved: boolean;
  id: string;
}

function BookmarkButton({ isSaved }: { isSaved: boolean }) {
  return (
    <>
      {
        isSaved
          ? <BookmarkIcon />
          : <BookmarkBorderIcon />
      }
    </>
  )
}

export default function ListItem({ to, title, body, isSaved, id }: IListItemProps) {
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  function handleSave() {
    const token = sessionStorage.getItem("token") ?? "";
    dispatch(saveBlogAsync({ id, token }))
  }

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
        <Typography variant="h6">{title.length > 80 ? `${title.substring(0, 80)}...` : title}</Typography>
        <button type="button" className="img-button" onClick={handleSave}><BookmarkButton isSaved={isSaved} /></button>
      </div>
      <div>
        <Typography variant="body2">{body.length > 240 ? `${body.substring(0, 240)}...` : body}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}><button type="button" className="img-button" onClick={() => navigate(`/blog/${to}`)}><ArrowRight /></button></div>
    </div>
  );
}
