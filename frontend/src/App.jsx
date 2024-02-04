import './App.css'
import '../index.css'
import Header from './components/Header'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <>
      <Header/>
      <div className="container">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects/:projectId" element={<ProjectDetail/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
