import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogsByTag } from "../store/BlogSlice";
import { AppDispatch } from "../store";

export default function TagFiltration() {
    const token = localStorage.getItem("token") ?? ""

    const tagList = (localStorage.getItem("tags") ?? "").split(",");

    const [tags, setTags] = useState<string[]>([])

    const [isDisabled, setDisabled] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { checked, value: tag } = event.target;

        setTags((tags) => {
            const updatedTags = checked
                ? [...tags, tag]
                : tags.filter((t) => t !== tag);

            if (token) {
                dispatch(fetchBlogsByTag(updatedTags))
                    .finally(() => setDisabled(false));
            }

            return updatedTags;
        });

        setDisabled(true);
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "12px" }}>
            {
                tagList.map((tag: string, index: number) => (
                    <label className="tag-item" key={index} style={tags.includes(tag) ? { boxShadow: "0px 0px 0px 1.5px rgba(0, 0, 0, 0.5)" } : {}}>
                        <input disabled={isDisabled} type="checkbox" value={tag} onChange={handleCheckboxChange} />
                        {tag}
                    </label>
                ))
            }
        </div>
    )
}
