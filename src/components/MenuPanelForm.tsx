import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../pages/BlogPage";
import rehypeRaw from "rehype-raw";

type MenuPanelFormProps = {
    value: {
        title: string,
        body: string,
        code: string
    };
    setValue: any;
    loadData: (event: any) => void;
    isEditing: boolean
};

export default function MenuPanelForm({ value, setValue, loadData, isEditing }: MenuPanelFormProps) {
    return (
        <div className="MenuPanelForm">
            <div className="menu-panel-container">
                <form className="menu-panel-form" onSubmit={(event): void => loadData(event)}>
                    {
                        isEditing
                            ? <input value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} type="text" name="title" placeholder="Title..." />
                            : <div className="info-block">{value.title}</div>
                    }
                    {
                        isEditing
                            ? <input value={value.body} onChange={(e) => setValue({ ...value, body: e.target.value })} type="text" name="body" placeholder="Body..." />
                            : <div className="info-block">{value.body}</div>
                    }
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
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
