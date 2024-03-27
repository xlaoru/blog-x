import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import Error404Page from "./pages/Error404Page";
import MenuPanelPage from "./pages/MenuPanelPage";
import RegistrationPage from "./pages/RegistrationPage";

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

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {serverData ? (
            serverData.map((item: any) => (
              <Route
                key={item.title}
                path={item.link}
                element={<BlogPage content={item.code} />}
              />
            ))
          ) : (
            <div className="container">
              <div className="loader"></div>
            </div>
          )}
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="menu-panel" element={<MenuPanelPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
