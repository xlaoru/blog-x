import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type IBlogPageProps = {
    content: string;
}

interface CodeBlockProps {
    language: string;
    value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    return <div style={{maxWidth: '300px'}}><SyntaxHighlighter language={language} style={atomOneDark}>{value}</SyntaxHighlighter></div>
}

export default function BlogPage({
    content
}: IBlogPageProps) {
    return (
        <>
            <ReactMarkdown
                components={{
                    code: ({ node, children, ...props }) => {
                        const className = props.className as string;
                        const language = className.replace('language-', '');
                        return <CodeBlock language={language} value={String(children).replace(/\n$/, '')} />;
                    },
                    img: ({ node, ...props }) => <img {...props} style={{width: '150px', height: '150px'}} />,
                }}
            >
                {content}
            </ReactMarkdown>
            <Link to="/">Back</Link>
        </>
    )
}