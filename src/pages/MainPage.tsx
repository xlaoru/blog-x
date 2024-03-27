import { useState, useEffect } from "react";

import { useDeferredValue } from "react";

import { useSearchParams } from "react-router-dom";

import List from "../components/List";

export default function MainPage() {
  const [serverData, setServerData] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };

    fetchData();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredContent =
    serverData && Array.isArray(serverData)
      ? serverData.filter((item: any) =>
          item.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
        )
      : [];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchParams({ search: e.target.value })}
      />
      {serverData && <List content={filteredContent} />}
    </div>
  );
}
