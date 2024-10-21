import { useDeferredValue } from "react";

import { useSearchParams } from "react-router-dom";

import List from "../components/List";
import EmptyListPlug from "../components/EmptyListPlug";

export default function MainPage({ blogs }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
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
      {filteredContent && filteredContent.length > 0 ? (
        <List content={filteredContent} />
      ) : (
        <EmptyListPlug type="blogs" />
      )}
    </div>
  );
}
