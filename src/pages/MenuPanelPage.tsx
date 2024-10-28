import { useDispatch, useSelector } from "react-redux";
import { addBlogAsync } from "../store/BlogSlice";
import { AppDispatch } from "../store";
import MenuPanelForm from "../components/MenuPanelForm";

import { generateLink } from "../utils/generateLink";

import { useState } from "react";
import { selectToken } from "../store/AuthSlice";

export default function MenuPanelPage() {
  const dispatch: AppDispatch = useDispatch()
  const token = useSelector(selectToken) ?? "";

  const [value, setValue] = useState<{
    title: string;
    body: string;
    code: string;
  }>({
    title: "New Blog",
    body: "",
    code: "**Hello World!**",
  })

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
      <MenuPanelForm value={value} setValue={setValue} loadData={loadData} />
    </>
  );
}
