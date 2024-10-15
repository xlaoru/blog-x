import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
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

function App() {
  const blogs = useSelector(selectBlogs)

  function renderRouteList() {
    return (
      blogs ? (
        blogs.map((item: any) => (
          <Route
            key={item._id}
            path={`/blog/${item.link}`}
            element={<BlogPage id={item._id} title={item.title} body={item.body} content={item.code} />}
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
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
