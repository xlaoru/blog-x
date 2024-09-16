import { Link } from "react-router-dom";

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  id: string;
  handleDelete: (blogId: string) => void;
}

export default function ListItem({ to, title, body, id, handleDelete }: IListItemProps) {
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>{body} <form onSubmit={() => handleDelete(id)}><button type="submit">Delete</button></form></div>
    </div>
  );
}
