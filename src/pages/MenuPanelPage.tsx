import { useDispatch } from "react-redux";
import { addBlogAsync } from "../store/BlogSlice";
import { AppDispatch } from "../store";
import MenuPanelForm from "../components/MenuPanelForm";

import { generateLink } from "../utils/generateLink";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuPanelPage() {
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  const [value, setValue] = useState<{
    title: string;
    body: string;
    code: string;
    tags: string[]
  }>({
    title: "New Blog",
    body: "",
    code: "Hello World!",
    tags: []
  })

  function loadData(event: any): void {
    event.preventDefault();

    const link = generateLink(value.title);

    const title = value.title
    const body = value.body
    const code = value.code
    const tags = value.tags

    dispatch(addBlogAsync({ title, body, link, code, tags }))
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        navigate("/")
      })

    setValue({
      title: "",
      body: "",
      code: "",
      tags: []
    });
  }

  return (
    <>
      <MenuPanelForm value={value} setValue={setValue} loadData={loadData} />
    </>
  );
}
