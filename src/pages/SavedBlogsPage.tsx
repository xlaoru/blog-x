import { useEffect } from "react";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getSavedBlogsAsync, selectSavedBlogs } from "../store/BlogSlice";
import List from "../components/List";

export default function SavedBlogsPage() {
    const dispatch: AppDispatch = useDispatch();
    const blogs = useSelector(selectSavedBlogs);

    const token = sessionStorage.getItem("token") ?? ""

    useEffect(() => {
        dispatch(getSavedBlogsAsync({ token }))
    }, [dispatch, token]);

    return <div><List content={blogs} /></div>;
}