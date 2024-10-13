import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectError as selectBlogError, selectResponse as selectBlogResponse } from "../store/BlogSlice";
import { selectError as selectAuthError, selectResponse as selectAuthResponse } from "../store/AuthSlice";
import { Alert, Collapse } from "@mui/material";

export default function AlertMessage() {
    const blogError = useSelector(selectBlogError);
    const authError = useSelector(selectAuthError);

    const blogResponse = useSelector(selectBlogResponse)
    const authResponse = useSelector(selectAuthResponse)

    const [open, setOpen] = useState(!!(blogError || authError));

    useEffect(() => {
        if (blogError || authError) {
            setOpen(true);
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        } else if (blogResponse || authResponse) {
            setOpen(true);
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setOpen(false);
        }
    }, [blogError, authError, blogResponse, authResponse]);

    if (!open) return null;

    return (
        <Collapse in={open}>
            <Alert severity={(blogError || authError) ? "error" : "success"} sx={{ mb: 2 }}>
                {blogError || authError || blogResponse || authResponse}
            </Alert>
        </Collapse>
    );
}
