import { useDispatch } from "react-redux";
import { addBlogAsync } from "../store/BlogSlice";
import { AppDispatch } from "../store";

export default function MenuPanelPage() {
  const dispatch: AppDispatch = useDispatch()
  const token = sessionStorage.getItem("token") ?? "";

  function loadData(event: any): void {
    event.preventDefault();

    let title = event.target.elements.title.value;
    let body = event.target.elements.body.value;
    let link = event.target.elements.link.value;
    let code = event.target.elements.code.value;

    dispatch(addBlogAsync({ token, title, body, link, code }));

    event.target.elements.title.value = "";
    event.target.elements.body.value = "";
    event.target.elements.link.value = "";
    event.target.elements.code.value = "";
  }

  return (
    <div className="Form">
      <div className="container">
        <form className="form" onSubmit={(event): void => loadData(event)}>
          <h1>Menu Panel</h1>
          <label>
            Title
            <input type="text" name="title" placeholder="Title..." />
          </label>
          <label>
            Body
            <input type="text" name="body" placeholder="Body..." />
          </label>
          <label>
            Link
            <input type="text" name="link" placeholder="Link..." />
          </label>
          <label>
            Code
            <textarea name="code" placeholder="Code..." />
          </label>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
