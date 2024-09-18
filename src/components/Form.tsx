import { useState } from "react";
import { NavLink } from "react-router-dom";

import openEye from "../assets/img/open-eye.png";
import closeEye from "../assets/img/close-eye.png";

interface IFormProps {
    loadData: (event: any) => void;
    isRegistrationForm: boolean;
    setIsRegistrationForm: (value: boolean) => void;
}

export default function Form({ loadData, isRegistrationForm, setIsRegistrationForm }: IFormProps) {
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
                            <input type={isClosed ? "password" : "text"} name="password" placeholder="Password..." className="password" /><img src={isClosed ? openEye : closeEye} onClick={() => setIsClosed(!isClosed)} />
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
