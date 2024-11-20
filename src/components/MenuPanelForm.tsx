import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../pages/BlogPage";
import rehypeRaw from "rehype-raw";

import { ArrowLeft, BookOpen, PencilLine } from "lucide-react";

type MenuPanelFormProps = {
    value: {
        title: string,
        body: string,
        code: string,
        tags: string | string[]
    };
    setValue: any;
    loadData: (event: any) => void;
};

export default function MenuPanelForm({ value, setValue, loadData }: MenuPanelFormProps) {
    const [isEditing, setEditing] = useState(true)

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
                console.log(value.tags?.includes(item));
                return (
                    <label key={index}>
                        <input
                            disabled={!isEditing}
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

    return (
        <div className="MenuPanelForm">
            <div className="menu-panel-header">
                <button type="button" className="img-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
                {
                    isEditing
                        ? <button type="button" className="img-button" onClick={() => setEditing(false)}><BookOpen /></button>
                        : <button type="button" className="img-button" onClick={() => setEditing(true)}><PencilLine /></button>
                }
            </div>
            <div className="menu-panel-container">
                <form className="menu-panel-form" onSubmit={(event): void => loadData(event)}>
                    <input disabled={!isEditing} value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} type="text" name="title" placeholder="Title..." />
                    <input disabled={!isEditing} value={value.body} onChange={(e) => setValue({ ...value, body: e.target.value })} type="text" name="body" placeholder="Body..." />
                    {isEditing
                        ? <textarea value={value.code} onChange={(e) => setValue({ ...value, code: e.target.value })} name="code" placeholder="Code..." />
                        : (
                            <span className="code-block">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        code: ({ node, children, ...props }) => {
                                            const className = props.className as string;
                                            const language = className.replace("language-", "");
                                            return (
                                                <CodeBlock
                                                    language={language}
                                                    value={String(children).replace(/\n$/, "")}
                                                />
                                            );
                                        },
                                        img: ({ node, ...props }) => (
                                            <img {...props} style={{ width: "150px", height: "150px" }} />
                                        ),
                                    }}
                                >
                                    {value.code}
                                </ReactMarkdown>
                            </span>)
                    }
                    <div>
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
