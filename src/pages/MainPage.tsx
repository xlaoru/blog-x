import {
  Link,
} from "react-router-dom";
  
import { content } from "../assets/content";

type IMainPageProps = {}


export default function MainPage({}: IMainPageProps) {
  return (
    <>
        {
          content.map((item) => {
            const link = "/" + item.link
            return <Link key={item.title} to={link}>{item.title}</Link>
          })
        }
    </>
  )
}