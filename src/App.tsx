import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import MainPage from './pages/MainPage';

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
                    return <Route path={item.link} element={<BlogPage content={item.code} />} />
                  })
                }
              </Routes>
          </Router>
      </div>
  );
}

export default App;