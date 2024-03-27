import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div>
      Ooops... Here is undefinded page!
      <Link to="/">Back</Link>
    </div>
  );
}
