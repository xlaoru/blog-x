import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from './store';
import { getUser } from "./store/AuthSlice"

import { selectBlogs } from "./store/BlogSlice";

import AuthRedirect from "./components/AuthRedirect";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import Error404Page from "./pages/Error404Page";
import MenuPanelPage from "./pages/MenuPanelPage";
import EditBlogPage from "./pages/EditBlogPage";
import AuthPage from "./pages/AuthPage";
import AlertMessage from "./components/AlertMessage";
import UserPage from "./pages/UserPage";

import "./styles/App.css";
import SavedBlogsPage from "./pages/SavedBlogsPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const blogs = useSelector(selectBlogs)

  const token = localStorage.getItem("token") ?? ""
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getUser())
    }
  }, [token, dispatch])

  function renderRouteList() {
    return (
      blogs ? (
        blogs.map((item: any) => (
          <Route
            key={item._id}
            path={`/blog/${item.link}`}
            element={<BlogPage id={item._id} title={item.title} body={item.body} content={item.code} isEditable={item.isEditable} tags={item.tags} />}
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
        <Header />
        <AuthRedirect />
        <AlertMessage />
        <Routes>
          <Route path="/" element={<MainPage blogs={blogs ?? []} />} />
          {renderRouteList()}
          <Route path="login" element={<AuthPage authType="login" />} />
          <Route path="registration" element={<AuthPage authType="registration" />} />
          <Route path="user" element={<UserPage />} />
          <Route path="saved-blogs" element={<SavedBlogsPage />} />
          <Route path="menu-panel" element={<MenuPanelPage />} />
          <Route path="edit-blog" element={<EditBlogPage />} />
          <Route path="admin-panel" element={<AdminPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
