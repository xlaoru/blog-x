export interface IContentItem {
    title: string;
    link: string;
    code: string;
}

export const content: IContentItem[] = [
    {
        title: "Interfaces", 
        link: "interfaces",
        code: 
`
# Interface
\`\`\`typescript
interface IInterfaceName {
    type: Type
}
\`\`\`
`
    },
    {
        title: "Type Aliases", 
        link: "type+aliases",
        code: 
`
# Type Alias

\`\`\`typescript
type Type = string
\`\`\`
`
    },
    {   
        title: "Mapped Types", 
        link: "mapped+types",
        code: 
`
# Mapped Types
\`\`\`typescript
interface MappedType {
    [key: string]: Type
}
\`\`\`
`
    },
    {
        title: "Function Overload", 
        link: "function+overload",
        code: 
`
# Function Overload
\`\`\`typescript
function overload(a: number, b: number): number
\`\`\`
`
    },
    {
        title: "Data Types",
        link: "data+types",
        code:
`
# Data Types

<ul>
    <li>string</li>
    <li>number</li>
    <li>boolean</li>
    <li>any</li>
    <li>void</li>
    <li>never</li>
    <li>object</li>
    <li>array</li>
    <li>tuple</li>
    <li>enum</li>
</ul>
`
    },
]
