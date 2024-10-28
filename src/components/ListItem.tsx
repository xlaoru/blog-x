import { useDispatch, useSelector } from "react-redux";
import { saveBlogAsync, voteBlogAsync } from "../store/BlogSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { ChevronRight } from "lucide-react";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { selectToken, toggleSaved, toggleVoted } from "../store/AuthSlice";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  isSaved: boolean;
  id: string;
  isProfile?: true
  upVotes: {
    quantity: number;
    isVoted: boolean;
  };
  downVotes: {
    quantity: number;
    isVoted: boolean;
  }
}

function BookmarkButton({ isSaved }: { isSaved: boolean }) {
  return isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />;
}

function ThumbUpButton({ isVoted }: { isVoted: boolean }) {
  return isVoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />;
}

function ThumbDownButton({ isVoted }: { isVoted: boolean }) {
  return isVoted ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />
}

export default function ListItem({ to, title, body, isSaved, id, isProfile, upVotes, downVotes }: IListItemProps) {
  const dispatch: AppDispatch = useDispatch()

  const token = useSelector(selectToken) ?? ""

  const navigate = useNavigate()

  function handleSave() {
    if (isProfile) {
      dispatch(toggleSaved(id))
    }
    dispatch(saveBlogAsync({ id, token }))
  }

  function handleVote(voteType: "upvote" | "downvote") {
    if (isProfile) {
      dispatch(toggleVoted({ id, voteType }))
    }
    dispatch(voteBlogAsync({ id, token, voteType }))
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="img-button" onClick={() => handleVote("upvote")} style={{ fontSize: "16px" }}><ThumbUpButton isVoted={upVotes.isVoted} /> {upVotes.quantity}</button>
          <button type="button" className="img-button" onClick={() => handleVote("downvote")} style={{ fontSize: "16px" }}><ThumbDownButton isVoted={downVotes.isVoted} /> {downVotes.quantity}</button>
        </div>
        <button type="button" className="img-button" onClick={() => navigate(`/blog/${to}`)}><ChevronRight /></button>
      </div>
    </div>
  );
}
