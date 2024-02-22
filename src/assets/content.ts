export const content = [
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
]