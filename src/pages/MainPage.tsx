import { useState, useEffect } from "react";

import { useDeferredValue } from "react";

import { useSearchParams } from "react-router-dom";

import List from "../components/List";

import { useHttp } from "../services/useHttp";

interface IMainPageProps {
  handleDelete: (blogId: string) => void;
}

export default function MainPage({ handleDelete }: IMainPageProps) {
  const [serverData, setServerData] = useState<any>("");
  const { loadingStatus, request } = useHttp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request({
          url: "http://localhost:3001/api/blogs",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        setServerData(data);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };

    fetchData();
  }, [request]);

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
      {loadingStatus === "idle" ? (
        <List content={filteredContent} handleDelete={handleDelete} />
      ) : (
        <div className="container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
