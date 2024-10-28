import { useEffect } from "react";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getSavedBlogsAsync, selectSavedBlogs } from "../store/BlogSlice";
import List from "../components/List";
import EmptyListPlug from "../components/EmptyListPlug";
import { selectToken } from "../store/AuthSlice";

export default function SavedBlogsPage() {
    const dispatch: AppDispatch = useDispatch();
    const blogs = useSelector(selectSavedBlogs);

    const token = useSelector(selectToken) ?? ""

    useEffect(() => {
        dispatch(getSavedBlogsAsync({ token }))
    }, [dispatch, token]);

    return (
        <>
            {
                blogs && blogs.length > 0 ? (
                    <List content={blogs} />
                ) : (
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <EmptyListPlug type="saved blogs" />
                    </div>
                )
            }
        </>
    );
}
