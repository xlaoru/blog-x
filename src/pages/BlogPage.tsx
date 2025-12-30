import { useNavigate } from "react-router-dom";

import { useWindowSequence } from "../utils/useWindowSequence";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { Typography } from "@mui/material";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { deleteBlogAsync } from "../store/BlogSlice";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

type IBlogPageProps = {
  id: string;
  title: string;
  body: string;
  content: string;
  isEditable: boolean;
  tags: string[]
};

export default function BlogPage({ id, title, body, content, isEditable, tags }: IBlogPageProps) {
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  function handleDelete() {
    dispatch(deleteBlogAsync({ id })).unwrap().then(() => {
      navigate("/")
    })
  }

  const windowWidth = useWindowSequence("innerWidth");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: windowWidth / 1.5,
      }}
    >
      <div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px"
        }}>
          <button type="button" className="img-button" onClick={() => navigate('/')}><ArrowLeft /></button>
          <Typography variant="h5">{title}</Typography>
          <span style={isEditable ? { display: "flex", gap: "12px" } : { display: "none" }}>
            <button type="button" className="img-button" onClick={() => navigate("/edit-blog", { state: { id, title, body, content, tags } })}><Pencil /></button>
            <button type="button" className="img-button" onClick={handleDelete}><Trash /></button>
          </span>
        </div>
        <hr style={{ borderColor: "#121212", marginTop: "0" }} />
      </div>
      <pre className="blog-content-wrapper" dangerouslySetInnerHTML={{ __html: content }} />
      <hr style={{ borderColor: "#121212", marginTop: "0" }} />
      <CommentForm id={id} />
      <CommentList id={id} />
    </div >
  );
}
