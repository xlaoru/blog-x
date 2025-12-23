import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/AuthSlice";

const AuthRedirect = () => {
    const user = useSelector(selectUser)
    const token = localStorage.getItem("token") ?? "";

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [user, token, navigate]);

    return null;
};

export default AuthRedirect;
