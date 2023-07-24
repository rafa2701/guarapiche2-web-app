import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Registro from "./pages/Registro";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Registro />} />
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
