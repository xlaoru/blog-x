import {
    Link,
} from "react-router-dom";
  
const data = [
    {title: "Interfaces", link: "interfaces"},
    {title: "Type Aliases", link: "type+aliases"},
    {title: "Mapped Types", link: "mapped+types"},
    {title: "Function Overload", link: "function+overload"},
]

  type IMainPageProps = {}


export default function MainPage({}: IMainPageProps) {
  return (
    <>
        {
            data.map((item) => {
            const link = "/" + item.link
            return <Link to={link}>{item.title}</Link>
            })
        }
    </>
  )
}