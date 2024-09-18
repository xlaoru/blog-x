import { useState } from "react";
import { useHttp } from "../services/useHttp";
import { useParams } from "react-router-dom";

import Form from "../components/Form";

export default function RegistrationPage() {
  const { loadingStatus, request } = useHttp();

  const { authType } = useParams();

  const [isRegistrationForm, setIsRegistrationForm] = useState<boolean>(authType === "registration");

  function loadData(event: any): void {
    event.preventDefault();

    let userName = event.target.elements.name.value;
    let userEmail = event.target.elements.email.value;
    let userPassword = event.target.elements.password.value;

    if (isRegistrationForm) {
      request({
        url: "http://localhost:3001/auth/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword, name: userName }),
      }).catch((error) => {
        console.log(error);
      })
    } else {
      request({
        url: "http://localhost:3001/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      }).then((response) => {
        const token = response.token
        sessionStorage.setItem("token", token); // const token = sessionStorage.getItem("token");
      }).catch((error) => {
        console.log(error);
      })
    }

    event.target.elements.name.value = ""
    event.target.elements.email.value = ""
    event.target.elements.password.value = ""

    // console.log(userEmail, userPassword, userName)
  }

  return (
    <Form loadData={loadData} isRegistrationForm={isRegistrationForm} setIsRegistrationForm={setIsRegistrationForm} />
  );
}