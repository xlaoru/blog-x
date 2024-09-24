import { useDispatch } from "react-redux";
import { addBlogAsync } from "../store/BlogSlice";
import { AppDispatch } from "../store";
import MenuPanelForm from "../components/MenuPanelForm";

import { generateLink } from "../utils/generateLink";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, BookOpen, PencilLine } from "lucide-react";
import { useState } from "react";

export default function MenuPanelPage() {
  const dispatch: AppDispatch = useDispatch()
  const token = sessionStorage.getItem("token") ?? "";

  const [isEditing, setEditing] = useState(true)
  const [value, setValue] = useState<{
    title: string;
    body: string;
    code: string;
  }>({
    title: "New Blog",
    body: "",
    code: "**Hello World!**",
  })

  const navigate = useNavigate()

  function goMainPage() {
    navigate("/")
  }

  function loadData(event: any): void {
    event.preventDefault();

    const link = generateLink(value.title);

    const title = value.title
    const body = value.body
    const code = value.code

    dispatch(addBlogAsync({ token, title, body, link, code }));

    setValue({
      title: "",
      body: "",
      code: "",
    });
  }

  return (
    <>
      <div className="menu-panel-footer">
        <ArrowLeft onClick={goMainPage} style={{ cursor: "pointer" }} />
        {
          isEditing
            ? <BookOpen onClick={() => setEditing(false)} style={{ cursor: "pointer" }} />
            : <PencilLine onClick={() => setEditing(true)} style={{ cursor: "pointer" }} />
        }
      </div>
      <MenuPanelForm value={value} setValue={setValue} loadData={loadData} isEditing={isEditing} />
    </>
  );
}
