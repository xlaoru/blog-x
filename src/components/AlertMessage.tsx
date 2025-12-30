import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Alert, Collapse } from "@mui/material";
import { AppDispatch } from "../store";
import { clearAlert, selectAlert } from "../store/AlertSlice";

export default function AlertMessage() {
    const { message, type } = useSelector(selectAlert);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            dispatch(clearAlert());
        }, 1500);

        return () => clearTimeout(timer);
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <Collapse in>
            <Alert severity={type} sx={{ mb: 2 }}>
                {message}
            </Alert>
        </Collapse>
    );
}