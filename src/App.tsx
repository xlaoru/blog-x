import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { selectBlogs, fetchBlogs } from "./store/BlogSlice";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import Error404Page from "./pages/Error404Page";
import MenuPanelPage from "./pages/MenuPanelPage";
import AuthPage from "./pages/AuthPage";

import "./styles/App.css";

function App() {

  const blogs = useSelector(selectBlogs)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch]);

  const handleDelete = async (blogId: string, event: any) => {
    /*     event.preventDefault();
        try {
          await request({
            url: `http://localhost:3001/api/blogs/${blogId}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` },
          });
          window.location.reload();
        } catch (error) {
          console.error("Error deleting blog:", error);
        } */
  };

  function renderRouteList() {
    return (
      blogs ? (
        blogs.map((item: any) => (
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
