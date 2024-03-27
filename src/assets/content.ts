export interface IContentItem {
  title: string;
  body: string;
  link: string;
  code: string;
}

export const content: IContentItem[] = [
  {
    title: "Interfaces",
    body: `Interfaces are used to describe the shape of an object`,
    link: "interfaces",
    code: `
# Interface
\`\`\`typescript
interface IInterfaceName {
    type: Type
}
\`\`\`
`,
  },
  {
    title: "Type Aliases",
    body: "Type aliases are used to describe the shape of an object",
    link: "type+aliases",
    code: `
# Type Alias

\`\`\`typescript
type Type = string
\`\`\`
`,
  },
  {
    title: "Mapped Types",
    body: "Mapped types are used to describe the shape of an object",
    link: "mapped+types",
    code: `
# Mapped Types
\`\`\`typescript
interface MappedType {
    [key: string]: Type
}
\`\`\`
`,
  },
  {
    title: "Function Overload",
    body: "Function overload is used to describe the shape of an object",
    link: "function+overload",
    code: `
# Function Overload
\`\`\`typescript
function overload(a: number, b: number): number
\`\`\`
`,
  },
  {
    title: "Data Types",
    body: "Data types are used to describe the shape of an object",
    link: "data+types",
    code: `
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
`,
  },
  {
    title: "Test Code Block",
    body: "Test Code Block",
    link: "test+code+block",
    code: `
\`\`\`ssh
npx create-react-app my-app
\`\`\`
`,
  },
];

// ! Performance testing
for (let i = 1; i <= 10000; i++) {
  content.push({
    title: `Title ${i}`,
    body: `Body ${i}`,
    link: `title-${i}`,
    code: `Code ${i}`,
  });
}
