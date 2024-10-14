import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectError as selectBlogError, selectResponse as selectBlogResponse, clearBlogResponseAndError } from "../store/BlogSlice";
import { selectError as selectAuthError, selectResponse as selectAuthResponse, clearAuthResponseAndError } from "../store/AuthSlice";

import { Alert, Collapse } from "@mui/material";
import { AppDispatch } from "../store";

export default function AlertMessage() {
    const blogError = useSelector(selectBlogError);
    const authError = useSelector(selectAuthError);

    const blogResponse = useSelector(selectBlogResponse)
    const authResponse = useSelector(selectAuthResponse)

    const dispatch: AppDispatch = useDispatch();

    const [open, setOpen] = useState(!!(blogError || authError));

    useEffect(() => {
        if (blogError || authError || blogResponse || authResponse) {
            setOpen(true);

            const timer = setTimeout(() => {
                setOpen(false);
                dispatch(clearBlogResponseAndError());
                dispatch(clearAuthResponseAndError());
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setOpen(false);
        }
    }, [blogError, authError, blogResponse, authResponse, dispatch]);

    if (!open) return null;

    return (
        <Collapse in={open}>
            <Alert severity={(blogError || authError) ? "error" : "success"} sx={{ mb: 2 }}>
                {blogError || authError || blogResponse || authResponse}
            </Alert>
        </Collapse>
    );
}
