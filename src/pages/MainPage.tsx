import { useDeferredValue, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import List from "../components/List";
import EmptyListPlug from "../components/EmptyListPlug";
import TagFiltration from "../components/TagFiltration";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchBlogs } from "../store/BlogSlice";

export default function MainPage({ blogs }: any) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const deferredSearchQuery = useDeferredValue(searchQuery) ?? "";

  const filteredContent =
    blogs && Array.isArray(blogs)
      ? blogs.filter((item: any) =>
        item.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
      )
      : [];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TagFiltration />
      {filteredContent && filteredContent.length > 0 ? (
        <List content={filteredContent} />
      ) : (
        <EmptyListPlug type="blogs" />
      )}
    </div>
  );
}
