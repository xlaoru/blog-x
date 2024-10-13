import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectError as selectBlogError } from "../store/BlogSlice";
import { selectError as selectAuthError } from "../store/AuthSlice";
import { Alert, Collapse } from "@mui/material";

export default function AlertMessage() {
    const blogError = useSelector(selectBlogError);
    const authError = useSelector(selectAuthError);
    const [open, setOpen] = useState(!!(blogError || authError));

    useEffect(() => {
        if (blogError || authError) {
            setOpen(true);
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setOpen(false);
        }
    }, [blogError, authError]);

    if (!open) return null;

    return (
        <Collapse in={open}>
            <Alert severity="error" sx={{ mb: 2 }}>
                {blogError || authError}
            </Alert>
        </Collapse>
    );
}
