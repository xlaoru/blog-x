import { useHttp } from "../services/useHttp";

export default function RegistrationPage() {
  const { loadingStatus, request } = useHttp();

  function loadData(event: any): void {
    // event.preventDefault();

    let userEmail = event.target.elements.email.value;
    let userPassword = event.target.elements.password.value;
    let userName = event.target.elements.name.value;

    request({
      url: "http://localhost:3001/auth/signup",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password: userPassword, name: userName }),
    });

    console.log(userEmail, userPassword, userName)
  }

  return (
    <div className="Form">
      <div className="container">
        <form onSubmit={(event): void => loadData(event)}>
          <h1>Registration</h1>
          <label>
            Email
            <input type="email" name="email" placeholder="Email..." />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="Password..." />
          </label>
          <label>
            Name
            <input type="text" name="name" placeholder="Your Name..." />
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}