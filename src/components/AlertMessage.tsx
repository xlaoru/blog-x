import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectError as selectBlogError, selectResponse as selectBlogResponse, clearBlogResponseAndError } from "../store/BlogSlice";
import { selectError as selectAuthError, selectResponse as selectAuthResponse, clearAuthResponseAndError } from "../store/AuthSlice";

import { Alert, Collapse } from "@mui/material";
import { AppDispatch } from "../store";

export default function AlertMessage() {
    const blogError = useSelector(selectBlogError);
    const authError = useSelector(selectAuthError);
    const blogResponse = useSelector(selectBlogResponse)
    const authResponse = useSelector(selectAuthResponse);

    const dispatch: AppDispatch = useDispatch();

    const message = blogError || authError || blogResponse || authResponse;

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            dispatch(clearBlogResponseAndError());
            dispatch(clearAuthResponseAndError());
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <Collapse in>
            <Alert severity={(blogError || authError) ? "error" : "success"} sx={{ mb: 2 }}>
                {message}
            </Alert>
        </Collapse>
    );
}
