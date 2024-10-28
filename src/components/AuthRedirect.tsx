import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchBlogs } from "../store/BlogSlice";
import { selectUser, selectToken } from "../store/AuthSlice";

const AuthRedirect = () => {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            dispatch(fetchBlogs(token));
        }
    }, [dispatch, user, token, navigate]);

    return null;
};

export default AuthRedirect;
