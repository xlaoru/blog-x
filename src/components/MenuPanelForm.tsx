import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

type MenuPanelFormProps = {
    value: {
        title: string,
        body: string,
        code: string,
        tags: string[]
    };
    setValue: any;
    loadData: (event: any) => void;
};

export default function MenuPanelForm({ value, setValue, loadData }: MenuPanelFormProps) {
    const navigate = useNavigate()

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { checked, value: tag } = event.target;
        setValue((prevValue: any) => {
            const newTags = checked
                ? [...prevValue.tags, tag]
                : prevValue.tags.filter((t: string) => t !== tag);
            return { ...prevValue, tags: newTags };
        });
    }

    function renderTagList() {
        const tags = localStorage.getItem("tags")?.split(",") ?? []
        return tags.map(
            (item: string, index: number) => {
                return (
                    <label className="tag-item" key={index} style={value.tags?.includes(item) ? { boxShadow: "0px 0px 0px 1.5px rgba(0, 0, 0, 0.5)" } : {}}>
                        <input
                            type="checkbox"
                            value={item}
                            checked={value.tags?.includes(item)}
                            onChange={handleCheckboxChange}
                        />
                        {item}
                        <br />
                    </label>
                )
            }
        )
    }

    console.log(value);

    return (
        <div className="MenuPanelForm">
            <div className="menu-panel-header">
                <button type="button" className="img-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
            </div>
            <div className="menu-panel-container">
                <form className="menu-panel-form" onSubmit={(event): void => loadData(event)}>
                    <input value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} type="text" name="title" placeholder="Title..." />
                    <input value={value.body} onChange={(e) => setValue({ ...value, body: e.target.value })} type="text" name="body" placeholder="Body..." />
                    <RichTextEditor content={value} setContent={setValue} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                        {renderTagList()}
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
