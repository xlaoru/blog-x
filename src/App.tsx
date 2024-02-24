import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import BlogPage from './pages/BlogPage';
import Error404Page from './pages/Error404Page';

import { content } from './assets/content';

import './styles/App.css'

function App() {
  return (
      <div className="App">
          <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                {
                  content.map((item) => {
                    return <Route key={item.title} path={item.link} element={<BlogPage content={item.code} />} />
                  })
                }
                <Route path="*" element={<Error404Page />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;