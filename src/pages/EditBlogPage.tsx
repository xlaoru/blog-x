import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import MenuPanelForm from "../components/MenuPanelForm";
import { updateBlogAsync } from "../store/BlogSlice";

import { generateLink } from "../utils/generateLink";
import { selectToken } from "../store/AuthSlice";

export default function EditBlogPage() {
    const dispatch: AppDispatch = useDispatch()

    const token = useSelector(selectToken) ?? ""

    const navigate = useNavigate();

    const location = useLocation();
    const { id, title, body, content } = location.state || {};

    const [value, setValue] = useState({ title, body, code: content });

    function loadData(event: any): void {
        event.preventDefault();

        const title = value.title
        const body = value.body
        const code = value.code

        dispatch(updateBlogAsync({ id, token, title, body, link: generateLink(title), code }));

        navigate(`/`)
    }

    return (
        <div>
            <MenuPanelForm value={value} setValue={setValue} loadData={loadData} />
        </div>
    )
}
