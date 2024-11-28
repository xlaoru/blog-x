import { useRef, useMemo } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../store/AuthSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { uploadFile } from "../firebase/uploadFile";

interface IRichTextEditorProps {
    content: {
        title: string,
        body: string,
        code: string,
        tags: string[]
    };
    setContent: any;
}

export default function RichTextEditor({ content, setContent }: IRichTextEditorProps) {
    const userEmail = useSelector(selectUser).email

    const quillRef = useRef<any>();

    const handleImageUpload = () => {
        const input: HTMLInputElement = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];

                let image = ""

                try {
                    image = await uploadFile(file, `blog-image/${userEmail}/${new Date().getTime()}`)

                    const editor = quillRef.current.getEditor();
                    const range = editor.getSelection();

                    if (range) {
                        editor.focus();
                        editor.insertEmbed(range.index, "image", image);
                    }
                } catch (error) {
                    console.log("Something went wrong:", error);
                }
            }
        };

        input.click();
    };

    const handleChange = (value: string) => {
        setContent((prevContent: any) => ({ ...prevContent, code: value }));
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image"],
                ["clean"],
            ],
            handlers: {
                image: handleImageUpload,
            },
        },
    }), [])

    return (
        <ReactQuill
            ref={quillRef}
            value={content.code}
            onChange={handleChange}
            modules={modules}
            theme="snow"
            placeholder="Начните писать здесь..."
        />
    );
}
