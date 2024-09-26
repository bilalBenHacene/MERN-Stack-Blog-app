// import './App.css'

import { Route, Routes } from "react-router-dom";
import Header from "./compenents/header/header";
import Home from "./pages/home/home";
import AddBlog from "./pages/add-blog/add-blog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBlog />} />
      </Routes>
      
    </>
  );
}

export default App;
