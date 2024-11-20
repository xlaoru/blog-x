import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogsByTag } from "../store/BlogSlice";
import { AppDispatch } from "../store";

export default function TagFiltration() {
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

            return updatedTags;
        });

        setDisabled(true);
    }

    useEffect(() => {
        dispatch(fetchBlogsByTag(tags))
            .then(() => setDisabled(false))
            .catch(() => setDisabled(false));
    }, [tags, setTags, dispatch])

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
