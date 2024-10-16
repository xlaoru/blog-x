import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Eye } from "lucide-react";
import { EyeOff } from 'lucide-react';

interface IFormProps {
    loadData: (event: any) => void;
    isRegistrationForm: boolean;
    setIsRegistrationForm: (value: boolean) => void;
}

function EyeButton({ isClosed, setIsClosed }: { isClosed: boolean, setIsClosed: (value: boolean) => void }) {
    return (
        <span style={{
            cursor: "pointer",
            width: "20px",
            height: "20px",
            marginRight: "0.5rem",
            display: "flex",
            alignItems: "center",
        }}>
            {
                isClosed
                    ? <button type="button" className="img-button" onClick={() => setIsClosed(false)}><Eye /></button>
                    : <button type="button" className="img-button" onClick={() => setIsClosed(true)}><EyeOff /></button>
            }
        </span>
    )
}

export default function AuthForm({ loadData, isRegistrationForm, setIsRegistrationForm }: IFormProps) {
    const [isClosed, setIsClosed] = useState<boolean>(true)
    return (
        <div className="Form">
            <div className="container">
                <form className="form" onSubmit={(event): void => loadData(event)}>
                    <h1>{isRegistrationForm ? "Registration" : "Log in"}</h1>
                    <span style={{ display: isRegistrationForm ? "block" : "none" }}>
                        <label>
                            Name
                            <input type="text" name="name" placeholder="Your Name..." />
                        </label>
                    </span>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="Email..." />
                    </label>
                    <label>
                        Password
                        <div className="input-box">
                            <input type={isClosed ? "password" : "text"} name="password" placeholder="Password..." className="password" /><EyeButton isClosed={isClosed} setIsClosed={setIsClosed} />
                        </div>
                    </label>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    <p className="terms" style={{ display: isRegistrationForm ? "block" : "none" }}>
                        Already have an account? <NavLink to="/login" onClick={() => setIsRegistrationForm(false)}>Log in</NavLink>
                    </p>
                    <p className="terms" style={{ display: !isRegistrationForm ? "block" : "none" }}>
                        Don't have an account? <NavLink to="/registration" onClick={() => setIsRegistrationForm(true)}>Sign up</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}