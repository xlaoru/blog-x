import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import Error404Page from "./pages/Error404Page";

function App() {
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

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {serverData
            ? serverData.map((item: any) => (
                <Route
                  key={item.title}
                  path={item.link}
                  element={<BlogPage content={item.code} />}
                />
              ))
            : null}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
