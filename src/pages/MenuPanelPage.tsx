import { useHttp } from "../services/useHttp";

export default function MenuPanelPage() {
  const { loadingStatus, request } = useHttp();

  const token = sessionStorage.getItem("token");

  function loadData(event: any): void {
    let title = event.target.elements.title.value;
    let body = event.target.elements.body.value;
    let link = event.target.elements.link.value;
    let code = event.target.elements.code.value;

    request({
      url: "http://localhost:3001/api/blogs",
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ title, body, link, code }),
    });
  }

  return (
    <div className="Form">
      <div className="container">
        <form onSubmit={(event): void => loadData(event)}>
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
