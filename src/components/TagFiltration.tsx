import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogsByTag } from "../store/BlogSlice";
import { AppDispatch } from "../store";

export default function TagFiltration() {
    const tagList = (localStorage.getItem("tags") ?? "").split(",");

    const tags = [] as string[];

    const [isDisabled, setDisabled] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { checked, value: tag } = event.target;

        const updatedTags = checked
            ? [...tags, tag]
            : tags.filter((t) => t !== tag);

        setDisabled(true);
        dispatch(fetchBlogsByTag(updatedTags))
            .then(() => setDisabled(false))
            .catch(() => setDisabled(false));
    }

    return (
        <>
            {
                tagList.map((tag: string, index: number) => (
                    <label key={index} style={{ padding: "5px" }}>
                        <input disabled={isDisabled} type="checkbox" value={tag} onChange={handleCheckboxChange} />
                        {tag}
                    </label>

                ))
            }
        </>
    )
}
