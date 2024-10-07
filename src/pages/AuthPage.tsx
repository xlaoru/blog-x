import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { logInUser, signUpUser } from "../store/AuthSlice";
import { AppDispatch } from "../store";
import { ArrowLeft } from "lucide-react";

type RegistrationPageProps = {
  authType: string
}

export default function RegistrationPage({ authType }: RegistrationPageProps) {
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate();

  const [isRegistrationForm, setIsRegistrationForm] = useState<boolean>(authType === "registration");

  function loadData(event: any): void {
    event.preventDefault();

    let userName = event.target.elements.name.value;
    let userEmail = event.target.elements.email.value;
    let userPassword = event.target.elements.password.value;

    if (isRegistrationForm) {
      dispatch(signUpUser({ name: userName, email: userEmail, password: userPassword }))
    } else {
      dispatch(logInUser({ email: userEmail, password: userPassword }))
    }

    event.target.elements.name.value = ""
    event.target.elements.email.value = ""
    event.target.elements.password.value = ""
  }

  return (
    <div style={{ padding: "12px 24px" }}>
      <button type="button" className="img-button" onClick={() => navigate(-1)}><ArrowLeft /></button>
      <Form loadData={loadData} isRegistrationForm={isRegistrationForm} setIsRegistrationForm={setIsRegistrationForm} />
    </div>
  );
}