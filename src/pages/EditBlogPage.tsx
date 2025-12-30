import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import MenuPanelForm from "../components/MenuPanelForm";
import { updateBlogAsync } from "../store/BlogSlice";

import { generateLink } from "../utils/generateLink";

export default function EditBlogPage() {
    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate();

    const location = useLocation();

    const { id, title, body, content, tags } = location.state || {};

    const [value, setValue] = useState({ title, body, code: content, tags });

    function loadData(event: any): void {
        event.preventDefault();

        const title = value.title
        const body = value.body
        const link = generateLink(title)
        const code = value.code
        const tags = value.tags

        dispatch(updateBlogAsync({ id, title, body, link, code, tags })).unwrap().then(() => {
            navigate(`/blog/${link}`)
        })
    }

    return (
        <div>
            <MenuPanelForm value={value} setValue={setValue} loadData={loadData} />
        </div>
    )
}
