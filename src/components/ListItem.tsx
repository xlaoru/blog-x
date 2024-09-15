import { memo } from "react";
import { Link } from "react-router-dom";

import { useHttp } from "../services/useHttp";

interface IListItemProps {
  to: string;
  title: string;
  body: string;
  id: string;
}

export default memo(function ListItem({ to, title, body, id }: IListItemProps) {
  const token = sessionStorage.getItem("token");
  const { loadingStatus, request } = useHttp();

  function deleteBlog() {
    request({
      url: `http://localhost:3001/api/blogs/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })

    // window.location.reload(); // ! Bad practice
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>{body} <button onClick={deleteBlog}>Delete</button></div>
    </div>
  );
});
