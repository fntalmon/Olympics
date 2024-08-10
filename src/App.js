import { RefreshProvider } from "./RefreshContext";
import "./App.css";
import Container from "./components/Container";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Cambia Router a BrowserRouter
import Inicio from "./Inicio";

function App() {
  return (
    <RefreshProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Asegúrate de que el contenedor maneje el contenido verticalmente
            minHeight: "100vh", // Usa minHeight en lugar de height para permitir el scroll
            backgroundColor: "#070F2B",
            overflowX: "hidden", // Evita el scroll horizontal
          }}
        >
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/trivia/:id" element={<Container />} />
          </Routes>
        </div>
      </Router>
    </RefreshProvider>
  );
}

export default App;
