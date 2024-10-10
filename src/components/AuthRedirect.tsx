import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchBlogs } from "../store/BlogSlice";
import { selectUser } from "../store/AuthSlice";

const AuthRedirect = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const userToken = sessionStorage.getItem("token");

        if (!userToken) {
            navigate("/login");
        } else {
            dispatch(fetchBlogs());
        }
    }, [dispatch, user, navigate]);

    return null;
};

export default AuthRedirect;
