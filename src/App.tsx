import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import Error404Page from "./pages/Error404Page";
import MenuPanelPage from "./pages/MenuPanelPage";
import AuthPage from "./pages/AuthPage";

import { useHttp } from "./services/useHttp";

import "./styles/App.css";

function App() {
  const [serverData, setServerData] = useState<any>([]);
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

  const handleDelete = async (blogId: string) => {
    try {
      await request({
        url: `http://localhost:3001/api/blogs/${blogId}`,
        method: "DELETE",
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` },
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  function renderRouteList() {
    return (
      serverData ? (
        serverData.map((item: any) => (
          <Route
            key={item._id}
            path={item.link}
            element={<BlogPage content={item.code} />}
          />
        ))
      ) : (
        <div className="container">
          <div className="loader"></div>
        </div>
      )
    )
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage handleDelete={handleDelete} />} />
          {renderRouteList()}
          <Route path=":authType" element={<AuthPage />} />
          <Route path="menu-panel" element={<MenuPanelPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
