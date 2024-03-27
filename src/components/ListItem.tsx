import { memo } from "react";
import { Link } from "react-router-dom";

interface IListItemProps {
  to: string;
  title: string;
  body: string;
}

export default memo(function ListItem({ to, title, body }: IListItemProps) {
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
      <div>{body}</div>
    </div>
  );
});
