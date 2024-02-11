import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";

// Pegar nome da editora na url - Ex: www.projetoquadrinhos.com/marvel <--- esse cara aqui
let url = window.location.href;
let splitUrl = url.split("/");
let urlPublisher = splitUrl.slice(3).join("/");

// Verificar se a publisher existe dentre as listadas no array. Se não existir ele leva para a página 404
const possiblePublishers = ["marvel", "dc", "image", "dark-horse", "", "404"];
let found = false;
for (let i = 0; i < possiblePublishers.length; i++) {
  if (possiblePublishers[i] === urlPublisher) {
    found = true;
    break;
  }
}
if (found == false) {
  window.location.href = "http://localhost:5173/404";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        
        {/* Rota para as páginas de editoras */}
        {possiblePublishers.slice(0, 3).map((possiblePublisher, index) => (
          <Route key={index} path={possiblePublisher} element={<App urlPublisher={possiblePublisher} />}></Route>
        ))}
      </Routes>
    </Router>
  </React.StrictMode>
);
